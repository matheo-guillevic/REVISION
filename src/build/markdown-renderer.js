const fs = require("fs");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseAttrs(source = "") {
  const attrs = {};
  const rest = source.trim();
  const matches = rest.matchAll(/([a-zA-Z0-9_-]+)="([^"]*)"/g);
  for (const match of matches) attrs[match[1]] = match[2];

  const bare = rest.replace(/([a-zA-Z0-9_-]+)="([^"]*)"/g, "").trim();
  if (bare) attrs.variant = bare;
  return attrs;
}

function renderMarkdown(source) {
  const math = [];
  const protectedSource = source.trim().replace(
    /\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g,
    (fragment) => {
      const token = `@@MATH${math.length}@@`;
      math.push(normalizeMathFragment(fragment));
      return token;
    }
  );

  let html = md.render(protectedSource).trim();
  html = html.replace(/<pre><code class="language-([^"]+)">/g, '<pre class="code-block language-$1"><code class="language-$1">');
  html = html.replace(/<pre><code>/g, '<pre class="code-block"><code>');
  html = html.replace(/&lt;br&gt;/g, "<br>");
  math.forEach((fragment, index) => {
    html = html.replaceAll(`@@MATH${index}@@`, fragment);
  });
  return html;
}

function normalizeMathFragment(fragment) {
  if (fragment.startsWith("$$") && fragment.endsWith("$$")) {
    return `\\[${fragment.slice(2, -2).trim()}\\]`;
  }
  return fragment;
}

function unwrapParagraph(html) {
  const match = html.match(/^<p>([\s\S]*)<\/p>$/);
  return match ? match[1] : html;
}

function renderContentMarkdown(source, listMode = "formula") {
  const ulClass = listMode === "plain" ? "" : ' class="formula-list"';
  const olClass = listMode === "card" ? ' class="ordered-list"' : ' class="solution-steps"';
  return renderMarkdown(source)
    .replace(/<ul>/g, `<ul${ulClass}>`)
    .replace(/<ol>/g, `<ol${olClass}>`);
}

function findDirectiveEnd(lines, startIndex) {
  let depth = 0;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (/^:::\w+/.test(line)) depth += 1;
    if (line === ":::") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error(`Directive non fermee vers la ligne ${startIndex + 1}`);
}

function splitBlocks(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let markdown = [];

  function flushMarkdown() {
    const text = markdown.join("\n").trim();
    markdown = [];
    if (text) blocks.push({ type: "markdown", text });
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.trim().match(/^:::(\w+)(.*)$/);

    if (!match) {
      markdown.push(line);
      continue;
    }

    flushMarkdown();
    const end = findDirectiveEnd(lines, index);
    blocks.push({
      type: match[1],
      attrs: parseAttrs(match[2]),
      body: lines.slice(index + 1, end).join("\n"),
    });
    index = end;
  }

  flushMarkdown();
  return blocks;
}

function renderListLinks(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
      if (!match) return "";
      return `            <a class="quick-link" href="${escapeHtml(match[2])}">${escapeHtml(match[1])}</a>`;
    })
    .filter(Boolean)
    .join("\n");
}

function renderBlock(block, options = {}) {
  const attrs = block.attrs || {};

  switch (block.type) {
    case "section": {
      return `        <section id="${escapeHtml(attrs.id)}" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">${escapeHtml(attrs.eyebrow || "")}</span>
            <h2>${escapeHtml(attrs.title || "")}</h2>
${attrs.summary ? `            <p>${escapeHtml(attrs.summary)}</p>\n` : ""}          </div>
${renderBlocks(block.body, options)}
        </section>`;
    }

    case "grid": {
      const variant = attrs.variant || "";
      return `          <div class="content-grid ${escapeHtml(variant)}">
${renderBlocks(block.body, options)}
          </div>`;
    }

    case "dashboard": {
      return `          <div class="dashboard-grid">
${renderBlocks(block.body, options)}
          </div>`;
    }

    case "layout": {
      const className = attrs.class || attrs.variant || "content-grid";
      return `          <div class="${escapeHtml(className)}">
${renderBlocks(block.body, options)}
          </div>`;
    }

    case "quicklinks": {
      return `          <div class="quick-grid">
${renderListLinks(block.body)}
          </div>`;
    }

    case "block": {
      const variant = attrs.type || attrs.variant || "neutral";
      return `            <div class="content-block ${escapeHtml(variant)}">
${attrs.title ? `              <h4>${escapeHtml(attrs.title)}</h4>\n` : ""}${renderBlocks(block.body, { markdown: renderContentMarkdown })
        .split("\n")
        .map((line) => `              ${line}`)
        .join("\n")}
            </div>`;
    }

    case "annotation": {
      return `          <div class="annotation" data-annotation>
${attrs.title ? `            <strong>${escapeHtml(attrs.title)}</strong>\n` : ""}${renderBlocks(block.body, { markdown: renderContentMarkdown })
        .split("\n")
        .map((line) => `            ${line}`)
        .join("\n")}
          </div>`;
    }

    case "card": {
      const className = attrs.class || "chapter-card";
      const title = attrs.title ? `<h3>${escapeHtml(attrs.title)}</h3>\n` : "";
      const kicker = attrs.kicker ? `<span class="card-kicker">${escapeHtml(attrs.kicker)}</span>\n` : "";
      const pill = attrs.pill ? `<span class="status-pill${attrs.muted === "true" ? " muted" : ""}">${escapeHtml(attrs.pill)}</span>\n` : "";
      const link = attrs.href ? `              <p class="secondary-link"><a href="${escapeHtml(attrs.href)}">${escapeHtml(attrs.link || "Ouvrir")}</a></p>\n` : "";
      const body = renderContentMarkdown(block.body, "card")
        .split("\n")
        .map((line) => `              ${line}`)
        .join("\n");
      const strongTitle = className === "progress-card" && attrs.title ? `<strong>${escapeHtml(attrs.title)}</strong>\n` : title;

      return `            <article class="${escapeHtml(className)}">
              ${kicker}${pill}${strongTitle}${body}
${link}            </article>`;
    }

    case "figure": {
      const classes = ["system-diagram", attrs.class].filter(Boolean).join(" ");
      return `          <figure class="${escapeHtml(classes)}"${attrs.label ? ` aria-label="${escapeHtml(attrs.label)}"` : ""}>
            <img src="${escapeHtml(attrs.src)}" alt="${escapeHtml(attrs.alt || attrs.caption || "")}" loading="lazy">
${attrs.caption ? `            <figcaption class="diagram-caption">${escapeHtml(attrs.caption)}</figcaption>\n` : ""}          </figure>`;
    }

    case "circuitjs": {
      return `            <article class="circuitjs-panel">
              <header>
                <span class="status-pill">${escapeHtml(attrs.label || "CircuitJS")}</span>
                <h3>${escapeHtml(attrs.title || "Simulation")}</h3>
              </header>
              <iframe
                title="${escapeHtml(attrs.iframeTitle || attrs.title || "Simulation CircuitJS")}"
                src="${escapeHtml(attrs.src)}"
                loading="lazy"></iframe>
            </article>`;
    }

    case "circuitgrid": {
      return `          <div class="circuitjs-grid">
${renderBlocks(block.body, options)}
          </div>`;
    }

    case "exercise": {
      const label = attrs.label || "Exercice";
      const title = attrs.title || "";
      return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">${escapeHtml(label)}</span>
              <h3>${escapeHtml(title)}</h3>
            </div>
            <div class="button-row">
              <button type="button" data-mark-done>Marquer comme fait</button>
              <button type="button" data-toggle-redo>A refaire</button>
            </div>
          </header>
          <div class="answer-block">
${renderBlocks(block.body, options)}
          </div>
        </article>`;
    }

    case "html": {
      return block.body.trim();
    }

    default:
      return renderMarkdown(block.body);
  }
}

function renderBlocks(source, options = {}) {
  const markdownRenderer = options.markdown || renderMarkdown;
  return splitBlocks(source)
    .map((block) => (block.type === "markdown" ? markdownRenderer(block.text) : renderBlock(block, options)))
    .filter(Boolean)
    .join("\n\n");
}

function renderMarkdownCourse(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  return {
    data: parsed.data,
    body: renderBlocks(parsed.content),
  };
}

module.exports = {
  renderBlocks,
  renderMarkdown,
  renderMarkdownCourse,
};
