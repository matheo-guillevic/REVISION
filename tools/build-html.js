const fs = require("fs");
const path = require("path");

const root = process.cwd();
const layoutDir = path.join(root, "src", "layout");
const sectionsDir = path.join(root, "src", "sections");
const indexPath = path.join(root, "index.html");

const sectionFiles = fs
  .readdirSync(sectionsDir)
  .filter((file) => file.endsWith(".html"))
  .sort();

const parts = [
  fs.readFileSync(path.join(layoutDir, "start.html"), "utf8").trimEnd(),
  ...sectionFiles.map((file) => fs.readFileSync(path.join(sectionsDir, file), "utf8").trimEnd()),
  fs.readFileSync(path.join(layoutDir, "end.html"), "utf8").trimEnd(),
];

fs.writeFileSync(indexPath, `${parts.join("\n\n")}\n`, "utf8");
console.log(`index.html reconstruit avec ${sectionFiles.length} sections.`);
