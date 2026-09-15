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

    case "rplayground": {
      const code = stripCodeFence(block.body);
      return `            <article class="r-playground"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""} data-r-playground data-capture-graphics="${escapeHtml(attrs.graphics || "true")}">
              <header>
                <div>
                  <span class="status-pill">${escapeHtml(attrs.label || "WebR")}</span>
                  <h3>${escapeHtml(attrs.title || "Playground R")}</h3>
                </div>
                <div class="button-row">
                  <button type="button" data-r-run>Executer R</button>
                  <button type="button" class="ghost-button" data-r-reset>Reinitialiser</button>
                </div>
              </header>
              <p class="r-playground-status" data-r-status>WebR sera charge au premier lancement. Le code s'execute localement dans le navigateur.</p>
              <div class="r-playground-workspace">
                <label class="r-playground-editor">Code R
                  <span class="r-code-shell">
                    <pre class="r-code-highlight" aria-hidden="true" data-r-highlight></pre>
                    <textarea spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" data-r-editor>${escapeHtml(code)}</textarea>
                  </span>
                </label>
                <div class="r-playground-results" aria-live="polite">
                  <div>
                    <strong>Console</strong>
                    <pre data-r-output>En attente d'execution.</pre>
                  </div>
                  <div>
                    <strong>Graphiques</strong>
                    <div class="r-plot-output" data-r-plots>Aucun graphique pour le moment.</div>
                  </div>
                </div>
              </div>
${attrs.caption ? `              <p class="diagram-caption">${escapeHtml(attrs.caption)}</p>\n` : ""}            </article>`;
    }

    case "linuxplayground": {
      const code = stripCodeFence(block.body);
      return `            <article class="linux-playground"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""} data-linux-playground data-linux-fs="${escapeHtml(attrs.filesystem || "https://i.copy.sh/arch/")}" data-linux-basefs="${escapeHtml(attrs.basefs || "")}">
              <header>
                <div>
                  <span class="status-pill">${escapeHtml(attrs.label || "Linux v86")}</span>
                  <h3>${escapeHtml(attrs.title || "Programme C sous Linux")}</h3>
                </div>
                <div class="button-row">
                  <button type="button" data-linux-copy>Copier le code C</button>
                  <button type="button" class="ghost-button" data-linux-send disabled>Envoyer vers main.c</button>
                  <button type="button" class="ghost-button" data-linux-paste disabled>Coller dans le terminal</button>
                  <button type="button" data-linux-run disabled>Compiler et exécuter</button>
                  <button type="button" class="ghost-button" data-linux-start>Démarrer Linux</button>
                </div>
              </header>
              <p class="linux-playground-status" data-linux-status>Démarrez la machine v86. Le code sera placé automatiquement dans <code>/root/main.c</code>.</p>
              <p class="linux-playground-status" data-linux-cache-status>Le cache sera préparé au démarrage de Linux.</p>
              <button type="button" class="ghost-button" data-linux-cache-clear>Réinitialiser le cache Linux</button>
              <div class="linux-playground-workspace">
                <label class="linux-playground-editor">Source C<textarea spellcheck="false" data-linux-editor>${escapeHtml(code)}</textarea></label>
                <div class="linux-playground-terminal" data-linux-terminal>
                  <div class="linux-playground-placeholder">
                    <strong>Arch Linux dans v86</strong>
                    <p>L'image d'essai contient Bash, GCC, Make et les commandes Linux usuelles.</p>
                    <p>Après le démarrage, cliquez dans le terminal puis compilez avec <code>gcc -Wall -Wextra /root/main.c -o /root/main</code>.</p>
                  </div>
                </div>
              </div>
${attrs.caption ? `              <p class="diagram-caption">${escapeHtml(attrs.caption)}</p>\n` : ""}            </article>`;
    }

    case "riscvplayground": {
      const code = stripCodeFence(block.body);
      return `            <article class="riscv-playground"${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""} data-riscv-playground>
              <header>
                <div>
                  <span class="status-pill">${escapeHtml(attrs.label || "WebRISC-V")}</span>
                  <h3>${escapeHtml(attrs.title || "Assembleur RISC-V interactif")}</h3>
                </div>
                <div class="button-row">
                  <button type="button" data-riscv-run>Assembler et executer</button>
                  <button type="button" class="ghost-button" data-riscv-step>Pas a pas</button>
                  <button type="button" class="ghost-button" data-riscv-reset>Reinitialiser</button>
                </div>
              </header>
              <div class="riscv-status" data-riscv-status>Modifiez le programme, puis lancez l'assemblage ou l'execution pas a pas.</div>
              <div class="riscv-workspace">
                <textarea spellcheck="false" aria-label="Code assembleur RISC-V" data-riscv-editor>${escapeHtml(code)}</textarea>
                <div class="riscv-results" aria-live="polite">
                  <div>
                    <strong>Sortie et trace</strong>
                    <pre data-riscv-output>En attente d'execution.</pre>
                  </div>
                  <div>
                    <strong>Registres RV32I</strong>
                    <div class="riscv-registers" data-riscv-registers></div>
                  </div>
                </div>
              </div>
              <p class="diagram-caption">Simulateur pedagogique RV32I execute localement dans le navigateur. Sous-ensemble : calcul entier, branchements, sauts, acces mot memoire et pseudo-instructions usuelles.</p>
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

    case "toeicquiz": {
      const quizId = attrs.id || "toeic-quiz";
      let data;
      try {
        data = JSON.parse(stripJsonFence(block.body));
      } catch (error) {
        throw new Error(`Quiz TOEIC invalide (${quizId}): ${error.message}`);
      }
      const questionCount = Array.isArray(data.questions) ? data.questions.length : 0;
      const ficheCount = Array.isArray(data.fiches) ? data.fiches.length : 0;
      return `            <article class="toeic-quiz" id="${escapeHtml(quizId)}" data-toeic-quiz>
              <script type="application/json" data-toeic-data>${escapeJsonScript(JSON.stringify(data))}</script>
              <header>
                <div>
                  <span class="status-pill">${escapeHtml(attrs.label || "Quiz TOEIC")}</span>
                  <h3>${escapeHtml(attrs.title || data.title || "Quiz interactif")}</h3>
                  <p>${questionCount} questions, ${ficheCount} fiches de notion et correction immediate.</p>
                </div>
                <div class="toeic-score-card">
                  <strong data-toeic-score>0 / 0</strong>
                  <span data-toeic-score-label>Aucune reponse</span>
                </div>
              </header>
              <div class="toeic-toolbar">
                <label>Série
                  <select data-toeic-mode>
                    <option value="all">Toutes les questions</option>
                    <option value="unanswered">Non repondues</option>
                    <option value="wrong">Erreurs</option>
                    <option value="right">Reussies</option>
                  </select>
                </label>
                <label>Fiche
                  <select data-toeic-fiche></select>
                </label>
                <button type="button" data-toeic-reset>Reinitialiser</button>
              </div>
              <div class="toeic-progress">
                <span data-toeic-progress></span>
              </div>
              <div class="toeic-layout">
                <section class="toeic-question-panel" data-toeic-panel aria-live="polite"></section>
              </div>
            </article>`;
    }

    case "exercise": {
      const heading = block.body.match(/^#{2,6}\s+(.+?)\s*\n+/);
      const label = attrs.label || "Exercice";
      const title = attrs.title || (heading ? heading[1] : "");
      const body = heading ? block.body.slice(heading[0].length) : block.body;
      return `        <article class="exercise-card" data-exercise${attrs.id ? ` id="${escapeHtml(attrs.id)}"` : ""}>
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
${renderBlocks(body, options)}
          </div>
        </article>`;
    }

    case "solution": {
      const title = attrs.title || "Correction détaillée";
      return `            <div class="content-block solution-panel">
              <h4>${escapeHtml(title)}</h4>
${renderBlocks(block.body, { markdown: renderContentMarkdown })
        .split("\n")
        .map((line) => `              ${line}`)
        .join("\n")}
            </div>`;
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
