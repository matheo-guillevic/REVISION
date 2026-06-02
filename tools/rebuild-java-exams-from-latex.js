const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "pdf", "java", "exam");
const targetDir = path.join(root, "src", "subjects", "java", "exam");

const exams = [
  ["java-exam1.tex", "java-exam1.html", "Examen Java 1"],
  ["java-exam2.tex", "java-exam2.html", "Examen Java 2"],
  ["java-exam3.tex", "java-exam3.html", "Examen Java 3"],
  ["java-exam4.tex", "java-exam4.html", "Examen Java 4"],
];

function read(fileName) {
  return fs.readFileSync(path.join(sourceDir, fileName), "utf8");
}

function write(fileName, html) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, fileName), `${html.trimEnd()}\n`, "utf8");
}

function cleanLatex(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .replace(/\\title\{([^{}]*)\}/, "")
    .replace(/^[\s\S]*?\\maketitle/, "")
    .replace(/\\end\{document\}[\s\S]*$/g, "")
    .replace(/\\vspace\{[^{}]*\}/g, "\n")
    .trim();
}

function escapeHtml(text) {
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

  value = escapeHtml(value)
    .replace(/\\texttt\{([^{}]*)\}/g, "<code>$1</code>")
    .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
    .replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>")
    .replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>")
    .replace(/\\newline/g, "<br>")
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
  if (/Question/i.test(label)) return "question";
  if (/Raisonnement/i.test(label) && /Réponse/i.test(label)) return "solution";
  if (/Raisonnement/i.test(label)) return "reasoning";
  if (/Réponse|Résultat|Erreur|Correctif/i.test(label)) return "solution";
  return null;
}

function renderParagraph(text) {
  const labelPattern = /\\textbf\{([^{}]*(?:Question|Raisonnement|Réponse|Résultat|Erreur|Correctif)[^{}]*)\}/gi;
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

    if (kind === "question") {
      blocks.push(`          <div class="question-block">
            <h4>${convertInline(label)}</h4>${body ? `\n            <p>${convertInline(body)}</p>` : ""}
          </div>`);
      return;
    }

    const className = kind === "reasoning" ? "td-reasoning-block" : "td-solution-block";
    if (kind) {
      blocks.push(`          <div class="td-step-block ${className}">
            <strong>${convertInline(label)}</strong>${body ? `\n            <p>${convertInline(body)}</p>` : ""}
          </div>`);
      return;
    }

    blocks.push(`          <p><strong>${convertInline(label)}</strong> ${convertInline(body)}</p>`);
  });

  return blocks;
}

function normalizeLines(latex) {
  return latex
    .replace(/^\\subsection\*\{(.+)\}$/gm, "\n\n@@SUBSECTION:$1@@\n\n")
    .replace(/\\begin\{lstlisting\}(?:\[[^\]]+\])?/g, "\n\n@@CODE_START@@\n")
    .replace(/\\end\{lstlisting\}/g, "\n@@CODE_END@@\n\n")
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
  let inCode = false;
  let code = [];

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    if (text) html.push(...renderParagraph(text));
    paragraph = [];
  }

  function flushCode() {
    html.push(`          <pre class="code-block language-java"><code class="language-java">${escapeHtml(code.join("\n").trim())}</code></pre>`);
    code = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (inCode) {
      if (line === "@@CODE_END@@") {
        flushCode();
        inCode = false;
      } else {
        code.push(rawLine);
      }
      continue;
    }

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line === "@@CODE_START@@") {
      flushParagraph();
      inCode = true;
      code = [];
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
  if (inCode) flushCode();
  if (inList) html.push("          </ul>");
  return html.join("\n");
}

function extractExercises(latex) {
  const clean = cleanLatex(latex);
  const matches = [...clean.matchAll(/^\\section\*\{([^{}]+)\}/gm)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1] ? matches[index + 1].index : clean.length;
    return {
      n: index + 1,
      title: match[1],
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

function renderPage({ index, fileName, heading }, exercises) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${heading} - Java</title>
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
        <a class="back-link" href="java.html#java-exams">Retour aux examens</a>
        <div>
          <span class="eyebrow">Examen ${index}</span>
          <h1>${heading}</h1>
          <p>Page reconstruite depuis <code>pdf/java/exam/${fileName}</code>, avec les réponses et raisonnements.</p>
        </div>
      </header>

      <section class="page-section">
${exercises.map(renderExercise).join("\n\n")}
      </section>
    </main>
  </body>
</html>`;
}

exams.forEach(([source, target, heading], index) => {
  const exercises = extractExercises(read(source));
  write(target, renderPage({ index: index + 1, fileName: source, heading }, exercises));
  console.log(`Reconstruit ${target} (${exercises.length} exercices).`);
});
