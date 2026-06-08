const fs = require("fs");
const path = require("path");

const root = process.cwd();
const configPath = path.join(__dirname, "td-pages.json");
const pageConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
const figureCaptions = pageConfig.figureCaptions || {};

function hydrateGroup(group) {
  return {
    ...group,
    sourceDir: path.join(root, group.sourceDir),
    targetDir: path.join(root, group.targetDir),
    titlePattern: new RegExp(group.titlePattern || "\\\\section\\*\\{([^}]*)\\}", group.titlePatternFlags || "g"),
    pages: group.pages.map((page) => ({
      ...page,
      figures: Object.fromEntries(
        Object.entries(page.figures || {}).map(([unitIndex, figures]) => [
          unitIndex,
          figures.map((figure) => ({ ...figure, after: figure.after ? new RegExp(figure.after, "i") : null })),
        ])
      ),
    })),
  };
}

const tdGroups = pageConfig.groups.map(hydrateGroup);

function repairMojibake(text) {
  if (!/[ÃƒÃ‚]/.test(text)) return text;
  return Buffer.from(text, "latin1").toString("utf8");
}

function read(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  return /[ÃÂ]/.test(text) ? Buffer.from(text, "latin1").toString("utf8") : repairMojibake(text);
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function toWebPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\[span_\d+\]\(start_span\)|\[span_\d+\]\(end_span\)/g, "")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .replace(/\\cite\{[^{}]*\}/g, "")
    .replace(/^\s*%.*$/gm, "")
    .replace(/^[\s\S]*?\\begin\{document\}/, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/\\newpage/g, "\n\n")
    .trim();
}

function cleanTitle(title) {
  return title
    .replace(/\\centering\s*/g, "")
    .replace(/\\Large\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findBalancedCommands(source, needle) {
  const matches = [];
  let cursor = 0;

  while (cursor < source.length) {
    const start = source.indexOf(needle, cursor);
    if (start === -1) break;

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

    matches.push({
      start,
      end: index,
      body: source.slice(start + needle.length, index - 1),
    });
    cursor = index;
  }

  return matches;
}

function replaceBalancedCommands(source, replacements) {
  const matches = replacements
    .flatMap(({ needle, render }) => findBalancedCommands(source, needle).map((match) => ({ ...match, render })))
    .sort((a, b) => a.start - b.start);

  if (!matches.length) return source;

  let output = "";
  let cursor = 0;
  for (const match of matches) {
    if (match.start < cursor) continue;
    output += source.slice(cursor, match.start);
    output += match.render(match.body);
    cursor = match.end;
  }
  output += source.slice(cursor);
  return output;
}

function extractMetadata(source) {
  function commandBody(command) {
    const match = findBalancedCommands(source, `\\${command}{`)[0];
    return match ? convertInline(match.body) : "";
  }

  return {
    title: commandBody("title"),
    author: commandBody("author"),
    date: commandBody("date"),
  };
}

function normalizeAccents(text) {
  return text
    .replace(/\\`a/g, "à")
    .replace(/\\'a/g, "á")
    .replace(/\\`e/g, "è")
    .replace(/\\'e/g, "é")
    .replace(/\\^e/g, "ê")
    .replace(/\\"e/g, "ë")
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
      .replace(/\\bar\{([^{}]+)\}/g, "\\bar{$1}")
      .replace(/\\overline\{([^{}]+)\}/g, "\\overline{$1}");
  }

  return normalizeAccents(value)
    .replace(/``([^`]*)''/g, "&laquo; $1 &raquo;")
    .replace(/<<\s*([^>]*)\s*>>/g, "&laquo; $1 &raquo;")
    .replace(/`([^`]*)`/g, "<code>$1</code>")
    .replace(/\\quad|\\qquad/g, " ")
    .replace(/\\hfill/g, " ")
    .replace(/\\hspace\*?\{[^{}]*\}/g, " ")
    .replace(/\\noindent/g, "")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\&/g, "&")
    .replace(/\\times/g, "\\times")
    .replace(/\\ldots/g, "\\ldots")
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

function normalizeLatex(latex) {
  const codeBlocks = [];
  const tableBlocks = [];
  let value = latex
    .replace(/\\begin\{figure\}\[[^\]]*\][\s\S]*?\\end\{figure\}/g, "\n\n")
    .replace(/\\begin\{table\}\[[^\]]*\]/g, "\\begin{table}")
    .replace(/\\begin\{table\}|\\end\{table\}/g, "")
    .replace(/^\\begin\{tabularx\}.*$/gm, "\\begin{tabular}{lll}")
    .replace(/\\end\{tabularx\}/g, "\\end{tabular}")
    .replace(/\\centering/g, "")
    .replace(/\\caption\{[^}]*\}/g, "");

  value = value.replace(/\\begin\{lstlisting\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{lstlisting\}/g, (_, code) => {
    codeBlocks.push(code.replace(/^\n+|\n+$/g, ""));
    return `\n\n@@CODE:${codeBlocks.length - 1}@@\n\n`;
  });

  value = value.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, table) => {
    tableBlocks.push(table);
    return `\n\n@@TABLE:${tableBlocks.length - 1}@@\n\n`;
  });

  value = replaceBalancedCommands(value, [
    { needle: "\\subsubsection*{", render: (body) => `\n\n@@SUBSECTION:${body}@@\n\n` },
    { needle: "\\subsection*{", render: (body) => `\n\n@@SUBSECTION:${body}@@\n\n` },
    { needle: "\\paragraph*{", render: (body) => `\n\n@@SUBSECTION:${body}@@\n\n` },
    { needle: "\\paragraph{", render: (body) => `\n\n@@SUBSECTION:${body}@@\n\n` },
  ]);

  value = value
    .replace(/\\begin\{(?:minipage|center)\}(?:\[[^\]]*\])?(?:\{[^{}]*\})?/g, "")
    .replace(/\\end\{(?:minipage|center)\}/g, "")
    .replace(/\\begin\{itemize\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{itemize\}/g, "\n@@UL_END@@\n\n")
    .replace(/\\begin\{enumerate\}/g, "\n\n@@OL_START@@\n")
    .replace(/\\end\{enumerate\}/g, "\n@@OL_END@@\n\n")
    .replace(/^\s*\\item(?:\[[^\]]+\])?\s*/gm, "@@LI@@ ")
    .replace(/\\(?:vspace|smallskip|medskip|bigskip)\{?[^{}\n]*\}?/g, "\n")
    .replace(/\\hrulefill|\\hrule/g, "\n\n@@HR@@\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { value, codeBlocks, tableBlocks };
}

function convertTabular(block, normalized, group) {
  const rows = block
    .replace(/\\toprule|\\midrule|\\bottomrule|\\hline/g, "")
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean);

  const body = rows
    .map((row, index) => {
      const tag = index === 0 && /\\textbf/.test(row) ? "th" : "td";
      const cells = row
        .split("&")
        .map((cell) => `                <${tag}>${convertInline(cell.trim())}</${tag}>`)
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

function renderCorrection(body, group) {
  return `          <div class="td-step-block td-solution-block">
            <strong>Correction et raisonnement</strong>
${convertBlock(body, group)}
          </div>`;
}

function convertBlock(latex, group, corrBlocks = []) {
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

    if (line === "@@HR@@") {
      flushParagraph();
      closeList();
      html.push('          <hr class="td-divider">');
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
      const language = group.codeLanguage || "text";
      html.push(`          <pre class="code-block language-${language}"><code class="language-${language}">${escapeHtml(normalized.codeBlocks[index] || "")}</code></pre>`);
      continue;
    }

    if (line.startsWith("@@TABLE:")) {
      flushParagraph();
      closeList();
      const index = Number(line.replace(/^@@TABLE:/, "").replace(/@@$/, ""));
      html.push(convertTabular(normalized.tableBlocks[index] || "", normalized, group));
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
  const matches = findBalancedCommands(source, "\\section*{");

  return matches.map((match, index) => {
    const title = cleanTitle(match.body);
    const start = match.end;
    const end = matches[index + 1] ? matches[index + 1].start : source.length;
    const number = title.match(/(?:Exercice|EXERCICE|Partie)\s+([IVX]+|[0-9.]+)/i)?.[1] || String(index + 1);
    const label = /partie/i.test(title) ? `Partie ${number}` : `Exercice ${number}`;
    return {
      index: index + 1,
      number,
      label,
      title,
      body: source.slice(start, end).trim(),
      corrBlocks: withCorrections.blocks,
    };
  });
}

function extractDocumentHeader(latex, group) {
  const clean = cleanLatex(latex);
  const withCorrections = extractBalancedCommand(clean, "corr");
  const source = withCorrections.value;
  const firstSection = findBalancedCommands(source, "\\section*{")[0];
  const headerLatex = firstSection ? source.slice(0, firstSection.start).trim() : "";
  const metadata = extractMetadata(latex);
  const metadataItems = [
    metadata.author,
    metadata.date,
  ].filter(Boolean);

  const convertedHeader = headerLatex ? convertBlock(headerLatex, group, withCorrections.blocks) : "";
  return {
    title: metadata.title,
    metaHtml: metadataItems.length ? `          <p>${metadataItems.join(" · ")}</p>` : "",
    bodyHtml: convertedHeader,
  };
}

function renderFigure(file, group) {
  const caption = figureCaptions[file] || "Figure du TD.";
  return `          <figure class="system-diagram td-figure">
            <img src="${group.assetPrefix}/${file}" alt="${escapeHtml(caption)}" loading="lazy">
            <figcaption class="diagram-caption">${escapeHtml(caption)}</figcaption>
          </figure>`;
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

function placeConfiguredFigures(body, page, group, unit) {
  const figures = page.figures?.[unit.index] || [];
  return figures.reduce((html, figure) => insertAfterHeadingOrParagraph(html, figure.after, renderFigure(figure.file, group)), body);
}

function renderUnit(unit, group, page) {
  const body = placeConfiguredFigures(convertBlock(unit.body, group, unit.corrBlocks), page, group, unit);
  const id = `${group.idPrefix}${page.n}-e${unit.index}`;
  return `        <article class="exercise-card" data-exercise>
          <header>
            <div>
              <span class="status-pill">${convertInline(unit.label)}</span>
              <h3>${convertInline(unit.title)}</h3>
            </div>
            <div class="button-row">
              <button type="button" data-mark-done>Marquer comme fait</button>
              <button type="button" data-toggle-redo>A refaire</button>
            </div>
          </header>
          <div id="${id}" class="answer-block">
${body}
          </div>
        </article>`;
}

function renderPage(group, page, units, documentHeader) {
  const prism = group.withPrism
    ? '\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">'
    : "";
  const prismScripts = group.withPrism
    ? '\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"></script>\n    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"></script>'
    : "";
  const pdfLink = page.pdf
    ? `\n          <a class="primary-button" href="${toWebPath(path.join("pdf", group.subject, "TD", page.pdf))}">Ouvrir le PDF</a>`
    : "";
  const heading = documentHeader.title || page.heading;

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${page.title}</title>
    <link rel="stylesheet" href="styles.css">${prism}
    <script>
      window.MathJax = {
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"]] },
        svg: { fontCache: "global" }
      };
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>${prismScripts}
    <script defer src="script.js"></script>
  </head>
  <body class="td-page">
    <main class="main-content">
      <header class="td-header">
        <a class="back-link" href="${group.backHref}">${group.backLabel}</a>
        <div>
          <span class="eyebrow">${page.eyebrow}</span>
          <h1>${heading}</h1>
${documentHeader.metaHtml ? `${documentHeader.metaHtml}\n` : ""}${documentHeader.bodyHtml ? `${documentHeader.bodyHtml}\n` : ""}
          <p>${page.summary}</p>
          <p>Page reconstruite depuis <code>${toWebPath(path.relative(root, path.join(group.sourceDir, page.source)))}</code>.</p>
        </div>
        <div class="td-actions">${pdfLink}
          <a class="back-link" href="${group.courseHref}">${group.courseLabel}</a>
        </div>
      </header>

      <section class="page-section">
${units.map((unit) => renderUnit(unit, group, page)).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

for (const group of tdGroups) {
  for (const page of group.pages) {
    const sourcePath = path.join(group.sourceDir, page.source);
    const targetPath = path.join(group.targetDir, page.target);
    const latex = read(sourcePath);
    const units = extractUnits(latex, group);
    const documentHeader = extractDocumentHeader(latex, group);
    write(targetPath, renderPage(group, page, units, documentHeader));
    console.log(`Reconstruit ${path.relative(root, targetPath)} (${units.length} sections).`);
  }
}
