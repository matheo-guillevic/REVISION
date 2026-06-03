const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "pdf", "vhdl", "exam");
const targetDir = path.join(root, "src", "subjects", "vhdl", "exam");

const exams = [
  {
    n: 1,
    source: "vhdl-exam1.tex",
    pdf: "vhdl-exam1.pdf",
    title: "Examen VHDL 1",
    heading: "Registre generique et compteur modulo N",
    summary: "Register Transfer Level, description structurelle, generate, compteur modulo N et testbench.",
  },
  {
    n: 2,
    source: "vhdl-exam2.tex",
    pdf: "vhdl-exam2.pdf",
    title: "Examen VHDL 2",
    heading: "Timer et controleur de porte de garage",
    summary: "Timer 32 bits, decompteur, multiplexeur, testbench et machine a etats de Moore.",
  },
  {
    n: 3,
    source: "vhdl-exam3.tex",
    pdf: "vhdl-exam3.pdf",
    title: "Examen VHDL 3",
    heading: "Questions de cours et registre a decalage SIPO",
    summary: "Virgule fixe, Karnaugh, numeric_std, processus concurrents, registre SIPO RTL/structurel et chronogrammes.",
  },
];

const figureOverrides = {
  "2:1": ["exam2_vhdl_chronogramme-.svg"],
  "2:2": ["vhdl_exam2_moore_1.svg", "vhdl_exam2_moore_2.svg"],
  "3:2": ["exam3-sipo-2.1.svg"],
};

const figureCaptions = {
  "exam2_vhdl_chronogramme-.svg": "Chronogramme du timer pour les valeurs M=3 puis M=2.",
  "vhdl_exam2_moore_1.svg": "Diagramme de transition de la porte de garage avec remt impulsionnel.",
  "vhdl_exam2_moore_2.svg": "Diagramme de transition de la porte de garage avec remt continu.",
  "exam3-sipo-2.1.svg": "Schema du registre a decalage SIPO de l'examen 3.",
};

function read(fileName) {
  return fs.readFileSync(path.join(sourceDir, fileName), "utf8");
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\\cite\{[^{}]*\}/g, "")
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/^\s*%.*$/gm, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/\\newpage/g, "\n\n")
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
    .replace(/`([^`]*)`/g, "<code>$1</code>")
    .replace(/\\`a/g, "à")
    .replace(/\\'e/g, "é")
    .replace(/\\`e/g, "è")
    .replace(/\\^e/g, "ê")
    .replace(/\\c\{c\}/g, "ç")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\&/g, "&")
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

  value = convertTextCommands(escapeHtml(value));
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

function normalizeLatex(latex) {
  const codeBlocks = [];
  const tableBlocks = [];
  const timingBlocks = [];

  let value = latex
    .replace(/\\begin\{figure\}\[[^\]]*\][\s\S]*?\\end\{figure\}/g, "\n\n")
    .replace(/\\begin\{table\}\[[^\]]*\]/g, "\\begin{table}")
    .replace(/\\begin\{table\}|\\end\{table\}/g, "")
    .replace(/\\begin\{center\}|\\end\{center\}/g, "")
    .replace(/\\centering/g, "")
    .replace(/\\caption\{[^}]*\}/g, "");

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

  return { value, codeBlocks, tableBlocks, timingBlocks };
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
    closeList();
    html.push(`          <p>${convertInline(text)}</p>`);
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("@@CODE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@CODE:/, "").replace(/@@$/, ""));
      html.push(`          <pre class="code-block language-vhdl"><code>${escapeHtml(normalized.codeBlocks[index] || "")}</code></pre>`);
      continue;
    }

    if (line.startsWith("@@TIMING:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TIMING:/, "").replace(/@@$/, ""));
      html.push(`          <div class="content-block neutral">
            <h4>Chronogramme TikZ-Timing source</h4>
            <p>Le chronogramme original est conserve sous forme source pour garder les valeurs temporelles exactes.</p>
            <pre class="code-block language-latex"><code>${escapeHtml(normalized.timingBlocks[index] || "")}</code></pre>
          </div>`);
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
    const number = title.match(/(?:Partie|Exercice)\s+([IVX]+|\d+)/i)?.[1] || String(index + 1);
    return {
      number,
      title,
      body: clean.slice(start, end).trim(),
    };
  });
}

function getFigureFiles(examNumber, index) {
  return figureOverrides[`${examNumber}:${index + 1}`] || [];
}

function renderFigure(file) {
  const caption = figureCaptions[file] || "Figure de l'examen VHDL.";
  return `          <figure class="system-diagram td-figure">
            <img src="assets/vhdl/exam/${file}" alt="${caption}" loading="lazy">
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

function placeFigures(examNumber, index, body) {
  const figures = getFigureFiles(examNumber, index);
  if (!figures.length) return body;
  const key = `${examNumber}:${index + 1}`;

  if (key === "2:1") {
    return insertAfterHeading(body, /Question 2\b/i, renderFigure(figures[0]));
  }

  if (key === "2:2") {
    let value = insertAfterHeading(body, /Question 2\.1\b/i, renderFigure(figures[0]));
    return insertAfterHeading(value, /Question 2\.2\b/i, renderFigure(figures[1]));
  }

  if (key === "3:2") {
    return insertAfterHeading(body, /Question 2\.1\b/i, renderFigure(figures[0]));
  }

  return insertAfterFirstHeadingOrParagraph(body, figures.map(renderFigure).join("\n"));
}

function renderSection(examNumber, section, index) {
  const body = placeFigures(examNumber, index, convertBlock(section.body));
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">Partie ${convertInline(section.number)}</span>
              <h3>${convertInline(section.title)}</h3>
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

function renderPage(config, sections) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.title} - VHDL</title>
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
        <a class="back-link" href="vhdl.html#vhdl-exams">Retour aux examens VHDL</a>
        <div>
          <span class="eyebrow">SN361 - Examen ${config.n}</span>
          <h1>${config.heading}</h1>
          <p>${config.summary}</p>
          <p>Page reconstruite depuis <code>pdf/vhdl/exam/${config.source}</code>, avec les corrections et explications.</p>
        </div>
        <div class="td-actions">
          <a class="primary-button" href="pdf/vhdl/exam/${config.pdf}">Ouvrir le PDF</a>
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

for (const config of exams) {
  const sections = extractSections(read(config.source));
  const target = path.join(targetDir, `vhdl-exam${config.n}.html`);
  write(target, renderPage(config, sections));
  console.log(`Reconstruit ${path.relative(root, target)} (${sections.length} sections).`);
}
