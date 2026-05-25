const fs = require("fs");
const path = require("path");

const root = process.cwd();
const mathPath = path.join(root, "math.html");
const sectionsDir = path.join(root, "src", "subjects", "probabilites", "sections");

const html = fs.readFileSync(mathPath, "utf8");

const sections = [
  { id: "probabilites", file: "01-accueil.html" },
  { id: "probabilites-programme", file: "02-programme.html" },
  { id: "probabilites-chap1", file: "03-chap1.html" },
  { id: "probabilites-chap2", file: "04-chap2.html" },
  { id: "probabilites-chap3", file: "05-chap3.html" },
  { id: "probabilites-chap4", file: "06-chap4.html" },
  { id: "probabilites-methodes", file: "07-methodes.html" },
  { id: "probabilites-td", file: "08-td.html" },
  { id: "probabilites-sujets", file: "09-sujets.html" },
  { id: "probabilites-revision", file: "10-revision.html" },
];

function sectionStart(section) {
  const marker = `        <section id="${section.id}"`;
  const index = html.indexOf(marker);
  if (index === -1) throw new Error(`Section ${section.id} introuvable`);
  return index;
}

fs.mkdirSync(sectionsDir, { recursive: true });

for (let i = 0; i < sections.length; i++) {
  const start = sectionStart(sections[i]);
  const end = i + 1 < sections.length ? sectionStart(sections[i + 1]) : html.indexOf("      </main>", start);

  if (end === -1) throw new Error(`Fin de section ${sections[i].id} introuvable`);
  fs.writeFileSync(path.join(sectionsDir, sections[i].file), `${html.slice(start, end).trimEnd()}\n`, "utf8");
}

console.log("Sections du cours de math decoupees dans src/subjects/probabilites/sections.");
