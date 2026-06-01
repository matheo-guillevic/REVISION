const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "pdf", "auto", "TD");
const targetDir = path.join(root, "src", "subjects", "auto", "td");

const tdConfig = [
  {
    n: 1,
    source: "AU361-TD1.tex",
    title: "TD 1 corrige - Modelisation des systemes",
    heading: "Modelisation des systemes lineaires",
  },
  {
    n: 2,
    source: "AU361-TD2.tex",
    title: "TD 2 corrige - Stabilite et correcteurs",
    heading: "Stabilite, robustesse et correcteurs",
  },
  {
    n: 3,
    source: "AU361-TD3.tex",
    title: "TD 3 corrige - Asservissement de position",
    heading: "Asservissement de position",
  },
  {
    n: 4,
    source: "AU361-TD4.tex",
    title: "TD 4 corrige - Synthese RST",
    heading: "Synthese RST",
  },
];

const figureOverrides = {
  "3:1": ["AU361-TD3-Ex1.svg"],
  "3:3": ["AU361-TD3-Ex2.svg"],
  "4:5": ["AU361-TD4-Ex5.svg", "AU361-TD4-Ex5-q4.svg"],
};

const figureCaptions = {
  "AU361-TD1-Ex1.svg": "Schema de regulation de niveau du reservoir.",
  "AU361-TD1-Ex2.svg": "Schema fonctionnel de l'asservissement de vitesse.",
  "AU361-TD1-Ex3.svg": "Modele thermique de l'enceinte.",
  "AU361-TD1-Ex4.svg": "Reponse experimentale du cryostat.",
  "AU361-TD2-Ex1.svg": "Lieu frequentiel et lecture de stabilite.",
  "AU361-TD2-Ex2.svg": "Structure et lecture frequentielle du correcteur PI.",
  "AU361-TD2-Ex3.svg": "Reponse et limites de stabilite du troisieme ordre.",
  "AU361-TD2-Ex4.svg": "Schema de rejet de perturbation.",
  "AU361-TD3-Ex1.svg": "Boucle d'asservissement de position avec perturbation.",
  "AU361-TD3-Ex2.svg": "Moteur asservi en position.",
  "AU361-TD4-Ex3.svg": "Structure RST du moteur asservi en position.",
  "AU361-TD4-Ex4.svg": "Structure de synthese RST stricte.",
  "AU361-TD4-Ex5.svg": "Modele thermique de l'enceinte.",
  "AU361-TD4-Ex5-q4.svg": "Boucle RST pour la regulation de temperature.",
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
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .trim();
}

function convertTextCommands(text) {
  let value = text;
  for (let pass = 0; pass < 4; pass += 1) {
    value = value
      .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>");
  }
  return value
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
    math.push(fragment.replace(/\\textbf\{/g, "\\mathbf{"));
    return `@@MATH${math.length - 1}@@`;
  }

  value = value
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, body) => storeMath(`\\(${body.trim()}\\)`))
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => storeMath(`\\[${body.trim()}\\]`))
    .replace(/\$([^$\n]+)\$/g, (_, body) => storeMath(`\\(${body.trim()}\\)`));

  value = convertTextCommands(escapeText(value));
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  math.forEach((fragment, index) => {
    value = value.replace(`@@MATH${index}@@`, fragment);
  });

  return value;
}

function convertTabular(block) {
  const rows = block
    .replace(/\\hline/g, "")
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean);

  const body = rows
    .map((row) => {
      const cells = row
        .split("&")
        .map((cell) => `<td>${convertInline(cell.trim())}</td>`)
        .join("");
      return `              <tr>${cells}</tr>`;
    })
    .join("\n");

  return `          <div class="latex-table-wrap">
            <table class="latex-table">
${body}
            </table>
          </div>`;
}

function normalizeLatex(latex) {
  return latex
    .replace(/\\vspace\{[^}]*\}/g, "\n\n")
    .replace(/\\hrulefill|\\hrule/g, "\n\n@@HR@@\n\n")
    .replace(/\\begin\{center\}\s*\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}\s*\\end\{center\}/g, (_, table) => `\n\n@@TABLE:${Buffer.from(table).toString("base64")}@@\n\n`)
    .replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, table) => `\n\n@@TABLE:${Buffer.from(table).toString("base64")}@@\n\n`)
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/\\begin\{enumerate\}/g, "\n\n@@OL_START@@\n")
    .replace(/\\end\{enumerate\}/g, "\n@@OL_END@@\n\n")
    .replace(/^\s*\\item\s*/gm, "@@LI@@ ")
    .replace(/^\s*-\s+/gm, "@@LI@@ ")
    .replace(/\\subsection\*\{([^}]*)\}/g, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderStrongHeading(text) {
  const match = text.match(/^\\textbf\{([^{}]+)\}\s*(.*)$/);
  if (!match) return null;

  const title = match[1].replace(/\\+$/, "").trim();
  const rest = match[2].replace(/^\\\\\s*/, "").trim();
  const html = [`          <h4>${convertInline(title)}</h4>`];
  if (rest) html.push(`          <p>${convertInline(rest)}</p>`);
  return html;
}

function convertBlock(latex) {
  const lines = normalizeLatex(latex).split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;

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

  function closeList() {
    if (!listType) return;
    html.push(`          </${listType}>`);
    listType = null;
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

    if (line.startsWith("@@TABLE:")) {
      flushParagraph();
      closeList();
      const table = Buffer.from(line.slice(8, -2), "base64").toString("utf8");
      html.push(convertTabular(table));
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

    if (listType && html.length && /^\s{2,}\S/.test(rawLine) && html[html.length - 1].startsWith("            <li>")) {
      html[html.length - 1] = html[html.length - 1].replace(/<\/li>$/, ` ${convertInline(line)}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return html.join("\n");
}

function getFigureFiles(tdNumber, section, index) {
  const override = figureOverrides[`${tdNumber}:${index + 1}`];
  if (override) return override;

  const exerciseNumber = section.title.match(/^Exercice\s+(\d+)/i)?.[1];
  if (!exerciseNumber) return [];

  const file = `AU361-TD${tdNumber}-Ex${exerciseNumber}.svg`;
  return fs.existsSync(path.join(root, "assets", "auto", "TD", file)) ? [file] : [];
}

function renderFigure(file) {
  const caption = figureCaptions[file] || "Figure de l'enonce.";
  return `          <figure class="system-diagram td-figure">
            <img src="assets/auto/TD/${file}" alt="${caption}" loading="lazy">
            <figcaption class="diagram-caption">${caption}</figcaption>
          </figure>`;
}

function extractSections(latex) {
  const clean = cleanLatex(latex);
  const matches = [...clean.matchAll(/^\\section\*\{([^}]*)\}/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : clean.length;
    const number = title.match(/(?:Exercice|Partie)\s+([IVX]+|\d+)/i)?.[1] || String(index + 1);
    return {
      number,
      title,
      body: clean.slice(start, end).trim(),
    };
  });
}

function renderSection(tdNumber, section, index) {
  const label = /^Exercice/i.test(section.title) ? `Exercice ${section.number}` : `Partie ${section.number}`;
  const figures = getFigureFiles(tdNumber, section, index).map(renderFigure).join("\n");
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
          <div id="auto-td${tdNumber}-e${index + 1}" class="answer-block">
${figures}
${convertBlock(section.body)}
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
        <a class="back-link" href="auto.html#auto-td">Retour aux TD d'automatique</a>
        <div>
          <span class="eyebrow">AU361 - TD ${config.n}</span>
          <h1>${config.heading}</h1>
          <p>Corrige reconstruit depuis le fichier LaTeX <code>pdf/auto/TD/${config.source}</code>.</p>
        </div>
        <div class="td-actions">
          <a class="primary-button" href="pdf/auto/TD/AU361-TD${config.n}.pdf">Ouvrir le PDF</a>
          <a class="back-link" href="auto.html">Cours d'automatique</a>
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
  const target = path.join(targetDir, `auto-td${config.n}.html`);
  write(target, renderPage(config, sections));
  console.log(`Reconstruit ${path.relative(root, target)} (${sections.length} sections).`);
}
