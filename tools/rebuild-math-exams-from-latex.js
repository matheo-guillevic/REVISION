const fs = require("fs");
const path = require("path");

const root = process.cwd();
const examDir = path.join(root, "src", "subjects", "probabilites", "exam");

const exams = [
  {
    source: "pdf/math/EXAM/Contrôle examen dénombrement.txt",
    target: "controle-denombrement.html",
    title: "Controle corrige - Denombrement",
    eyebrow: "Controle",
    heading: "Denombrement",
  },
  {
    source: "pdf/math/EXAM/Contrôle examen VA.txt",
    target: "controle-va.html",
    title: "Controle corrige - Variables aleatoires",
    eyebrow: "Controle",
    heading: "Variables aleatoires",
  },
  {
    source: "pdf/math/EXAM/Partiel-1.txt",
    target: "partiel-1.html",
    title: "Partiel corrige 1 - Probabilites",
    eyebrow: "Partiel 1",
    heading: "Corrige de partiel",
  },
  {
    source: "pdf/math/EXAM/Partiel-2.txt",
    target: "partiel-2.html",
    title: "Partiel corrige 2 - Probabilites",
    eyebrow: "Partiel 2",
    heading: "Corrige de partiel",
  },
  {
    source: "pdf/math/EXAM/Partiel-3.txt",
    target: "partiel-3.html",
    title: "Partiel corrige 3 - Probabilites",
    eyebrow: "Partiel 3",
    heading: "Corrige de partiel",
  },
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function cleanLatex(source) {
  const withoutPreamble = source
    .replace(/\r\n/g, "\n")
    .replace(/\\newcommand\{\\(?:raisonnement|explication)\}\[1\]\{[\s\S]*?\n\}/g, "")
    .replace(/^[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/g, "")
    .replace(/\\vspace\{[^{}]*\}/g, "\n")
    .replace(/\\hrule/g, "\n")
    .trim();

  return replaceReasoningMacros(withoutPreamble);
}

function replaceReasoningMacros(source) {
  let result = "";
  let index = 0;
  const macroPattern = /\\(?:raisonnement|explication)\{/g;

  while (index < source.length) {
    macroPattern.lastIndex = index;
    const match = macroPattern.exec(source);
    if (!match) {
      result += source.slice(index);
      break;
    }

    result += source.slice(index, match.index);
    let cursor = macroPattern.lastIndex;
    let depth = 1;

    while (cursor < source.length && depth > 0) {
      const char = source[cursor];
      if (char === "{") depth += 1;
      if (char === "}") depth -= 1;
      cursor += 1;
    }

    const body = source.slice(macroPattern.lastIndex, cursor - 1);
    result += `\n\n\\textbf{Raisonnement :} ${body}\n\n`;
    index = cursor;
  }

  return result;
}

function exposeReasoningComments(source) {
  const lines = source.split("\n");
  const out = [];
  let commentBuffer = [];

  function flushComments() {
    if (!commentBuffer.length) return;
    const text = commentBuffer
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/^Raisonnement(?:\s+\w+)?\s*:\s*/i, "");
    out.push(`\\textbf{Raisonnement :} ${text}`);
    commentBuffer = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^%\s*Raisonnement/i.test(trimmed)) {
      commentBuffer.push(trimmed.replace(/^%\s*/, ""));
      continue;
    }
    if (commentBuffer.length && /^%\s+/.test(trimmed)) {
      commentBuffer.push(trimmed.replace(/^%\s*/, ""));
      continue;
    }
    flushComments();
    if (!trimmed.startsWith("%")) out.push(line);
  }

  flushComments();
  return out.join("\n");
}

function escapeText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function convertInline(text) {
  const math = [];
  let value = text.replace(/\\\$/g, "@@DOLLAR@@");

  value = value.replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => {
    math.push(`\\[${body.trim().replaceAll("@@DOLLAR@@", "\\$")}\\]`);
    return `@@MATH${math.length - 1}@@`;
  });

  value = value.replace(/\$([^$\n]+)\$/g, (_, body) => {
    math.push(`\\(${body.trim().replaceAll("@@DOLLAR@@", "\\$")}\\)`);
    return `@@MATH${math.length - 1}@@`;
  });

  value = escapeText(value)
    .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
    .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
    .replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>")
    .replace(/\\Large\s*/g, "")
    .replace(/\\noindent\s*/g, "")
    .replace(/\\\\/g, "<br>")
    .replaceAll("@@DOLLAR@@", "$");

  math.forEach((fragment, index) => {
    value = value.replace(`@@MATH${index}@@`, fragment);
  });

  return value;
}

function normalizeLabel(label) {
  return label.replace(/\s*:\s*$/, "").trim();
}

function classifyLabel(label) {
  if (/Raisonnement/i.test(label)) return "reasoning";
  if (/Réponses?/i.test(label)) return "solution";
  return null;
}

function renderParagraph(text) {
  const labelPattern = /\\textbf\{([^{}]*(?:Raisonnement|Réponse|Réponses)[^{}]*)\}/gi;
  const matches = [...text.matchAll(labelPattern)];

  if (!matches.length) return [`          <p>${convertInline(text)}</p>`];

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
      blocks.push(`          <p><strong>${convertInline(label)}</strong> ${convertInline(body)}</p>`);
      return;
    }

    const className = kind === "reasoning" ? "td-reasoning-block" : "td-solution-block";
    blocks.push(`          <div class="td-step-block ${className}">
            <strong>${convertInline(label)}</strong>${body ? `\n            <p>${convertInline(body)}</p>` : ""}
          </div>`);
  });

  return blocks;
}

function renderListItemContent(text) {
  const reasoningMatch = text.match(/\\textbf\{([^{}]*Raisonnement[^{}]*)\}\s*([\s\S]*)/i);
  if (!reasoningMatch) return convertInline(text);

  const prefix = text.slice(0, reasoningMatch.index).trim();
  const label = normalizeLabel(reasoningMatch[1]);
  const body = reasoningMatch[2].trim();
  const content = [];

  if (prefix) content.push(convertInline(prefix));
  content.push(`<div class="td-step-block td-reasoning-block">
              <strong>${convertInline(label)}</strong>${body ? `\n              <p>${convertInline(body)}</p>` : ""}
            </div>`);

  return content.join("\n            ");
}

function normalizeLines(latex) {
  return exposeReasoningComments(latex)
    .replace(/\\begin\{align\*\}/g, "\n\n$$\\begin{align*}")
    .replace(/\\end\{align\*\}/g, "\\end{align*}$$\n\n")
    .replace(/^\\subsection\*\{(.+)\}$/gm, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\begin\{(?:itemize|enumerate)\}/g, "\n\n@@UL_START@@\n")
    .replace(/\\end\{(?:itemize|enumerate)\}/g, "\n@@UL_END@@\n\n")
    .replace(/^\s*\\item(?:\[[^\]]+\])?\s*/gm, "@@LI@@ ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function convertBlock(latex) {
  const lines = normalizeLines(latex).split("\n");
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
      html.push(`            <li>${renderListItemContent(line.replace(/^@@LI@@\s*/, ""))}</li>`);
      continue;
    }

    if (inList && html.length && html[html.length - 1].startsWith("            <li>")) {
      html[html.length - 1] = html[html.length - 1].replace(/<\/li>$/, ` ${renderListItemContent(line)}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  if (inList) html.push("          </ul>");
  return orderStepBlocks(html).join("\n");
}

function orderStepBlocks(html) {
  const ordered = [];

  for (let index = 0; index < html.length; index += 1) {
    const current = html[index];
    const next = html[index + 1];
    if (
      current?.includes("td-solution-block") &&
      next?.includes("td-reasoning-block")
    ) {
      ordered.push(next, current);
      index += 1;
      continue;
    }
    ordered.push(current);
  }

  return ordered;
}

function extractExercises(latex) {
  const clean = cleanLatex(latex);
  const matches = [...clean.matchAll(/^\\section\*\{Exercice\s+(\d+)([^}]*)\}/gm)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : clean.length;
    const suffix = match[2].trim();
    return {
      n: match[1],
      title: suffix ? `Exercice ${match[1]} ${suffix}` : `Exercice ${match[1]}`,
      body: clean.slice(start, end).trim(),
    };
  });
}

function renderExercise(exercise) {
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
          <div class="answer-block">
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
        <a class="back-link" href="math.html#probabilites-sujets">Retour aux examens</a>
        <div>
          <span class="eyebrow">${config.eyebrow}</span>
          <h1>${config.heading}</h1>
          <p>Page reconstruite depuis le sujet/corrige LaTeX du dossier PDF.</p>
        </div>
      </header>

      <section class="page-section">
${exercises.map(renderExercise).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

fs.mkdirSync(examDir, { recursive: true });

for (const exam of exams) {
  const exercises = extractExercises(read(exam.source));
  write(path.join(examDir, exam.target), renderPage(exam, exercises));
  console.log(`Reconstruit ${exam.target} (${exercises.length} exercices).`);
}
