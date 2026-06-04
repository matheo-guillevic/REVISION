const fs = require("fs");
const path = require("path");

const root = process.cwd();

const configPath = path.join(__dirname, "exam-pages.json");
const pageConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
const figureCaptions = pageConfig.figureCaptions || {};

function titlePatternFor(group) {
  if (group.titlePattern) return new RegExp(group.titlePattern, group.titlePatternFlags || "g");
  if (group.unitKind === "exercise") return /\\textbf\{\\Large\s*(Exercice\s+\d+[^}]*)\}/g;
  return /\\textbf\{(?:\\Large\s*)?(Problème\s+[IVX]+[^}]*)\}/g;
}

function normalizeConfiguredRegex(value) {
  return value ? new RegExp(value, "i") : null;
}

function hydrateGroup(group) {
  return {
    ...group,
    sourceDir: path.join(root, group.sourceDir),
    targetDir: path.join(root, group.targetDir),
    titlePattern: titlePatternFor(group),
    exams: group.exams.map((exam) => ({
      ...exam,
      figures: Object.fromEntries(
        Object.entries(exam.figures || {}).map(([unitIndex, figures]) => [
          unitIndex,
          figures.map((figure) => ({ ...figure, after: normalizeConfiguredRegex(figure.after) })),
        ])
      ),
    })),
  };
}

const examGroups = pageConfig.groups.map(hydrateGroup);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function extractBalancedCommand(source, command) {
  const blocks = [];
  let value = "";
  let cursor = 0;
  const needle = `\\${command}{`;

  while (cursor < source.length) {
    const start = source.indexOf(needle, cursor);
    if (start === -1) {
      value += source.slice(cursor);
      break;
    }

    value += source.slice(cursor, start);
    let index = start + needle.length;
    let depth = 1;

    while (index < source.length && depth > 0) {
      if (source[index] === "\\" && index + 1 < source.length) {
        index += 2;
        continue;
      }
      if (source[index] === "{") depth += 1;
      if (source[index] === "}") depth -= 1;
      index += 1;
    }

    blocks.push(source.slice(start + needle.length, index - 1));
    value += `\n\n@@CORR:${blocks.length - 1}@@\n\n`;
    cursor = index;
  }

  return { value, blocks };
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .replace(/\\cite\{[^{}]*\}/g, "")
    .replace(/^\s*%.*$/gm, "")
    .replace(/^[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\title\{[^{}]*\}|\\author\{[^{}]*\}|\\date\{[^{}]*\}/g, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/\\newpage/g, "\n\n")
    .trim();
}

function cleanTitle(title) {
  return title
    .replace(/\\centering\s*/g, "")
    .replace(/\\Large\s*/g, "")
    .replace(/\s*-\s*\d+\s*pts?\.?$/i, "")
    .replace(/\s+\d+\s*pts?\.?$/i, "")
    .trim();
}

function normalizeAccents(text) {
  return text
    .replace(/\\`a/g, "à")
    .replace(/\\'a/g, "á")
    .replace(/\\`e/g, "è")
    .replace(/\\'e/g, "é")
    .replace(/\\^e/g, "ê")
    .replace(/\\\"e/g, "ë")
    .replace(/\\`u/g, "ù")
    .replace(/\\^o/g, "ô")
    .replace(/\\c\{c\}/g, "ç");
}

function convertTextCommands(text) {
  let value = text;
  for (let pass = 0; pass < 6; pass += 1) {
    value = value
      .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\texttt\{([^{}]*)\}/g, "<code>$1</code>")
      .replace(/\\mathbf\{([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\mathrm\{([^{}]*)\}/g, "$1")
      .replace(/\\text\{([^{}]*)\}/g, "$1")
      .replace(/\\Large\s+/g, "");
  }

  return normalizeAccents(value)
    .replace(/``([^`]*)''/g, "&laquo; $1 &raquo;")
    .replace(/`([^`]*)`/g, "<code>$1</code>")
    .replace(/\\quad|\\qquad/g, " ")
    .replace(/\\hfill/g, " ")
    .replace(/\\hspace\*?\{[^{}]*\}/g, " ")
    .replace(/\\noindent/g, "")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\&/g, "&")
    .replace(/\\\\/g, "<br>");
}

function convertInline(text) {
  const math = [];
  let value = text
    .replace(/\\\$/g, "@@DOLLAR@@")
    .replace(/\*\*([^*]+)\*\*/g, "\\textbf{$1}");

  function storeMath(fragment) {
    math.push(fragment.trim().replaceAll("@@DOLLAR@@", "\\$"));
    return `@@MATH${math.length - 1}@@`;
  }

  value = value
    .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, body) => storeMath(`\\[\\begin{aligned}${body.trim()}\\end{aligned}\\]`))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, body) => storeMath(`\\(${body.trim()}\\)`))
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\$([^$\n]+)\$/g, (_, body) => storeMath(`\\(${body.trim()}\\)`));

  value = convertTextCommands(escapeHtml(value))
    .replaceAll("@@DOLLAR@@", "$")
    .replace(/\s{2,}/g, " ")
    .trim();

  math.forEach((fragment, index) => {
    value = value.replace(`@@MATH${index}@@`, fragment);
  });

  return value;
}

function convertTableCell(cell, normalized, group, corrBlocks) {
  let value = cell
    .replace(/\\begin\{minipage\}(?:\[[^\]]*\])?(?:\{[^{}]*\})?/g, "")
    .replace(/\\end\{minipage\}/g, "")
    .replace(/\\vspace\{[^{}]*\}/g, "")
    .trim();

  value = value.replace(/@@CODE:(\d+)@@/g, (_, index) => {
    const language = group.subject === "java" ? "java" : group.subject === "vhdl" ? "vhdl" : "text";
    return `<pre class="code-block language-${language}"><code class="language-${language}">${escapeHtml(normalized.codeBlocks[Number(index)] || "")}</code></pre>`;
  });

  value = value.replace(/@@CORR:(\d+)@@/g, (_, index) => {
    return renderCorrection(corrBlocks[Number(index)] || "", group).trim();
  });

  if (/<(?:pre|div)\b/.test(value)) return value;
  return convertInline(value);
}

function convertTabular(block, normalized, group, corrBlocks) {
  const rows = block
    .replace(/\\toprule|\\midrule|\\bottomrule|\\hline/g, "")
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean);

  const body = rows
    .map((row) => {
      const cells = row
        .split("&")
        .map((cell) => `                <td>${convertTableCell(cell, normalized, group, corrBlocks)}</td>`)
        .join("\n");
      return `              <tr>\n${cells}\n              </tr>`;
    })
    .join("\n");

  return `          <div class="latex-table-wrap">
            <table class="latex-table">
${body}
            </table>
          </div>`;
}

function normalizeLatex(latex) {
  const codeBlocks = [];
  const tableBlocks = [];
  const timingBlocks = [];

  let value = latex
    .replace(/^\s*\{\\small[^\n]*\}\s*$/gm, "\n")
    .replace(/\{\\small\s+[^{}]*\}/g, "\n")
    .replace(/\\imageplaceholder\{[^{}]*\}\{([^{}]*)\}/g, (_, caption) => `\n\n@@FIGURE:${caption}@@\n\n`)
    .replace(/\\begin\{figure\}\[[^\]]*\][\s\S]*?\\end\{figure\}/g, "\n\n")
    .replace(/\\begin\{table\}\[[^\]]*\]/g, "\\begin{table}")
    .replace(/\\begin\{table\}|\\end\{table\}/g, "")
    .replace(/\\begin\{tabularx\}\{[^{}]*\}\{[^{}]*\}/g, "\\begin{tabular}")
    .replace(/(\\begin\{tabular\}\{[^}\n]*)p\{[^{}]*\}/g, "$1p")
    .replace(/(\\begin\{tabular\}\{[^}\n]*)p\{[^{}]*\}/g, "$1p");

  value = value.replace(/\\begin\{lstlisting\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{lstlisting\}/g, (_, code) => {
    codeBlocks.push(code.replace(/^\n+|\n+$/g, ""));
    return `\n\n@@CODE:${codeBlocks.length - 1}@@\n\n`;
  });

  value = value.replace(/\\begin\{tikztimingtable\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{tikztimingtable\}/g, (_, code) => {
    timingBlocks.push(code.replace(/^\n+|\n+$/g, ""));
    return `\n\n@@TIMING:${timingBlocks.length - 1}@@\n\n`;
  });

  value = value.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, table) => {
    tableBlocks.push(table);
    return `\n\n@@TABLE:${tableBlocks.length - 1}@@\n\n`;
  });

  value = value
    .replace(/\\begin\{(?:minipage|center)\}(?:\[[^\]]*\])?(?:\{[^{}]*\})?/g, "")
    .replace(/\\end\{(?:minipage|center)\}/g, "")
    .replace(/\\centering/g, "")
    .replace(/\\caption\{[^}]*\}/g, "")
    .replace(/\\subsubsection\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\subsection\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\paragraph\*?\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/\\begin\{enumerate\}/g, "\n\n@@OL_START@@\n")
    .replace(/\\end\{enumerate\}/g, "\n@@OL_END@@\n\n")
    .replace(/^\s*\\item(?:\[[^\]]+\])?\s*/gm, "@@LI@@ ")
    .replace(/\\(?:vspace|smallskip|medskip|bigskip)\{?[^{}\n]*\}?/g, "\n")
    .replace(/\\hrule/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { value, codeBlocks, tableBlocks, timingBlocks };
}

function renderCorrection(body, group) {
  return `          <div class="td-step-block td-solution-block">
            <strong>Correction et raisonnement</strong>
${convertBlock(body, group)}
          </div>`;
}

function renderFigure(file, group) {
  const caption = figureCaptions[file] || "Figure de l'examen.";
  return `          <figure class="system-diagram td-figure">
            <img src="${group.assetPrefix}/${file}" alt="${escapeHtml(caption)}" loading="lazy">
            <figcaption class="diagram-caption">${caption}</figcaption>
          </figure>`;
}

function renderPlaceholderFigure(config, group, state, rawCaption) {
  state.figureIndex += 1;
  if (!config.figurePrefix) return `          <p><em>${convertInline(rawCaption.replace(/^\[|\]$/g, ""))}</em></p>`;

  const file = `${config.figurePrefix}-${state.figureIndex}.png`;
  const assetPath = path.join(root, group.assetPrefix, file);
  if (!fs.existsSync(assetPath)) return `          <p><em>${convertInline(rawCaption.replace(/^\[|\]$/g, ""))}</em></p>`;
  return renderFigure(file, group);
}

function convertBlock(latex, group, corrBlocks = [], config = null, state = { figureIndex: 0 }) {
  const normalized = normalizeLatex(latex);
  const lines = normalized.value.split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;

  function closeList() {
    if (!listType) return;
    html.push(`          </${listType}>`);
    listType = null;
  }

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    closeList();
    const converted = convertInline(text);
    if (converted) html.push(`          <p>${converted}</p>`);
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("@@CORR:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@CORR:/, "").replace(/@@$/, ""));
      html.push(renderCorrection(corrBlocks[index] || "", group));
      continue;
    }

    if (line.startsWith("@@CODE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@CODE:/, "").replace(/@@$/, ""));
      const language = group.subject === "java" ? "java" : group.subject === "vhdl" ? "vhdl" : "text";
      html.push(`          <pre class="code-block language-${language}"><code class="language-${language}">${escapeHtml(normalized.codeBlocks[index] || "")}</code></pre>`);
      continue;
    }

    if (line.startsWith("@@TIMING:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TIMING:/, "").replace(/@@$/, ""));
      html.push(`          <div class="content-block neutral">
            <h4>Chronogramme TikZ-Timing source</h4>
            <pre class="code-block language-latex"><code>${escapeHtml(normalized.timingBlocks[index] || "")}</code></pre>
          </div>`);
      continue;
    }

    if (line.startsWith("@@TABLE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TABLE:/, "").replace(/@@$/, ""));
      html.push(convertTabular(normalized.tableBlocks[index] || "", normalized, group, corrBlocks));
      continue;
    }

    if (line.startsWith("@@FIGURE:")) {
      flushParagraph();
      closeList();
      const caption = line.replace(/^@@FIGURE:/, "").replace(/@@$/, "");
      html.push(config ? renderPlaceholderFigure(config, group, state, caption) : `          <p><em>${convertInline(caption)}</em></p>`);
      continue;
    }

    if (line.startsWith("@@SUBSECTION:")) {
      flushParagraph();
      closeList();
      const title = line.replace(/^@@SUBSECTION:/, "").replace(/@@$/, "").trim();
      html.push(`          <h4>${convertInline(title)}</h4>`);
      continue;
    }

    if (line === "@@UL_START@@" || line === "@@OL_START@@") {
      flushParagraph();
      closeList();
      listType = line === "@@UL_START@@" ? "ul" : "ol";
      const className = listType === "ul" ? "formula-list" : "solution-steps";
      html.push(`          <${listType} class="${className}">`);
      continue;
    }

    if (line === "@@UL_END@@" || line === "@@OL_END@@") {
      flushParagraph();
      closeList();
      continue;
    }

    if (line.startsWith("@@LI@@")) {
      flushParagraph();
      if (!listType) {
        listType = "ul";
        html.push('          <ul class="formula-list">');
      }
      html.push(`            <li>${convertInline(line.replace(/^@@LI@@\s*/, ""))}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return html.join("\n");
}

function extractUnits(latex, group) {
  const clean = cleanLatex(latex);
  const withCorrections = extractBalancedCommand(clean, "corr");
  const source = withCorrections.value;
  const matches = [...source.matchAll(group.titlePattern)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : source.length;
    const title = cleanTitle(match[1]);
    const label = /exercice/i.test(title) ? "Exercice" : /partie/i.test(title) ? "Partie" : group.subject === "java" ? "Exercice" : "Probleme";

    return {
      index: index + 1,
      label,
      title,
      body: source.slice(start, end).replace(/^\s*\\hfill\s*\\textbf\{[^{}]*pts?\.?\}\s*/i, "").trim(),
      corrBlocks: withCorrections.blocks,
    };
  });
}

function insertAfterHeadingOrParagraph(html, pattern, figureHtml) {
  if (pattern) {
    const headings = [...html.matchAll(/          <h4>([\s\S]*?)<\/h4>/g)];
    const found = headings.find((match) => pattern.test(match[1]));
    if (found) return `${html.slice(0, found.index + found[0].length)}\n${figureHtml}${html.slice(found.index + found[0].length)}`;
  }

  const match = html.match(/          <h4>[\s\S]*?<\/h4>|          <p>[\s\S]*?<\/p>/);
  if (!match) return `${figureHtml}\n${html}`;
  return `${html.slice(0, match.index + match[0].length)}\n${figureHtml}${html.slice(match.index + match[0].length)}`;
}

function placeConfiguredFigures(body, config, group, unit) {
  const figures = config.figures?.[unit.index] || [];
  return figures.reduce((html, figure) => insertAfterHeadingOrParagraph(html, figure.after, renderFigure(figure.file, group)), body);
}

function renderUnit(unit, group, config, state) {
  const body = placeConfiguredFigures(convertBlock(unit.body, group, unit.corrBlocks, config, state), config, group, unit);
  const status = `${unit.label} ${unit.index}`;
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">${status}</span>
              <h3>${convertInline(unit.title)}</h3>
            </div>
            <div class="button-row">
              <button type="button" data-mark-done>Marquer comme fait</button>
              <button type="button" data-toggle-redo>A refaire</button>
            </div>
          </header>
          <div class="answer-block">
${body}
          </div>
        </article>`;
}

function renderPage(group, config, units) {
  const state = { figureIndex: 0 };
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.title} - ${group.label}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">
    <script>
      window.MathJax = {
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"]] },
        svg: { fontCache: "global" }
      };
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"></script>
    <script defer src="script.js"></script>
  </head>
  <body class="td-page">
    <main class="main-content">
      <header class="td-header">
        <a class="back-link" href="${group.backHref}">Retour aux examens</a>
        <div>
          <span class="eyebrow">${config.eyebrow}</span>
          <h1>${config.heading}</h1>
          <p>${config.summary}</p>
          <p>Page reconstruite depuis <code>${path.relative(root, path.join(group.sourceDir, config.source))}</code>.</p>
        </div>
        <div class="td-actions">
          <a class="primary-button" href="${path.relative(path.join(root, "out"), path.join(root, "pdf", group.subject, "exam", config.source)).replace(/^\.\.\//, "")}">Ouvrir le sujet LaTeX</a>
          <a class="back-link" href="${group.courseHref}">${group.courseLabel}</a>
        </div>
      </header>

      <section class="page-section">
${units.map((unit) => renderUnit(unit, group, config, state)).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

for (const group of examGroups) {
  for (const config of group.exams) {
    const sourcePath = path.join(group.sourceDir, config.source);
    const targetPath = path.join(group.targetDir, config.target);
    const units = extractUnits(read(sourcePath), group);
    write(targetPath, renderPage(group, config, units));
    console.log(`Reconstruit ${path.relative(root, targetPath)} (${units.length} sections).`);
  }
}
