const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const root = process.cwd();
const inputDir = path.join(root, "pdf");
const outputDir = path.join(root, "extracted");

function listPdfs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPdfs(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".pdf") ? [fullPath] : [];
  });
}

async function extractPdf(filePath) {
  const rel = path.relative(inputDir, filePath);
  const safeName = rel.replace(/[\\/]/g, "__").replace(/\.pdf$/i, ".txt");
  const outPath = path.join(outputDir, safeName);
  const data = await pdfParse(fs.readFileSync(filePath));
  fs.writeFileSync(outPath, data.text, "utf8");
  console.log(`${rel} -> ${path.relative(root, outPath)} (${data.numpages} pages)`);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const files = listPdfs(inputDir);
  for (const file of files) {
    await extractPdf(file);
  }
})();
