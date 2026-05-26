const fs = require("fs");
const path = require("path");

const root = process.cwd();
const mathPath = path.join(root, "math.html");
const coursePath = path.join(root, "src", "subjects", "probabilites", "cours.html");

const html = fs.readFileSync(mathPath, "utf8");

const startMarker = '        <section id="probabilites"';
const endMarker = "      </main>";
const start = html.indexOf(startMarker);
if (start === -1) throw new Error("Debut du cours de probabilites introuvable");

const end = html.indexOf(endMarker, start);
if (end === -1) throw new Error("Fin du cours de probabilites introuvable");

fs.writeFileSync(coursePath, `${html.slice(start, end).trimEnd()}\n`, "utf8");

console.log("Cours de math regroupe dans src/subjects/probabilites/cours.html.");
