const VERSION = "__LINUX_VERSION__";
const SCOPE = new URL(self.registration.scope);
const PREFIX = `revision-linux-${encodeURIComponent(SCOPE.pathname)}-`;
const ASSETS = `${PREFIX}assets-${VERSION}`;
const FILES = `${PREFIX}arch-v2`;
const BIOS_PATH = "/copy/v86/d96be774e549a83371b038b86e819804c96b921f/bios/";
const pending = new Map();
let cacheEpoch = 0;

function cacheFor(url) {
  if (url.origin === SCOPE.origin && url.pathname.startsWith(`${SCOPE.pathname}vendor/v86/`)
      && /\/vendor\/v86\/[a-f0-9]{16}\/(libv86\.js|v86(?:-fallback)?\.wasm|fs\.json|initramfs\.img|overlay\.json)$/.test(url.pathname)) return ASSETS;
  if (url.origin === "https://i.copy.sh" && /^\/arch\/[a-f0-9]{8}\.bin$/.test(url.pathname)) return FILES;
  if (url.origin === "https://raw.githubusercontent.com" && url.pathname.startsWith(BIOS_PATH)
      && /\/(seabios|vgabios)\.bin$/.test(url.pathname)) return ASSETS;
  return null;
}

async function reportCacheError(error) {
  console.warn("Cache Linux indisponible :", error);
  const clients = await self.clients.matchAll();
  clients.forEach((client) => client.postMessage({ type: "linux-cache-warning" }));
}

self.addEventListener("install", (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      const names = await caches.keys();
      await Promise.all(names.filter((name) => name.startsWith(PREFIX) && ![ASSETS, FILES].includes(name))
        .map((name) => caches.delete(name)));
      // The previous worker used one origin-wide name. Do not touch other caches.
      await caches.delete("revision-v86-v1");
    } catch (error) { await reportCacheError(error); }
    await self.clients.claim();
  })());
});

async function fullResponse(request, cacheName) {
  const key = request.url;
  if (pending.has(key)) return (await pending.get(key)).clone();
  const epoch = cacheEpoch;
  const job = (async () => {
    let cache;
    try {
      cache = await caches.open(cacheName);
      const cached = await cache.match(key);
      if (cached && cached.status === 200 && cached.type !== "opaque") return cached;
    } catch (error) { await reportCacheError(error); }
    let error;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 120000);
        let response;
        try {
          response = await fetch(key, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer", cache: "reload", signal: controller.signal });
          if (response.status !== 200 || response.type === "opaque") throw new Error(`HTTP ${response.status}`);
          // Finish reading before marking a file as cached (including interrupted bodies).
          const bytes = await response.arrayBuffer();
          const headers = new Headers(response.headers);
          headers.delete("content-encoding");
          headers.set("content-length", String(bytes.byteLength));
          response = new Response(bytes, { status: 200, headers });
        } finally { clearTimeout(timer); }
        if (cache && epoch === cacheEpoch) {
          try { await cache.put(key, response.clone()); }
          catch (error) { await reportCacheError(error); }
        }
        return response;
      } catch (caught) { error = caught; }
    }
    throw error;
  })();
  pending.set(key, job);
  try { return (await job).clone(); }
  finally { pending.delete(key); }
}

async function withRange(request, response) {
  const range = request.headers.get("range");
  if (!range) return response;
  const condition = request.headers.get("if-range");
  if (condition && condition !== response.headers.get("etag") && condition !== response.headers.get("last-modified")) return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  // A server may ignore unsupported multipart or malformed Range requests.
  if (!match || (!match[1] && !match[2])) return response;
  const bytes = await response.arrayBuffer();
  const length = bytes.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(length - 1, Number(match[2])) : length - 1;
  if (start > end || start >= length) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${length}` } });
  const headers = new Headers(response.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${length}`);
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Accept-Ranges", "bytes");
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const cacheName = cacheFor(new URL(event.request.url));
  if (!cacheName) return;
  event.respondWith(withRangeResponse(event.request, cacheName));
});

async function withRangeResponse(request, cacheName) {
  return withRange(request, await fullResponse(request, cacheName));
}

self.addEventListener("message", (event) => {
  if (!event.ports[0] || !["linux-cache-status", "linux-cache-clear"].includes(event.data?.type)) return;
  event.waitUntil((async () => {
    try {
      if (event.data.type === "linux-cache-clear") {
        cacheEpoch++;
        // Let in-flight reads finish; their old epoch prevents a cache refill.
        await Promise.allSettled([...pending.values()]);
        await Promise.all([caches.delete(ASSETS), caches.delete(FILES)]);
      }
      const lists = await Promise.all([ASSETS, FILES].map(async (name) => (await caches.open(name)).keys()));
      event.ports[0].postMessage({ ok: true, version: VERSION, entries: lists.reduce((sum, list) => sum + list.length, 0) });
    } catch (error) { event.ports[0].postMessage({ ok: false, error: error.message }); }
  })());
});
