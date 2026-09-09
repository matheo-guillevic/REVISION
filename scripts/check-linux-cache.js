const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

(async () => {
  const stores = new Map();
  let calls = 0;
  let failNetwork = false;
  let quotaError = false;
  const listeners = {};
  const caches = {
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async match(key) { return store.get(key)?.clone(); },
        async put(key, response) { if (quotaError) throw new Error('Quota exceeded'); store.set(key, response.clone()); },
        async keys() { return [...store.keys()]; },
      };
    },
  };
  const context = vm.createContext({
    URL, Request, Response, Headers, AbortController, setTimeout, clearTimeout, caches,
    console: { warn() {} },
    fetch: async () => {
      calls++;
      if (failNetwork) throw new Error('Offline');
      return new Response('0123456789', { headers: { 'content-length': '10', etag: '"image"' } });
    },
    self: {
      registration: { scope: 'https://example.org/revision/' },
      addEventListener(type, handler) { listeners[type] = handler; },
      skipWaiting: async () => {},
      clients: { claim: async () => {}, matchAll: async () => [] },
    },
  });
  vm.runInContext(fs.readFileSync('public/service-worker.js', 'utf8').replaceAll('__LINUX_VERSION__', '0123456789abcdef'), context);
  const resource = 'https://i.copy.sh/arch/84b4903a.bin';
  function request(url = resource, headers = {}) {
    let result;
    listeners.fetch({ request: new Request(url, { headers }), respondWith(promise) { result = promise; } });
    return result;
  }
  const first = await Promise.all([request(), request()]);
  assert.equal(calls, 1, 'Concurrent requests must share one download');
  assert.equal(await first[0].text(), '0123456789');
  assert.equal(await first[1].text(), '0123456789');
  failNetwork = true;
  assert.equal(await (await request()).text(), '0123456789');
  assert.equal(calls, 1, 'Warm cache must work offline');
  for (const [range, status, expected] of [
    ['bytes=2-5', 206, '2345'], ['bytes=-3', 206, '789'], ['bytes=7-', 206, '789'],
    ['bytes=20-30', 416, ''], ['bytes=-0', 416, ''],
  ]) {
    const response = await request(resource, { Range: range });
    assert.equal(response.status, status);
    assert.equal(await response.text(), expected);
  }
  const changed = await request(resource, { Range: 'bytes=0-2', 'If-Range': '"different"' });
  assert.equal(changed.status, 200);
  assert.equal(request('https://example.org/other/vendor/v86/0123456789abcdef/v86.wasm'), undefined);
  assert.equal(request('https://i.copy.sh/fs.json'), undefined, 'Mutable upstream index must not be cached');
  assert.equal(request('https://raw.githubusercontent.com/copy/v86/master/bios/seabios.bin'), undefined);
  stores.set('unrelated-cache', new Map());
  stores.set('revision-linux-%2Fother%2F-assets-old', new Map());
  stores.set('revision-linux-%2Frevision%2F-assets-old', new Map());
  stores.set('revision-v86-v1', new Map());
  let activation;
  listeners.activate({ waitUntil(p) { activation = p; } });
  await activation;
  assert(stores.has('unrelated-cache'));
  assert(stores.has('revision-linux-%2Fother%2F-assets-old'));
  assert(!stores.has('revision-linux-%2Frevision%2F-assets-old'));
  assert(!stores.has('revision-v86-v1'));
  async function message(type) {
    let result, done;
    listeners.message({ data: { type }, ports: [{ postMessage(data) { result = data; } }], waitUntil(p) { done = p; } });
    await done;
    return result;
  }
  assert.equal((await message('linux-cache-status')).entries, 1);
  assert.equal((await message('linux-cache-clear')).entries, 0);
  await assert.rejects(request(), /Offline/);
  assert.equal(calls, 4, 'Three attempts before reporting a download failure');
  assert.equal((await message('linux-cache-status')).entries, 0, 'Failures must not populate the cache');
  failNetwork = false;
  quotaError = true;
  assert.equal(await (await request()).text(), '0123456789', 'Storage failure must not prevent execution');
  assert.equal((await message('linux-cache-status')).entries, 0);
  console.log('Linux cache: deduplication, offline reads, Range, scope isolation, invalidation, retries and quota fallback OK.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
