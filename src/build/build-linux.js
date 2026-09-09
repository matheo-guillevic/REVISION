const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const zlib = require("node:zlib");

// Edit the pinned newc archive without requiring cpio on the build machine.
function patchInitramfs(archive) {
  const parts = [];
  let offset = 0;
  let patched = false;
  const align = (n) => (n + 3) & ~3;
  while (offset + 110 <= archive.length) {
    const header = Buffer.from(archive.subarray(offset, offset + 110));
    if (header.toString("ascii", 0, 6) !== "070701") throw new Error("Invalid pinned initramfs");
    const size = parseInt(header.toString("ascii", 54, 62), 16);
    const nameSize = parseInt(header.toString("ascii", 94, 102), 16);
    const name = archive.toString("utf8", offset + 110, offset + 110 + nameSize - 1);
    const dataOffset = align(offset + 110 + nameSize);
    let data = archive.subarray(dataOffset, dataOffset + size);
    if (name === "init") {
      const init = data.toString();
      if (!init.includes("\nfsck_root\n")) throw new Error("Upstream init changed: review 9p patch");
      data = Buffer.from(init.replace("\nfsck_root\n", '\n# host9p is a network filesystem, not a block device.\nif [ "$root" != host9p ]; then fsck_root; fi\n'));
      header.write(data.length.toString(16).padStart(8, "0"), 54, "ascii");
      patched = true;
    }
    parts.push(header, archive.subarray(offset + 110, dataOffset), data, Buffer.alloc(align(data.length) - data.length));
    offset = align(dataOffset + size);
    if (name === "TRAILER!!!") break;
  }
  if (!patched) throw new Error("Missing init in pinned initramfs");
  return Buffer.concat(parts);
}

function buildLinux(root, outDir) {
  const sourceDir = path.join(root, "src/linux");
  const runtimeDir = path.join(root, "node_modules/v86/build");
  const basefs = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(sourceDir, "arch-fs.json.gz"))));
  const directory = (name) => name.split("/").filter(Boolean).reduce((children, part) => {
    const entry = children.find((node) => node[0] === part);
    if (!entry || !Array.isArray(entry[6])) throw new Error(`Missing image directory: ${name}`);
    return entry[6];
  }, basefs.fsroot);
  directory("/etc/openrc").push(["inittab.d", 0, 1667760480, 0o40755, 0, 0, []]);
  // The image has no syslog-ng configuration and does not enable this service.
  // Remove its orphan init script so dependency scanning does not run its sed.
  const services = directory("/etc/openrc/init.d");
  const syslogIndex = services.findIndex((node) => node[0] === "syslog-ng");
  if (syslogIndex < 0) throw new Error("Upstream syslog service changed: review image patch");
  services.splice(syslogIndex, 1);
  const kernel = directory("/boot").find((node) => node[0] === "vmlinuz-linux");
  if (!kernel) throw new Error("Missing pinned Linux kernel");
  const overlays = {
    "/etc/fstab": "# v86 root is supplied by virtio-9p; never run a block-device fsck.\nhost9p / 9p trans=virtio,cache=loose,rw 0 0\n",
    "/root/.bashrc": "[ -z \"$PS1\" ] && return\nunset HISTFILE\nexport PS1='\\u@\\h:\\w\\$ '\nexport LC_ALL=C\nalias ls='ls --color=auto'\nprintf '\\036REVISION_LINUX_READY\\037' > /dev/ttyS0\n",
  };
  const files = {
    "fs.json": Buffer.from(JSON.stringify(basefs)),
    "initramfs.img": patchInitramfs(zlib.gunzipSync(fs.readFileSync(path.join(sourceDir, "arch-initramfs.img.gz")))),
    "overlay.json": Buffer.from(JSON.stringify(overlays)),
  };
  for (const name of ["libv86.js", "v86.wasm", "v86-fallback.wasm"]) files[name] = fs.readFileSync(path.join(runtimeDir, name));
  const worker = fs.readFileSync(path.join(root, "public/service-worker.js"), "utf8");
  const hash = crypto.createHash("sha256").update(worker).update(fs.readFileSync(__filename));
  for (const [name, data] of Object.entries(files)) hash.update(name).update(data);
  const version = hash.digest("hex").slice(0, 16);
  const relative = `vendor/v86/${version}/`;
  const target = path.join(outDir, relative);
  fs.mkdirSync(target, { recursive: true });
  for (const [name, data] of Object.entries(files)) fs.writeFileSync(path.join(target, name), data);
  const biosBase = "https://raw.githubusercontent.com/copy/v86/d96be774e549a83371b038b86e819804c96b921f/bios/";
  const manifest = {
    version, runtime: relative + "libv86.js", wasm: relative + "v86.wasm",
    basefs: relative + "fs.json", initrd: relative + "initramfs.img", overlay: relative + "overlay.json",
    filesystem: "https://i.copy.sh/arch/", kernel: "https://i.copy.sh/arch/" + kernel[6],
    bios: biosBase + "seabios.bin", vgaBios: biosBase + "vgabios.bin",
  };
  fs.mkdirSync(path.join(outDir, "linux"), { recursive: true });
  fs.writeFileSync(path.join(outDir, "linux/manifest.json"), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(outDir, "service-worker.js"), worker.replaceAll("__LINUX_VERSION__", version));
}

module.exports = { buildLinux, patchInitramfs };
