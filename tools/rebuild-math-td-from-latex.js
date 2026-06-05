const fs = require("fs");
const path = require("path");

const root = process.cwd();

const tdConfig = [
  {
    n: 1,
    source: "pdf/math/TD/td1 math.tex",
    title: "TD 1 corrige - Denombrement et probabilites",
    eyebrow: "TD 1",
    heading: "Denombrement et probabilites",
    intro: "Corrige reconstruit depuis le fichier LaTeX correspondant.",
  },
  {
    n: 2,
    source: "pdf/math/TD/td2 math.tex",
    title: "TD 2 corrige - Espaces probabilises",
    eyebrow: "TD 2",
    heading: "Espaces probabilises",
    intro: "Corrige reconstruit depuis le fichier LaTeX correspondant.",
  },
  {
    n: 3,
    source: "pdf/math/TD/td3 math.tex",
    title: "TD 3 corrige - Variables aleatoires",
    eyebrow: "TD 3",
    heading: "Variables aleatoires",
    intro: "Corrige reconstruit depuis le fichier LaTeX correspondant.",
  },
  {
    n: 4,
    source: "pdf/math/TD/td4 math.tex",
    title: "TD 4 corrige - Variables aleatoires continues",
    eyebrow: "TD 4",
    heading: "Variables aleatoires continues",
    intro: "Corrige reconstruit depuis le fichier LaTeX correspondant.",
  },
  {
    n: 5,
    source: "pdf/math/TD/td5 math.tex",
    title: "TD 5 corrige - Couples de variables aleatoires",
    eyebrow: "TD 5",
    heading: "Couples de variables aleatoires",
    intro: "Corrige reconstruit depuis le fichier LaTeX correspondant.",
  },
];

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function write(filePath, html) {
  fs.writeFileSync(path.join(root, filePath), `${html.trimEnd()}\n`, "utf8");
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\[span_\d+\]\(start_span\)|\[span_\d+\]\(end_span\)/g, "")
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/^[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .trim();
}

function escapeText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function convertInline(text) {
  const math = [];
  const dollarPlaceholder = "@@ESCAPED_DOLLAR@@";
  const ampPlaceholder = "@@ESCAPED_AMP@@";
  let value = text.replace(/\\\$/g, dollarPlaceholder).replace(/\\&/g, ampPlaceholder);

  value = value.replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => {
    math.push(`\\[${body.trim().replaceAll(dollarPlaceholder, "\\$")}\\]`);
    return `@@MATH${math.length - 1}@@`;
  });

  value = value.replace(/\$([^$\n]+)\$/g, (_, body) => {
    math.push(`\\(${body.trim().replaceAll(dollarPlaceholder, "\\$")}\\)`);
    return `@@MATH${math.length - 1}@@`;
  });

  value = escapeText(value)
    .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
    .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
    .replace(/\\mathbf\{([^{}]*)\}/g, "<strong>$1</strong>")
    .replace(/\\bar\{([^{}]+)\}/g, "\\bar{$1}")
    .replace(/\\times/g, "\\times")
    .replace(/\\ldots/g, "\\ldots")
    .replace(/\\\\/g, "<br>");

  value = value.replaceAll(dollarPlaceholder, "$");
  value = value.replaceAll(ampPlaceholder, "&amp;");

  math.forEach((fragment, index) => {
    value = value.replace(`@@MATH${index}@@`, fragment);
  });

  return value;
}

function normalizeLabel(label) {
  return label.replace(/\s*:\s*$/, "").trim();
}

function classifyLabel(label) {
  if (/Raisonnement|Correction/i.test(label)) return "reasoning";
  if (/Réponses?/i.test(label)) return "solution";
  return null;
}

function replaceBalancedCommand(source, command, replacer) {
  let output = "";
  let cursor = 0;
  const needle = `\\${command}{`;

  while (cursor < source.length) {
    const start = source.indexOf(needle, cursor);
    if (start === -1) {
      output += source.slice(cursor);
      break;
    }

    output += source.slice(cursor, start);
    let index = start + needle.length;
    let depth = 1;

    while (index < source.length && depth > 0) {
      if (source[index] === "{") depth += 1;
      if (source[index] === "}") depth -= 1;
      index += 1;
    }

    const body = source.slice(start + needle.length, index - 1);
    output += replacer(body);
    cursor = index;
  }

  return output;
}

function convertCorrBlocks(latex) {
  return replaceBalancedCommand(latex, "corr", (body) => `\n\n\\textbf{Correction \\& Raisonnement :} ${body}\n\n`);
}

function renderLatexTable(body) {
  const rows = body
    .replace(/\\hline/g, "")
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean);

  if (!rows.length) return "";

  const renderedRows = rows.map((row) => {
    const cells = row
      .split("&")
      .map((cell) => cell.trim())
      .filter(Boolean)
      .map((cell) => `                    <td>${convertInline(cell)}</td>`)
      .join("\n");

    return `                  <tr>\n${cells}\n                  </tr>`;
  });

  return `          <div class="latex-table-wrap">
            <table class="latex-table">
              <tbody>
${renderedRows.join("\n")}
              </tbody>
            </table>
          </div>`;
}

function extractHtmlBlocks(latex) {
  const blocks = [];
  const source = latex.replace(/\\begin\{center\}\s*/g, "").replace(/\s*\\end\{center\}/g, "");
  const value = source.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, body) => {
    blocks.push(renderLatexTable(body));
    return `\n\n@@HTML_BLOCK_${blocks.length - 1}@@\n\n`;
  });

  return { value, blocks };
}

function renderParagraph(text) {
  const labelPattern = /\\textbf\{([^{}]*(?:Raisonnement|Réponse|Réponses)[^{}]*)\}/gi;
  const matches = [...text.matchAll(labelPattern)];

  if (!matches.length) {
    return [`          <p>${convertInline(text)}</p>`];
  }

  const blocks = [];
  const intro = text.slice(0, matches[0].index).trim();
  if (intro) blocks.push(`          <p>${convertInline(intro)}</p>`);

  matches.forEach((match, index) => {
    const label = normalizeLabel(match[1]);
    const kind = classifyLabel(label);
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : text.length;
    const body = text.slice(start, end).trim();

    if (!kind) {
      if (body) blocks.push(`          <p><strong>${convertInline(label)}</strong> ${convertInline(body)}</p>`);
      return;
    }

    const className = kind === "reasoning" ? "td-reasoning-block" : "td-solution-block";
    blocks.push(`          <div class="td-step-block ${className}">
            <strong>${convertInline(label)}</strong>${body ? `\n            <p>${convertInline(body)}</p>` : ""}
          </div>`);
  });

  return blocks;
}

function normalizeLines(latex) {
  return latex
    .replace(/^%.*$/gm, "")
    .replace(/^Équipe Pédagogique.*Page.*$/gm, "")
    .replace(/\\hrulefill/g, "\n\n")
    .replace(/\\newpage/g, "\n\n")
    .replace(/\\vfill/g, "\n")
    .replace(/\\hfill/g, " ")
    .replace(/\\noindent/g, "")
    .replace(/\\vspace\{[^}]*\}/g, "\n")
    .replace(/\\hrule/g, "\n")
    .replace(/\\begin\{center\}|\\end\{center\}/g, "\n")
    .replace(/^\\subsection\*\{(.+)\}$/gm, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/^\s*\\item\s*/gm, "@@LI@@ ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function convertBlock(latex) {
  const { value, blocks: htmlBlocks } = extractHtmlBlocks(convertCorrBlocks(latex));
  const lines = normalizeLines(value).split("\n");
  const html = [];
  let paragraph = [];
  let inList = false;

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    if (text) html.push(...renderParagraph(text));
    paragraph = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (/^@@HTML_BLOCK_\d+@@$/.test(line)) {
      flushParagraph();
      const index = Number(line.match(/\d+/)[0]);
      html.push(htmlBlocks[index]);
      continue;
    }

    if (line.startsWith("@@SUBSECTION:")) {
      flushParagraph();
      const title = line.replace(/^@@SUBSECTION:/, "").replace(/@@$/, "");
      html.push(`          <h4>${convertInline(title)}</h4>`);
      continue;
    }

    if (line === "@@UL_START@@") {
      flushParagraph();
      html.push("          <ul class=\"formula-list\">");
      inList = true;
      continue;
    }

    if (line === "@@UL_END@@") {
      flushParagraph();
      if (inList) html.push("          </ul>");
      inList = false;
      continue;
    }

    if (line.startsWith("@@LI@@")) {
      flushParagraph();
      html.push(`            <li>${convertInline(line.replace(/^@@LI@@\s*/, ""))}</li>`);
      continue;
    }

    if (inList && html.length && html[html.length - 1].startsWith("            <li>")) {
      html[html.length - 1] = html[html.length - 1].replace(/<\/li>$/, ` ${convertInline(line)}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  if (inList) html.push("          </ul>");
  return html.join("\n");
}

function extractExercises(latex) {
  const clean = cleanLatex(latex);
  const matches = [
    ...clean.matchAll(/^\\section\*\{Exercice\s+(\d+)([^}]*)\}/gm),
    ...clean.matchAll(/\\textbf\{\\Large\s+Exercice\s+(\d+)([^}]*)\}/g),
  ].sort((a, b) => a.index - b.index);

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : clean.length;
    const titleSuffix = match[2] ? match[2].trim().replace(/^\s*-\s*/, "") : "";
    return {
      n: match[1],
      title: titleSuffix ? `Exercice ${match[1]} - ${titleSuffix}` : `Exercice ${match[1]}`,
      body: clean.slice(start, end).trim(),
    };
  });
}

function renderExercise(tdNumber, exercise) {
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">Exercice ${exercise.n}</span>
              <h3>${convertInline(exercise.title)}</h3>
            </div>
            <div class="button-row">
              <button type="button" data-mark-done>Marquer comme fait</button>
              <button type="button" data-toggle-redo>A refaire</button>
            </div>
          </header>
          <div id="td${tdNumber}-e${exercise.n}" class="answer-block">
${convertBlock(exercise.body)}
          </div>
        </article>`;
}

function renderPage(config, exercises) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.title}</title>
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
        <a class="back-link" href="math.html#probabilites-td">Retour aux TD</a>
        <div>
          <span class="eyebrow">${config.eyebrow}</span>
          <h1>${config.heading}</h1>
          <p>${config.intro}</p>
        </div>
      </header>

      <section class="page-section">
${exercises.map((exercise) => renderExercise(config.n, exercise)).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

for (const config of tdConfig) {
  const exercises = extractExercises(read(config.source));
  const html = renderPage(config, exercises);
  const target = `src/subjects/probabilites/td/td${config.n}.html`;
  write(target, html);
  console.log(`Reconstruit ${target} (${exercises.length} exercices).`);
}
