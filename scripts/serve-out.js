const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.REVISION_PORT || 4173);
const host = process.env.REVISION_HOST || "127.0.0.1";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".wasm": "application/wasm",
};

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filename = path.resolve(root, relative);
  return filename === root || filename.startsWith(`${root}${path.sep}`) ? filename : null;
}

const server = http.createServer((request, response) => {
  const filename = resolveRequest(request.url || "/");
  if (!filename) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Accès interdit.\n");
    return;
  }

  fs.stat(filename, (statError, stats) => {
    const target = !statError && stats.isDirectory() ? path.join(filename, "index.html") : filename;
    fs.readFile(target, (readError, data) => {
      if (readError) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Page introuvable.\n");
        return;
      }

      response.writeHead(200, {
        "Cache-Control": /[\\/]vendor[\\/]v86[\\/][a-f0-9]{16}[\\/]/.test(target)
          ? "public, max-age=31536000, immutable"
          : "no-cache",
        "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream",
      });
      response.end(data);
    });
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Le port ${host}:${port} est deja utilise.`);
    console.error(`Une preview est probablement deja ouverte : http://${host}:${port}/`);
    console.error("Recharge la page dans le navigateur pour voir le dernier build.");
    console.error("Pour lancer une autre preview : REVISION_PORT=4174 npm run preview");
    process.exit(1);
  }

  throw error;
});

server.listen(port, host, () => {
  console.log(`Prévisualisation disponible sur http://${host}:${port}/`);
  console.log(`TP MT461 : http://${host}:${port}/MT461-Methode-numerique-tp1.html`);
  console.log(`Cours IN333 : http://${host}:${port}/IN333-OS.html`);
  console.log("Arrêt : Ctrl+C");
});
