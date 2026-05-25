const fs = require("fs");
const path = require("path");

const root = process.cwd();
const indexPath = path.join(root, "index.html");
const layoutDir = path.join(root, "src", "layout");
const sectionsDir = path.join(root, "src", "sections");

const html = fs.readFileSync(indexPath, "utf8");

const sections = [
  "accueil",
  "programme",
  "chap1",
  "chap2",
  "chap3",
  "chap4",
  "methodes",
  "td",
  "sujets",
  "revision",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sectionStart(id) {
  const marker = `        <section id="${id}"`;
  const index = html.indexOf(marker);
  if (index === -1) throw new Error(`Section ${id} introuvable`);
  return index;
}

ensureDir(layoutDir);
ensureDir(sectionsDir);

const firstSection = sectionStart(sections[0]);
fs.writeFileSync(path.join(layoutDir, "start.html"), html.slice(0, firstSection).trimEnd() + "\n", "utf8");

for (let i = 0; i < sections.length; i++) {
  const start = sectionStart(sections[i]);
  const end = i + 1 < sections.length
    ? sectionStart(sections[i + 1])
    : html.indexOf("      </main>", start);

  if (end === -1) throw new Error(`Fin de section ${sections[i]} introuvable`);
  const content = html.slice(start, end).trimEnd() + "\n";
  fs.writeFileSync(path.join(sectionsDir, `${String(i + 1).padStart(2, "0")}-${sections[i]}.html`), content, "utf8");
}

const afterSections = html.slice(html.indexOf("      </main>", sectionStart(sections[sections.length - 1]))).trimStart();
fs.writeFileSync(path.join(layoutDir, "end.html"), afterSections, "utf8");

console.log("HTML decoupe dans src/layout et src/sections.");
