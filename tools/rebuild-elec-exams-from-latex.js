const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "pdf", "elec", "exam");
const targetDir = path.join(root, "src", "subjects", "elec", "exam");

const exams = [
  {
    year: "2025",
    source: "ELEC-exam-2025.tex",
    target: "elec-exam-2025.html",
    title: "Examen electronique 2025",
    eyebrow: "EP361 - Examen 2025",
    heading: "Correction examen electronique 2025",
    summary: "Quadripoles, filtre actif passe-bas, filtre universel et AOP de puissance push-pull.",
  },
  {
    year: "2026",
    source: "ELEC-exam-2026.tex",
    target: "elec-exam-2026.html",
    title: "Examen electronique 2026",
    eyebrow: "EP360 / EP361 - Examen 2026",
    heading: "Correction examen electronique 2026",
    summary: "Darlington, filtres actifs, filtre universel et oscillateur a reseau de retour.",
  },
];

const figureCaptions = {
  "ELEC-exam-2025-schema-1.png": "Fig. 1 - Cellule en T utilisee pour etablir la matrice admittance.",
  "ELEC-exam-2025-schema-2.png": "Fig. 2 - AOP parfait associe aux quadripoles en admittance.",
  "ELEC-exam-2025-schema-3.png": "Fig. 3 - Filtre universel realise avec plusieurs AOP.",
  "ELEC-exam-2025-schema-4.png": "Fig. 4 - Etage de puissance push-pull place dans la contre-reaction.",
  "ELEC-exam-2026-schema-1.png": "Fig. 1 - Les deux transistors forment un montage Darlington.",
  "ELEC-exam-2026-schema-2.png": "Fig. 2 et 3 - AOP inverseur avec quadripoles QA et QB.",
  "ELEC-exam-2026-schema-3.png": "Fig. 4 - Filtre universel a trois AOP.",
  "ELEC-exam-2026-schema-4.png": "Fig. 5 - Boucle d'oscillateur avec amplificateur inverseur et reseau de retour.",
};

function read(fileName) {
  return fs.readFileSync(path.join(sourceDir, fileName), "utf8");
}

function write(fileName, html) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, fileName), `${html.trimEnd()}\n`, "utf8");
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
    value += `\n\n@@${command.toUpperCase()}:${blocks.length - 1}@@\n\n`;
    cursor = index;
  }

  return { value, blocks };
}

function stripPreamble(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/^[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/^\s*%.*$/gm, "")
    .trim();
}

function removeHeaderAndFooter(source) {
  return source
    .replace(/^[\s\S]*?\\hrule\s*\\vspace\{0\.4cm\}/, "")
    .replace(/\\vfill[\s\S]*$/g, "")
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
      .replace(/\\Large\s+/g, "");
  }

  return normalizeAccents(value)
    .replace(/\\text\{([^{}]*)\}/g, "\\mathrm{$1}")
    .replace(/\\quad/g, " ")
    .replace(/\\qquad/g, " ")
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
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "\\textbf{$1}");

  function storeMath(fragment) {
    math.push(fragment.trim());
    return `@@MATH${math.length - 1}@@`;
  }

  value = value
    .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, body) => storeMath(`\\[\\begin{aligned}${body.trim()}\\end{aligned}\\]`))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\$([^$\n]+)\$/g, (_, body) => storeMath(`\\(${body.trim()}\\)`));

  value = convertTextCommands(escapeHtml(value))
    .replace(/~-/g, " - ")
    .replace(/\s{2,}/g, " ")
    .trim();

  math.forEach((fragment, index) => {
    value = value.replace(`@@MATH${index}@@`, fragment);
  });

  return value;
}

function convertTabular(block) {
  const rows = block
    .replace(/\\toprule|\\midrule|\\bottomrule|\\hline/g, "")
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean);

  const body = rows
    .map((row) => {
      const cells = row
        .split("&")
        .map((cell) => `                <td>${convertInline(cell.trim())}</td>`)
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
  const tableBlocks = [];
  let value = latex
    .replace(/\\imageplaceholder\{[^{}]*\}\{([^{}]*)\}/g, (_, caption) => `\n\n@@FIGURE:${caption}@@\n\n`)
    .replace(/\\begin\{tabularx\}\{[^{}]*\}\{[^{}]*\}/g, "\\begin{tabular}")
    .replace(/\\begin\{tabular\}\{[^{}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, table) => {
      tableBlocks.push(table);
      return `\n\n@@TABLE:${tableBlocks.length - 1}@@\n\n`;
    });

  value = value
    .replace(/^\s*\{\\small[^\n]*\}\s*$/gm, "\n")
    .replace(/\{\\small\s+[^{}]*\}/g, "\n")
    .replace(/\\begin\{(?:minipage|center)\}(?:\[[^\]]*\])?(?:\{[^{}]*\})?/g, "")
    .replace(/\\end\{(?:minipage|center)\}/g, "")
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/\\begin\{enumerate\}/g, "\n\n@@OL_START@@\n")
    .replace(/\\end\{enumerate\}/g, "\n@@OL_END@@\n\n")
    .replace(/^\s*\\item\s*/gm, "@@LI@@ ")
    .replace(/\\subsubsection\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\(?:vspace|smallskip|medskip|bigskip)\{?[^{}\n]*\}?/g, "\n")
    .replace(/\\hrule/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { value, tableBlocks };
}

function renderCorrection(body) {
  return `          <div class="td-step-block td-solution-block">
            <strong>Correction et raisonnement</strong>
${convertBlock(body)}
          </div>`;
}

function figureFileFor(config, figureIndex) {
  const candidate = `ELEC-exam-${config.year}-schema-${figureIndex}.png`;
  return fs.existsSync(path.join(root, "assets", "elec", "exam", candidate)) ? candidate : null;
}

function renderFigure(config, figureIndex, rawCaption) {
  const file = figureFileFor(config, figureIndex);
  const fallback = convertInline(rawCaption.replace(/^\[|\]$/g, ""));
  if (!file) return `          <p><em>${fallback}</em></p>`;

  const caption = figureCaptions[file] || fallback;
  return `          <figure class="system-diagram td-figure">
            <img src="assets/elec/exam/${file}" alt="${escapeHtml(caption)}" loading="lazy">
            <figcaption class="diagram-caption">${caption}</figcaption>
          </figure>`;
}

function convertBlock(latex, config = null, state = { figureIndex: 0 }, corrBlocks = []) {
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
      html.push(renderCorrection(corrBlocks[index] || ""));
      continue;
    }

    if (line.startsWith("@@TABLE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TABLE:/, "").replace(/@@$/, ""));
      html.push(convertTabular(normalized.tableBlocks[index] || ""));
      continue;
    }

    if (line.startsWith("@@FIGURE:")) {
      flushParagraph();
      closeList();
      state.figureIndex += 1;
      const caption = line.replace(/^@@FIGURE:/, "").replace(/@@$/, "");
      html.push(config ? renderFigure(config, state.figureIndex, caption) : `          <p><em>${convertInline(caption)}</em></p>`);
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

function cleanProblemTitle(title) {
  return convertInline(title)
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*\d+\s*pts?\.?$/i, "")
    .replace(/\s+\d+\s*pts?\.?$/i, "")
    .trim();
}

function extractProblems(latex) {
  const withoutPreamble = removeHeaderAndFooter(stripPreamble(latex));
  const withCorrections = extractBalancedCommand(withoutPreamble, "corr");
  const source = withCorrections.value.replace(/@@CORR:(\d+)@@/g, (_, index) => `@@CORR:${index}@@`);
  const matches = [...source.matchAll(/\\textbf\{(?:\\Large\s*)?(Problème\s+[IVX]+[^}]*)\}/g)];

  return matches.map((match, index) => {
    const title = cleanProblemTitle(match[1]);
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : source.length;
    return {
      index: index + 1,
      title,
      body: source.slice(start, end).replace(/^\s*\\hfill\s*\\textbf\{[^{}]*pts?\.?\}\s*/i, "").trim(),
      corrBlocks: withCorrections.blocks,
    };
  });
}

function convertProblemBody(problem, config, state) {
  return convertBlock(problem.body, config, state, problem.corrBlocks);
}

function renderProblem(problem, config, state) {
  const body = convertProblemBody(problem, config, state);
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">Probleme ${problem.index}</span>
              <h3>${problem.title}</h3>
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

function renderPage(config, problems) {
  const state = { figureIndex: 0 };
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.title} - EP361</title>
    <link rel="stylesheet" href="styles.css">
    <script>
      window.MathJax = {
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"]] },
        svg: { fontCache: "global" }
      };
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <script defer src="script.js"></script>
  </head>
  <body class="td-page">
    <main class="main-content">
      <header class="td-header">
        <a class="back-link" href="elec.html#elec-exams">Retour aux examens</a>
        <div>
          <span class="eyebrow">${config.eyebrow}</span>
          <h1>${config.heading}</h1>
          <p>${config.summary}</p>
          <p>Page reconstruite depuis <code>pdf/elec/exam/${config.source}</code>, avec les schemas du dossier <code>assets/elec/exam</code>.</p>
        </div>
        <div class="td-actions">
          <a class="primary-button" href="pdf/elec/exam/${config.source}">Ouvrir le sujet LaTeX</a>
          <a class="back-link" href="elec.html">Cours electronique</a>
        </div>
      </header>

      <section class="page-section">
${problems.map((problem) => renderProblem(problem, config, state)).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

for (const config of exams) {
  const problems = extractProblems(read(config.source));
  write(config.target, renderPage(config, problems));
  console.log(`Reconstruit ${path.relative(root, path.join(targetDir, config.target))} (${problems.length} problemes).`);
}
