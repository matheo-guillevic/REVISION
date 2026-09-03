const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { renderBlocks } = require("./markdown-renderer");

const root = process.cwd();
const outDir = path.join(root, "out");
const configDir = path.join(root, "src", "config");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(configDir, file), "utf8").replace(/^\uFEFF/, ""));
}

function toWebPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function markdownPathFor(group, page, kind) {
  const target = page.target.replace(/\.html$/i, ".md");
  return path.join(root, "content", group.subject, kind, target);
}

function renderPage(group, page, kind, markdownPath) {
  const parsed = matter(fs.readFileSync(markdownPath, "utf8"));
  const data = { ...page, ...parsed.data };
  const isTd = kind === "td";
  const sourceLabel = toWebPath(path.relative(root, markdownPath));
  const prism = data.withPrism || group.withPrism || group.subject === "IN361-JAVA" || group.subject === "SN361-VHDL";
  const prismLink = prism ? '\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">' : "";
  const prismScripts = prism
    ? '\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"></script>\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"></script>'
    : "";

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(data.title)} - ${escapeHtml(group.label)}</title>
    <link rel="stylesheet" href="styles.css">${prismLink}
    <script>
      window.MathJax = {
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"]] },
        svg: { fontCache: "global" }
      };
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>${prismScripts}
    <script defer src="https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3/plotly.min.js"></script>
    <script defer src="script.js"></script>
  </head>
  <body class="td-page">
    <main class="main-content">
      <header class="td-header">
        <a class="back-link" href="${escapeHtml(group.backHref)}">${isTd ? escapeHtml(group.backLabel || "Retour aux TD") : "Retour aux examens"}</a>
        <div>
          <span class="eyebrow">${escapeHtml(data.eyebrow || "")}</span>
          <h1>${escapeHtml(data.heading || data.title || "")}</h1>
          ${data.summary ? `<p>${escapeHtml(data.summary)}</p>` : ""}
          <p>Page reconstruite depuis <code>${escapeHtml(sourceLabel)}</code>.</p>
        </div>
        <div class="td-actions">
          <a class="back-link" href="${escapeHtml(group.courseHref)}">${escapeHtml(group.courseLabel)}</a>
        </div>
      </header>

      <section class="page-section">
${renderBlocks(parsed.content)}
      </section>
    </main>
  </body>
</html>`;
}

function buildKind(configFile, kind) {
  const config = readJson(configFile);
  for (const group of config.groups) {
    const pages = kind === "td" ? group.pages : group.exams;
    for (const page of pages) {
      const markdownPath = markdownPathFor(group, page, kind);
      if (!fs.existsSync(markdownPath)) {
        throw new Error(`Source Markdown introuvable : ${path.relative(root, markdownPath)}`);
      }
      const targetPath = path.join(outDir, page.target);
      write(targetPath, renderPage(group, page, kind, markdownPath));
      console.log(`Reconstruit ${path.relative(root, targetPath)} depuis ${path.relative(root, markdownPath)}.`);
    }
  }
}

buildKind("td-pages.json", "td");
buildKind("exam-pages.json", "exam");
