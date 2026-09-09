const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Exercer le gestionnaire réellement livré, sans démarrer une image Linux distante.
const source = fs.readFileSync(path.join(__dirname, "../public/script.js"), "utf8");
const keyboardSource = source.slice(
  source.indexOf("  const linuxKeyScancodes ="),
  source.indexOf('  document.querySelectorAll("[data-linux-playground]").forEach'),
);
const timers = new Map();
let timerId = 0;
let now = 0;
const clock = {
  setTimeout(callback, delay) {
    timers.set(++timerId, { callback, time: now + delay });
    return timerId;
  },
  clearTimeout(id) { timers.delete(id); },
};
const { installAzertyKeyboard, clearLinuxKeyboard } = new Function(
  "window", `${keyboardSource}\nreturn { installAzertyKeyboard, clearLinuxKeyboard };`,
)(clock);
const sent = [];
const handlers = {};
const emulator = {
  keyboard_send_scancodes(codes) {
    assert.equal(codes.length, 1, "Les octets doivent être espacés");
    sent.push({ code: codes[0], time: now });
  },
};
installAzertyKeyboard({ addEventListener(type, handler) { handlers[type] = handler; } }, emulator);
function drain() {
  while (timers.size) {
    const [id, timer] = timers.entries().next().value;
    timers.delete(id);
    now = timer.time;
    timer.callback();
  }
}
function key(key, options = {}) {
  const event = { key, preventDefault() { this.prevented = true; }, ...options };
  handlers.keydown(event);
  return event;
}
function expectCodes(expected) {
  drain();
  assert.deepEqual(sent.map(({ code }) => code), expected);
  for (let i = 1; i < sent.length; i++) {
    assert.ok(sent[i].time - sent[i - 1].time >= 10);
  }
  sent.length = 0;
}

// Ctrl suit la lettre AZERTY, même si sa position physique est différente.
for (const [letter, code, scancode] of [
  ["a", "KeyQ", 0x1E], ["z", "KeyW", 0x2C], ["c", "KeyC", 0x2E],
  ["d", "KeyD", 0x20], ["l", "KeyL", 0x26], ["r", "KeyR", 0x13],
  ["u", "KeyU", 0x16], ["w", "KeyZ", 0x11],
]) {
  assert.ok(key(letter, { ctrlKey: true, code }).prevented);
  expectCodes([0x1D, scancode, scancode | 0x80, 0x9D]);
}
key("ArrowRight", { ctrlKey: true });
expectCodes([0x1D, 0xE0, 0x4D, 0xE0, 0xCD, 0x9D]);

// Frappe rapide : tout arrive sans autre événement clavier, dans le bon ordre.
key("A");
key("b");
key("Enter");
assert.equal(sent.length, 1);
expectCodes([0x2A, 0x1E, 0x9E, 0xAA, 0x30, 0xB0, 0x1C, 0x9C]);
key("|", { ctrlKey: true, altKey: true, getModifierState: () => true });
expectCodes([0x2A, 0x2B, 0xAB, 0xAA]);

assert.ok(!key("v", { ctrlKey: true }).prevented);
assert.ok(!key("V", { ctrlKey: true, shiftKey: true }).prevented);
expectCodes([]);
let pasted = false;
handlers.paste({
  clipboardData: { getData: () => "ab\r\n" },
  preventDefault() { pasted = true; },
});
assert.ok(pasted);
expectCodes([0x1E, 0x9E, 0x30, 0xB0, 0x1C, 0x9C]);

key("e", { isComposing: true });
key("c", { metaKey: true });
expectCodes([]);
key("a");
clearLinuxKeyboard(emulator);
assert.equal(timers.size, 0, "Arrêter les envois avant de détruire la VM");
console.log("Clavier Linux : Ctrl AZERTY, cadence, AltGr, collage et arrêt validés.");

// An interrupt cancels queued text but releases the current shifted key.
sent.length = 0;
key("A");
key("b");
key("c");
key("c", { ctrlKey: true });
expectCodes([0x2A, 0x1E, 0x9E, 0xAA, 0x1D, 0x2E, 0xAE, 0x9D]);
console.log("Ctrl+C interrompt également un collage sans laisser Shift enfoncé.");
