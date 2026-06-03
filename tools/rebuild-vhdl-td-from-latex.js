const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "pdf", "vhdl", "TD");
const targetDir = path.join(root, "src", "subjects", "vhdl", "td");

const tdConfig = [
  {
    n: 1,
    source: "TD1_Correction_SN361.tex",
    pdf: "TD1_Correction_SN361.pdf",
    title: "TD 1 corrige - Codage binaire et logique combinatoire",
    heading: "Codage binaire, tables de verite et logique combinatoire",
    summary: "Conversions signees/non signees, complement a 2, portes logiques, XOR/XNOR et comparateurs.",
  },
  {
    n: 2,
    source: "TD2_Correction_SN361.tex",
    pdf: "TD2_Correction_SN361.pdf",
    title: "TD 2 corrige - Synthese logique et circuits sequentiels",
    heading: "Synthese de schemas, bascules et detection d'evenements",
    summary: "Lecture de code VHDL, schemas de bascules, sorties synchrones/asynchrones et chronogrammes.",
  },
  {
    n: 3,
    source: "TD3_Correction_SN361.tex",
    pdf: "TD3_Correction_SN361.pdf",
    title: "TD 3 corrige - Compteurs et test benches",
    heading: "Compteurs, resets, enable et test benches",
    summary: "Compteur 8 bits, reset asynchrone, activation synchrone, simulation VHDL/Verilog et evolution up/down.",
  },
  {
    n: 4,
    source: "TD4_Correction_SN361.tex",
    pdf: "TD4_correction_vb.pdf",
    title: "TD 4 corrige - Machines a etats finis",
    heading: "Bascule Toggle, Moore, Mealy et synchronisation",
    summary: "FSM Moore/Mealy, reset asynchrone, nombre de bascules et synchronisation d'une entree asynchrone.",
  },
];

const figureOverrides = {
  "2:1": ["SN361-TD2_1.1.svg"],
  "2:2": ["SN361-TD2_1.2.svg"],
  "2:3": ["SN361-TD2_1.3.svg"],
  "2:4": ["SN361-TD2_2.1.svg"],
  "2:5": ["SN361-TD2_2.2.svg"],
  "3:2": ["SN361-TD3_2.1.svg"],
  "4:1": ["SN361-TD4_1_Moore.svg", "SN361-TD4_2_Mealy.svg"],
  "4:2": ["SN361-TD4_2.svg"],
};

const figureCaptions = {
  "SN361-TD2_1.1.svg": "Schema de synthese de l'exercice 1.1.",
  "SN361-TD2_1.2.svg": "Schema de synthese de l'exercice 1.2.",
  "SN361-TD2_1.3.svg": "Schema de synthese de l'exercice 1.3.",
  "SN361-TD2_2.1.svg": "Bloc fonctionnel de l'exercice 2.1.",
  "SN361-TD2_2.2.svg": "Schema de synthese de l'exercice 2.2.",
  "SN361-TD3_2.1.svg": "Registre a decalage SIPO generique.",
  "SN361-TD4_1_Moore.svg": "Machine de Moore pour la bascule Toggle.",
  "SN361-TD4_2_Mealy.svg": "Machine de Mealy pour la bascule Toggle.",
  "SN361-TD4_2.svg": "Machine a etats du detecteur de sequence.",
};

function repairMojibake(text) {
  if (!/[ÃÂ]/.test(text)) return text;
  return Buffer.from(text, "latin1").toString("utf8");
}

function read(fileName) {
  return repairMojibake(fs.readFileSync(path.join(sourceDir, fileName), "utf8"));
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function escapeText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/% \[cite:[^\n]*\]/g, "")
    .replace(/^\s*%.*$/gm, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .trim();
}

function convertTextCommands(text) {
  let value = text;
  for (let pass = 0; pass < 5; pass += 1) {
    value = value
      .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\texttt\{([^{}]*)\}/g, "<code>$1</code>")
      .replace(/\\mathbf\{([^{}]*)\}/g, "<strong>$1</strong>");
  }

  return value
    .replace(/``([^`]*)''/g, "&laquo; $1 &raquo;")
    .replace(/<<\s*([^>]*)\s*>>/g, "&laquo; $1 &raquo;")
    .replace(/\\`a/g, "à")
    .replace(/\\'a/g, "á")
    .replace(/\\`e/g, "è")
    .replace(/\\'e/g, "é")
    .replace(/\\^e/g, "ê")
    .replace(/\\¨i/g, "ï")
    .replace(/\\c\{c\}/g, "ç")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\&/g, "&")
    .replace(/\\overline\{([^{}]+)\}/g, "\\overline{$1}")
    .replace(/\\\\/g, "<br>");
}

function convertInline(text) {
  const math = [];
  let value = text;

  function storeMath(fragment) {
    math.push(fragment.trim());
    return `@@MATH${math.length - 1}@@`;
  }

  value = value
    .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, body) => storeMath(`\\[\\begin{aligned}${body.trim()}\\end{aligned}\\]`))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, body) => storeMath(`\\(${body.trim()}\\)`))
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\$([^$\n]+)\$/g, (_, body) => storeMath(`\\(${body.trim()}\\)`));

  value = convertTextCommands(escapeText(value));

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
    .map((row, index) => {
      const tag = index === 0 ? "th" : "td";
      const cells = row
        .split("&")
        .map((cell) => `                <${tag}>${convertInline(cell.trim())}</${tag}>`)
        .join("");
      return `              <tr>\n${cells}\n              </tr>`;
    })
    .join("\n");

  return `          <div class="latex-table-wrap">
            <table class="latex-table">
${body}
            </table>
          </div>`;
}

function stripFloatingEnvironments(latex) {
  return latex
    .replace(/\\begin\{table\}\[[^\]]*\]/g, "\\begin{table}")
    .replace(/\\begin\{table\}/g, "")
    .replace(/\\end\{table\}/g, "")
    .replace(/\\begin\{figure\}\[[^\]]*\][\s\S]*?\\end\{figure\}/g, "\n\n")
    .replace(/\\centering/g, "")
    .replace(/\\caption\{[^}]*\}/g, "");
}

function normalizeLatex(latex) {
  let codeBlocks = [];
  let tableBlocks = [];
  let value = stripFloatingEnvironments(latex);

  value = value.replace(/\\begin\{lstlisting\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{lstlisting\}/g, (_, code) => {
    codeBlocks.push(code.replace(/^\n+|\n+$/g, ""));
    return `\n\n@@CODE:${codeBlocks.length - 1}@@\n\n`;
  });

  value = value.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, table) => {
    tableBlocks.push(table);
    return `\n\n@@TABLE:${tableBlocks.length - 1}@@\n\n`;
  });

  value = value
    .replace(/\\vspace\{[^}]*\}/g, "\n\n")
    .replace(/\\hrulefill|\\hrule/g, "\n\n@@HR@@\n\n")
    .replace(/\\subsection\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\paragraph\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\paragraph\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/\\begin\{enumerate\}/g, "\n\n@@OL_START@@\n")
    .replace(/\\end\{enumerate\}/g, "\n@@OL_END@@\n\n")
    .replace(/^\s*\\item\s*/gm, "@@LI@@ ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { value, codeBlocks, tableBlocks };
}

function renderStrongHeading(text) {
  const match = text.match(/^\\textbf\{([^{}]+)\}\s*:?\\\\?\s*(.*)$/);
  if (!match) return null;

  const html = [`          <h4>${convertInline(match[1].trim())}</h4>`];
  if (match[2].trim()) html.push(`          <p>${convertInline(match[2].trim())}</p>`);
  return html;
}

function convertBlock(latex) {
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

    const heading = renderStrongHeading(text);
    if (heading) {
      closeList();
      html.push(...heading);
      return;
    }

    closeList();
    html.push(`          <p>${convertInline(text)}</p>`);
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (line === "@@HR@@") {
      flushParagraph();
      closeList();
      html.push('          <hr class="td-divider">');
      continue;
    }

    if (line.startsWith("@@CODE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@CODE:/, "").replace(/@@$/, ""));
      html.push(`          <pre class="code-block language-vhdl"><code>${escapeText(normalized.codeBlocks[index] || "")}</code></pre>`);
      continue;
    }

    if (line.startsWith("@@TABLE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TABLE:/, "").replace(/@@$/, ""));
      html.push(convertTabular(normalized.tableBlocks[index] || ""));
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

function extractSections(latex) {
  const clean = cleanLatex(latex);
  const matches = [...clean.matchAll(/^\\section\*\{([^}]*)\}/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : clean.length;
    const number = title.match(/Exercice\s+([0-9.]+)/i)?.[1] || String(index + 1);
    return {
      number,
      title,
      body: clean.slice(start, end).trim(),
    };
  });
}

function getFigureFiles(tdNumber, index) {
  return figureOverrides[`${tdNumber}:${index + 1}`] || [];
}

function renderFigure(file) {
  const caption = figureCaptions[file] || "Figure du TD VHDL.";
  return `          <figure class="system-diagram td-figure">
            <img src="assets/vhdl/TD/${file}" alt="${caption}" loading="lazy">
            <figcaption class="diagram-caption">${caption}</figcaption>
          </figure>`;
}

function insertAfterFirstHeadingOrParagraph(html, figureHtml) {
  const match = html.match(/          <h4>[\s\S]*?<\/h4>|          <p>[\s\S]*?<\/p>/);
  if (!match) return `${figureHtml}\n${html}`;
  return `${html.slice(0, match.index + match[0].length)}\n${figureHtml}${html.slice(match.index + match[0].length)}`;
}

function insertAfterHeading(html, pattern, figureHtml) {
  const headings = [...html.matchAll(/          <h4>([\s\S]*?)<\/h4>/g)];
  const found = headings.find((match) => pattern.test(match[1]));
  if (!found) return insertAfterFirstHeadingOrParagraph(html, figureHtml);
  return `${html.slice(0, found.index + found[0].length)}\n${figureHtml}${html.slice(found.index + found[0].length)}`;
}

function placeFigures(tdNumber, index, body) {
  const figures = getFigureFiles(tdNumber, index);
  if (!figures.length) return body;
  const key = `${tdNumber}:${index + 1}`;

  if (key === "4:1") {
    let value = insertAfterHeading(body, /1\).*Moore|machine.*Moore/i, renderFigure(figures[0]));
    return insertAfterHeading(value, /3\).*Mealy|machine.*Mealy/i, renderFigure(figures[1]));
  }

  if (key === "4:2") {
    return insertAfterHeading(body, /1\).*diagramme|Dessiner.*diagramme/i, renderFigure(figures[0]));
  }

  if (key === "3:2") {
    return insertAfterHeading(body, /2\.1|Dessinez.*schema|schéma/i, renderFigure(figures[0]));
  }

  if (tdNumber === 2) {
    return insertAfterHeading(body, /Correction/i, figures.map(renderFigure).join("\n"));
  }

  return insertAfterFirstHeadingOrParagraph(body, figures.map(renderFigure).join("\n"));
}

function renderSection(tdNumber, section, index) {
  const label = /^Exercice/i.test(section.title) ? `Exercice ${section.number}` : `Partie ${index + 1}`;
  const body = placeFigures(tdNumber, index, convertBlock(section.body));
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">${convertInline(label)}</span>
              <h3>${convertInline(section.title)}</h3>
            </div>
            <div class="button-row">
              <button type="button" data-mark-done>Marquer comme fait</button>
              <button type="button" data-toggle-redo>A refaire</button>
            </div>
          </header>
          <div id="vhdl-td${tdNumber}-e${index + 1}" class="answer-block">
${body}
          </div>
        </article>`;
}

function renderPage(config, sections) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.title}</title>
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
        <a class="back-link" href="vhdl.html#vhdl-td">Retour aux TD VHDL</a>
        <div>
          <span class="eyebrow">SN361 - TD ${config.n}</span>
          <h1>${config.heading}</h1>
          <p>${config.summary}</p>
          <p>Page reconstruite depuis le fichier LaTeX <code>pdf/vhdl/TD/${config.source}</code>.</p>
        </div>
        <div class="td-actions">
          <a class="primary-button" href="pdf/vhdl/TD/${config.pdf}">Ouvrir le PDF</a>
          <a class="back-link" href="vhdl.html">Cours VHDL</a>
        </div>
      </header>

      <section class="page-section">
${sections.map((section, index) => renderSection(config.n, section, index)).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

for (const config of tdConfig) {
  const sections = extractSections(read(config.source));
  const target = path.join(targetDir, `vhdl-td${config.n}.html`);
  write(target, renderPage(config, sections));
  console.log(`Reconstruit ${path.relative(root, target)} (${sections.length} sections).`);
}
