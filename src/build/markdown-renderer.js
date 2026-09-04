const fs = require("fs");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const info = token.info ? token.info.trim().split(/\s+/)[0] : "";
  if (info === "mermaid") {
    return `<div class="mermaid">${escapeHtml(token.content)}</div>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsonScript(value = "") {
  return String(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
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
  const withoutComments = source.replace(/<!--[\s\S]*?-->/g, "").trim();
  const protectedSource = withoutComments.replace(
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

function stripJsonFence(source = "") {
  const trimmed = source.trim();
  const match = trimmed.match(/^```(?:json)?\s*\n([\s\S]*?)\n```$/);
  return match ? match[1].trim() : trimmed;
}

function stripCodeFence(source = "") {
  const trimmed = source.trim();
  const match = trimmed.match(/^```(?:[a-zA-Z0-9_-]+)?\s*\n([\s\S]*?)\n```$/);
  return match ? match[1].trim() : trimmed;
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
  let inFence = false;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line.startsWith("```") || line.startsWith("~~~")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^:::\w+/.test(line)) {
      if (line.endsWith(":::")) continue;
      depth += 1;
    }
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
  let inFence = false;

  function flushMarkdown() {
    const text = markdown.join("\n").trim();
    markdown = [];
    if (text) blocks.push({ type: "markdown", text });
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      inFence = !inFence;
      markdown.push(line);
      continue;
    }
    if (inFence) {
      markdown.push(line);
      continue;
    }

    const match = line.trim().match(/^:::(\w+)(.*)$/);

    if (!match) {
      markdown.push(line);
      continue;
    }

    flushMarkdown();
    const rawAttrs = match[2] || "";
    const selfClosing = rawAttrs.trim().endsWith(":::");
    const attrsSource = selfClosing ? rawAttrs.trim().replace(/:::$/, "").trim() : rawAttrs;
    const end = selfClosing ? index : findDirectiveEnd(lines, index);
    blocks.push({
      type: match[1],
      attrs: parseAttrs(attrsSource),
      body: selfClosing ? "" : lines.slice(index + 1, end).join("\n"),
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
      const requestedHeight = String(attrs.height || "").trim().toLowerCase();
      const autoHeight = requestedHeight === "auto";
      const fixedHeight = /^\d+(?:\.\d+)?(?:px|rem|vh|vw)?$/.test(requestedHeight)
        ? (/^\d+(?:\.\d+)?$/.test(requestedHeight) ? `${requestedHeight}px` : requestedHeight)
        : "";
      const classes = [
        "circuitjs-panel",
        autoHeight ? "circuitjs-panel--auto" : "",
        fixedHeight ? "circuitjs-panel--fixed" : "",
      ].filter(Boolean).join(" ");
      const style = fixedHeight ? ` style="--circuitjs-height: ${escapeHtml(fixedHeight)}"` : "";

      return `            <article class="${classes}"${style}>
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

    case "plotly": {
      const json = stripJsonFence(block.body);
      return `            <article class="plotly-panel"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""}>
              <header>
                <span class="status-pill">${escapeHtml(attrs.label || "Interactif")}</span>
                <h3>${escapeHtml(attrs.title || "Graphique")}</h3>
              </header>
              <div class="plotly-chart" data-plotly-chart style="height: ${escapeHtml(attrs.height || "420")}px"></div>
              <script type="application/json" data-plotly-config>${escapeJsonScript(json)}</script>
${attrs.caption ? `              <p class="diagram-caption">${escapeHtml(attrs.caption)}</p>\n` : ""}            </article>`;
    }

    case "cplayground": {
      const code = stripCodeFence(block.body);
      return `            <article class="c-playground"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""} data-c-playground>
              <header>
                <div>
                  <span class="status-pill">${escapeHtml(attrs.label || "C autonome")}</span>
                  <h3>${escapeHtml(attrs.title || "Exercice C interactif")}</h3>
                </div>
                <div class="button-row">
                  <button type="button" data-c-run>Analyser / simuler</button>
                  <button type="button" class="ghost-button" data-c-reset>Reinitialiser</button>
                </div>
              </header>
              <textarea spellcheck="false" data-c-editor>${escapeHtml(code)}</textarea>
              <div class="c-playground-results" aria-live="polite">
                <div>
                  <strong>Sortie</strong>
                  <pre data-c-output>En attente d'execution.</pre>
                </div>
                <div>
                  <strong>Explications</strong>
                  <ul data-c-explain></ul>
                </div>
              </div>
              <p class="diagram-caption">Mode autonome GitHub Pages : analyse pedagogique locale, sans serveur de compilation.</p>
            </article>`;
    }

    case "wokwi": {
      const src = (attrs.src || "").replace(/^"+|"+$/g, "");
      const hasProject = src && !/YOUR_PROJECT_ID/i.test(src);
      const height = attrs.height || "520";
      const body = renderContentMarkdown(block.body, "card")
        .split("\n")
        .map((line) => `              ${line}`)
        .join("\n");
      const frame = hasProject
        ? `              <iframe
                title="${escapeHtml(attrs.iframeTitle || attrs.title || "Simulation Wokwi")}"
                src="${escapeHtml(src)}"
                height="${escapeHtml(height)}"
                loading="lazy"
                allow="accelerometer; camera; microphone; clipboard-write; encrypted-media; gyroscope; usb; serial"></iframe>`
        : `              <div class="wokwi-placeholder">
                <strong>Simulation Wokwi a connecter</strong>
                <span>Renseigner un attribut <code>src</code> avec l'URL du projet Wokwi.</span>
              </div>`;

      return `            <article class="wokwi-panel"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""}>
              <header>
                <span class="status-pill">${escapeHtml(attrs.label || "Wokwi")}</span>
                <h3>${escapeHtml(attrs.title || "Simulation embarquee")}</h3>
                ${hasProject ? `<a class="secondary-link" href="${escapeHtml(src)}" target="_blank" rel="noopener">Ouvrir</a>` : ""}
              </header>
${body}
${frame}
            </article>`;
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
