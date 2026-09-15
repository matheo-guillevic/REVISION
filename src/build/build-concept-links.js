const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "out");
const configPath = path.join(root, "src", "config", "concept-links.json");
const targetPath = path.join(outDir, "concept-links.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function pageAndHash(href) {
  const [page, hash = ""] = String(href || "").split("#");
  return { page, hash };
}

function extractIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    ids.add(match[1]);
  }
  return ids;
}

function validateLinks(groups) {
  const cache = new Map();
  const warnings = [];

  const idsForPage = (page) => {
    if (cache.has(page)) return cache.get(page);
    const filePath = path.join(outDir, page);
    if (!fs.existsSync(filePath)) {
      cache.set(page, null);
      return null;
    }
    const ids = extractIds(fs.readFileSync(filePath, "utf8"));
    cache.set(page, ids);
    return ids;
  };

  for (const group of groups) {
    for (const link of group.links || []) {
      const { page, hash } = pageAndHash(link.href);
      const ids = idsForPage(page);
      if (!ids) {
        warnings.push(`${group.id}: page introuvable ${page}`);
        continue;
      }
      if (hash && !ids.has(hash)) {
        warnings.push(`${group.id}: ancre introuvable ${link.href}`);
      }
    }
  }

  return warnings;
}

const source = readJson(configPath);
const groups = Array.isArray(source.groups) ? source.groups : [];
const warnings = validateLinks(groups);

fs.writeFileSync(
  targetPath,
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    groups,
  }, null, 2)}\n`,
  "utf8"
);

console.log(`Liens de notions generes : ${path.relative(root, targetPath)} (${groups.length} groupes).`);
warnings.forEach((warning) => console.warn(`Attention lien notion : ${warning}`));
