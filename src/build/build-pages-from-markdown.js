const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const matter = require("gray-matter");
const { renderBlocks, renderRelatedConceptLinks } = require("./markdown-renderer");

const root = process.cwd();
const outDir = path.join(root, "out");
const configDir = path.join(root, "src", "config");
const publicDir = path.join(root, "public");
const conceptLinksPath = path.join(configDir, "concept-links.json");

function publicAssetRevision() {
  const hash = crypto.createHash("sha256");
  for (const file of ["styles.css", "script.js", "service-worker.js"]) {
    hash.update(file);
    hash.update(fs.readFileSync(path.join(publicDir, file)));
  }
  return hash.digest("hex").slice(0, 16);
}

const assetRevision = publicAssetRevision();
const conceptGroups = JSON.parse(fs.readFileSync(conceptLinksPath, "utf8").replace(/^\uFEFF/, "")).groups || [];

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

function renderSearchBox() {
  return `        <div class="site-search" data-site-search>
          <label>
            <span>Recherche</span>
            <input type="search" placeholder="Rechercher une notion..." autocomplete="off" data-site-search-input>
          </label>
          <div class="site-search-results" data-site-search-results hidden></div>
        </div>`;
}

function renderNav(items, activeHref) {
  return items
    .map(([href, label, level]) => {
      const active = href === activeHref ? " active" : "";
      const sub = level === "sub" ? " nav-link-sub" : "";
      return `          <a class="nav-link${sub}${active}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    })
    .join("\n");
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function addGeneratedExerciseIds(markdown, page) {
  let exerciseIndex = 0;
  return markdown.replace(/^:::\s*exercise([^\n]*)$/gm, (full, attrs) => {
    if (/\bid="/.test(attrs)) return full;
    exerciseIndex += 1;
    const title = attrs.match(/\btitle="([^"]*)"/)?.[1] || attrs.match(/\blabel="([^"]*)"/)?.[1] || `exercice-${exerciseIndex}`;
    const base = slugify(title) || `exercice-${exerciseIndex}`;
    return `:::exercise id="${slugify(page.target.replace(/\.html$/i, ""))}-${base}"${attrs}`;
  });
}

function parseDirectiveAttrs(source = "") {
  const attrs = {};
  for (const attr of source.matchAll(/([a-zA-Z0-9_-]+)="([^"]*)"/g)) {
    attrs[attr[1]] = attr[2];
  }
  return attrs;
}

function extractMarkdownSections(markdown) {
  return [...markdown.matchAll(/^:::\s*section\s+([^\n]*)$/gm)]
    .map((match) => {
      const attrs = parseDirectiveAttrs(match[1]);
      return attrs.id && attrs.title ? { id: attrs.id, title: attrs.title, eyebrow: attrs.eyebrow || "" } : null;
    })
    .filter(Boolean);
}

function extractMarkdownExercises(markdown) {
  return [...markdown.matchAll(/^:::\s*exercise\s+([^\n]*)$/gm)]
    .map((match) => {
      const attrs = parseDirectiveAttrs(match[1]);
      return attrs.id && (attrs.title || attrs.label) ? { id: attrs.id, title: attrs.title || attrs.label } : null;
    })
    .filter(Boolean);
}

function kindNoun(kind) {
  if (kind === "tp") return "TP";
  if (kind === "exam") return "Examens";
  return "TD";
}

function pagesForKind(group, kind) {
  return kind === "exam" ? group.exams : group.pages;
}

function renderSidebarGroup(title, links, activeHref) {
  if (!links.length) return "";
  return `        <div class="sidebar-nav-group">
          <span class="panel-label">${escapeHtml(title)}</span>
          <nav class="nav-list">
${renderNav(links, activeHref)}
          </nav>
        </div>`;
}

function renderPageNav(group, page, kind, sections, exercises) {
  const subjectHref = group.courseHref || `${group.subject}.html`;
  const sectionExerciseLinks = sections
    .filter((section) => /exercice|partie/i.test(`${section.eyebrow} ${section.title}`))
    .map((section) => [
      `${page.target}#${section.id}`,
      section.eyebrow ? `${section.eyebrow} - ${section.title}` : section.title,
      "sub",
    ]);
  const exerciseLinks = (sectionExerciseLinks.length ? sectionExerciseLinks : exercises.map((exercise) => [
    `${page.target}#${exercise.id}`,
    exercise.title,
    "sub",
  ])).slice(0, 18);

  return [
    renderSidebarGroup("Cours associe", [
      [subjectHref, group.courseLabel || group.label || group.subject],
    ], ""),
    renderSidebarGroup("Exercices", exerciseLinks, ""),
  ].filter(Boolean).join("\n\n");
}

function renderRelatedLinksSidebar() {
  return `        <aside class="related-links" data-related-links hidden>
          <span class="panel-label">Notions liees</span>
          <div data-related-links-content></div>
        </aside>`;
}

function markdownPathFor(group, page, kind) {
  const source = page.source || page.target.replace(/\.html$/i, ".md");
  return path.join(root, "content", group.subject, kind, source);
}

function renderPage(group, page, kind, markdownPath) {
  const parsed = matter(fs.readFileSync(markdownPath, "utf8"));
  const data = { ...page, ...parsed.data };
  const content = addGeneratedExerciseIds(parsed.content, data);
  const sections = extractMarkdownSections(content);
  const exercises = extractMarkdownExercises(content);
  const nav = renderPageNav(group, data, kind, sections, exercises);
  const kindLabels = {
    td: group.backLabel || "Retour aux TD",
    tp: group.backLabel || "Retour aux TP",
    exam: group.backLabel || "Retour aux examens",
  };
  const sourceLabel = toWebPath(path.relative(root, markdownPath));
  const prism = data.withPrism || group.withPrism || group.subject === "IN361-JAVA" || group.subject === "SN361-VHDL";
  const prismLink = prism ? '\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">' : "";
  const prismScripts = prism
    ? '\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"></script>\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"></script>'
    : "";
  const mermaidScripts = /^```mermaid\s*$/m.test(parsed.content)
    ? `
    <script defer src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        if (window.mermaid) window.mermaid.initialize({ startOnLoad: true });
      });
    </script>`
    : "";
  const related = renderRelatedConceptLinks(data.target, { conceptGroups });

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(data.title)} - ${escapeHtml(group.label)}</title>
    <link rel="stylesheet" href="styles.css?v=${assetRevision}">${prismLink}
    <script>window.REVISION_ASSET_VERSION = "${assetRevision}";</script>
    <script>
      window.MathJax = {
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"]] },
        svg: { fontCache: "global" }
      };
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>${prismScripts}${mermaidScripts}
    <script defer src="https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3/plotly.min.js"></script>
    <script defer src="script.js?v=${assetRevision}"></script>
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="Navigation principale">
        <a class="brand" href="index.html" aria-label="Retour a l'accueil">
          <span class="brand-mark">ES</span>
          <span>
            <strong>Revision ESISAR</strong>
            <small>${escapeHtml(group.label || group.subject)}</small>
          </span>
        </a>

${renderSearchBox()}

${nav}

${renderRelatedLinksSidebar()}
      </aside>

      <main class="main-content">
        <header class="topbar page-topbar">
          <div>
            <span class="eyebrow">${escapeHtml(data.eyebrow || "")}</span>
            <h1>${escapeHtml(data.heading || data.title || "")}</h1>
            ${data.summary ? `<p>${escapeHtml(data.summary)}</p>` : ""}
            <p>Page reconstruite depuis <code>${escapeHtml(sourceLabel)}</code>.</p>
          </div>
          <div class="td-actions">
            <a class="back-link" href="${escapeHtml(group.backHref)}">${escapeHtml(kindLabels[kind] || "Retour au cours")}</a>
            <a class="back-link" href="${escapeHtml(group.courseHref)}">${escapeHtml(group.courseLabel)}</a>
          </div>
        </header>

        <section class="page-section page-body">
${related ? `${related}\n` : ""}
${renderBlocks(content, { currentPage: data.target, conceptGroups })}
        </section>
      </main>
    </div>
  </body>
</html>`;
}

function buildKind(configFile, kind) {
  const config = readJson(configFile);
  for (const group of config.groups) {
    const pages = pagesForKind(group, kind);
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
buildKind("tp-pages.json", "tp");
buildKind("exam-pages.json", "exam");
