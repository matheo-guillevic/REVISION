const fs = require("fs");
const path = require("path");

const root = process.cwd();
const subject = "ANGLAIS-TOEIC";
const sourcePath = path.join(root, "content", subject, "cours-quizz.md");
const targetPath = path.join(root, "content", subject, "cours.md");

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value = "") {
  return String(value)
    .replaceAll("➔", "->")
    .replaceAll("❌", "incorrect")
    .replaceAll("✅", "correct")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

function parseFiches(source) {
  const start = source.indexOf("# PARTIE I");
  const end = source.indexOf("# PARTIE II");
  const chunk = source.slice(start, end);
  const matches = [...chunk.matchAll(/###\s*(?:[^\w\n]+\s*)?FICHE\s+(\d+)\s*:\s*([^\n]+)\n([\s\S]*?)(?=\n---\n\n###|\s*$)/g)];

  return matches.map((match) => ({
    id: `fiche-${match[1]}`,
    n: Number(match[1]),
    title: cleanText(match[2]),
    body: cleanText(match[3]),
  }));
}

function parseAnswers(source) {
  const start = source.indexOf("# PARTIE III");
  const chunk = source.slice(start);
  const answers = new Map();
  const re = /^(\d{1,3})\.\s+\*\*\(([A-D])\)(?:\s*([^*:\n]+?))?\*\*\s*:\s*(.+)$/gm;
  for (const match of chunk.matchAll(re)) {
    answers.set(Number(match[1]), {
      letter: match[2],
      text: cleanText(match[3] || ""),
      explanation: cleanText(match[4]),
    });
  }
  return answers;
}

function parseThemeQuestions(section, answers) {
  const questions = [];
  const lines = section.split(/\r?\n/);
  let currentTheme = "";
  let currentSection = "Section A";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const sectionMatch = line.match(/^##\s+(.+)/);
    if (sectionMatch) currentSection = cleanText(sectionMatch[1]);

    const themeMatch = line.match(/^###\s+(.+)/);
    if (themeMatch) currentTheme = cleanText(themeMatch[1]);

    const questionMatch = line.match(/^(\d{1,3})\.\s+(.+)/);
    if (!questionMatch || questionMatch[2].startsWith("(A)")) continue;

    const number = Number(questionMatch[1]);
    if (number > 340) continue;

    const stemLines = [cleanText(questionMatch[2])];
    const options = [];
    index += 1;

    for (; index < lines.length; index += 1) {
      const optionMatch = lines[index].match(/^\s*\(([A-D])\)\s+(.+?)\s*$/);
      if (optionMatch) {
        options.push({ letter: optionMatch[1], text: cleanText(optionMatch[2]) });
        continue;
      }
      if (/^\d{1,3}\.\s+/.test(lines[index]) || /^#{2,3}\s+/.test(lines[index])) {
        index -= 1;
        break;
      }
      if (lines[index].trim()) stemLines.push(cleanText(lines[index]));
    }

    if (options.length === 4) {
      const answer = answers.get(number);
      questions.push({
        id: number,
        section: currentSection,
        theme: currentTheme,
        stem: stemLines.join("\n"),
        options,
        answer: answer?.letter || "",
        answerText: answer?.text || "",
        explanation: answer?.explanation || "",
      });
    }
  }

  return questions;
}

function parseTextCompletionQuestions(section, answers) {
  const questions = [];
  const textBlocks = [...section.matchAll(/###\s+TEXT\s+(\d+)\s+\(Questions\s+(\d+)\s+-\s+(\d+)\)\s*:\s*([^\n]+)\n([\s\S]*?)(?=\n---\n\n###\s+TEXT|$)/g)];

  for (const block of textBlocks) {
    const textNumber = Number(block[1]);
    const first = Number(block[2]);
    const last = Number(block[3]);
    const title = cleanText(block[4]);
    const body = block[5];
    const optionStart = body.search(new RegExp(`\\n${first}\\.\\s+\\(A\\)`));
    const passage = cleanText(body.slice(0, optionStart))
      .replace(/^>\s?/gm, "")
      .replace(/\*\*(\d+)\.\*\*/g, "[$1]");
    const optionChunk = body.slice(optionStart);

    for (let number = first; number <= last; number += 1) {
      const next = number < last ? number + 1 : null;
      const re = new RegExp(`(?:^|\\n)${number}\\.\\s+\\(A\\)\\s+([^\\n]+)\\n\\s+\\(B\\)\\s+([^\\n]+)\\n\\s+\\(C\\)\\s+([^\\n]+)\\n\\s+\\(D\\)\\s+([^\\n]+)(?=${next ? `\\n\\n${next}\\.` : "\\n\\n---|\\s*$"})`);
      const match = optionChunk.match(re);
      if (!match) continue;
      const answer = answers.get(number);
      questions.push({
        id: number,
        section: "Section C - Part 6",
        theme: `Text ${textNumber} - ${title}`,
        stem: `${title}\n\n${passage}`,
        options: ["A", "B", "C", "D"].map((letter, i) => ({ letter, text: cleanText(match[i + 1]) })),
        answer: answer?.letter || "",
        answerText: answer?.text || "",
        explanation: answer?.explanation || "",
      });
    }
  }

  return questions;
}

function inferFiche(question, fiches) {
  if (question.id <= 280) {
    const ficheNumber = Math.ceil(question.id / 20);
    return fiches.find((fiche) => fiche.n === ficheNumber) || fiches[0];
  }

  const text = `${question.stem} ${question.explanation} ${question.answerText}`.toLowerCase();
  const rules = [
    [1, /many|much|few|little|enough|some|any|most|all|quantif|uncount|count/],
    [2, /must|should|could|would|may|might|modal|obligation|capacit/],
    [3, /compar|superlat|as .* as|than|most expensive|largest/],
    [4, /agreement|singulier|pluriel|subject|accord|neither|number of|economics/],
    [5, /pronoun|possess|my|mine|their|herself|themselves|reflex/],
    [6, /present perfect|past|future|since|currently|recruiting|have used|tense/],
    [7, /gerund|infinitive|to \+|ing|look forward|refrain from|advised to/],
    [8, /adverb|adjective|noun|verb|word form|suffix|accurate|temporary|approval|cooperation/],
    [9, /collocation|make progress|take advantage|provide|pay close attention|competitive prices/],
    [10, /preposition| in | on | at | by | within | during | since |envelope|floor/],
    [11, /except|expect|affect|effect|advice|advise|morale|refusal|renewal/],
    [12, /although|despite|whether|unless|so that|as soon as|however|both|neither|nor/],
    [13, /phrasal|look into|put off|take over|run out|call off|go over|carry out/],
    [14, /trap|passive|stative|conditionnel|had we known|ed\b|ing\b/],
  ];
  const match = rules.find(([, re]) => re.test(text));
  return fiches.find((fiche) => fiche.n === (match ? match[0] : 14)) || fiches[fiches.length - 1];
}

function buildMarkdown(fiches, questions) {
  const quiz = {
    title: "Quiz TOEIC Part 5 & Part 6",
    total: questions.length,
    fiches: fiches.map((fiche) => ({
      id: fiche.id,
      n: fiche.n,
      title: fiche.title,
      body: fiche.body,
    })),
    questions: questions.map((question) => {
      const fiche = inferFiche(question, fiches);
      return {
        ...question,
        ficheId: fiche.id,
        ficheTitle: fiche.title,
      };
    }),
  };

  const ficheCards = fiches.map((fiche) => `:::block type="method" title="Fiche ${fiche.n} - ${fiche.title}"
${fiche.body}
:::`).join("\n\n");

  return `---
title: ANGLAIS-TOEIC - Preparation TOEIC
subject: ANGLAIS-TOEIC
type: course
---

:::section id="toeic-intro" eyebrow="TOEIC" title="Preparation TOEIC - Part 5 et Part 6" summary="Fiches de grammaire et de vocabulaire, quiz interactif de 400 questions, corrections detaillees et rappel de la fiche associee a chaque question."
:::quicklinks
- [Fiches de synthese](#toeic-fiches)
- [Quiz interactif](#toeic-quiz)
- [Mode de travail](#toeic-method)
:::

:::block type="remember" title="Objectif"
Cette page transforme le cours TOEIC en outil d'entrainement : tu peux repondre aux questions une par une, filtrer par notion, verifier la correction, puis lire directement la fiche associee a la question.
:::
:::

:::section id="toeic-fiches" eyebrow="Fiches" title="Fiches de synthese TOEIC" summary="Les fiches regroupent les notions les plus frequentes en Part 5 et Part 6."
:::grid variant="two-col"
${ficheCards}
:::
:::

:::section id="toeic-quiz" eyebrow="Quiz" title="Quiz interactif TOEIC" summary="400 questions avec score, correction immediate, filtres par fiche et rappel de notion."
:::toeicquiz id="toeic-part5-part6" title="TOEIC Part 5 & Part 6"
\`\`\`json
${JSON.stringify(quiz)}
\`\`\`
:::
:::

:::section id="toeic-method" eyebrow="Methode" title="Comment travailler efficacement" summary="Un rythme simple pour transformer les erreurs en fiches de revision."
:::grid variant="two-col"
:::block type="method" title="Sequence conseillee"
1. Faire une serie de 20 questions sans regarder les fiches.
2. Corriger immediatement.
3. Lire la fiche associee uniquement pour les erreurs.
4. Refaire les questions ratees le lendemain.
:::

:::block type="warning" title="Priorite TOEIC"
Les questions Part 5 testent surtout la structure grammaticale locale. Avant de traduire toute la phrase, identifie la fonction du blanc : nom, verbe, adjectif, adverbe, preposition, connecteur ou forme verbale.
:::
:::
:::
`;
}

const source = fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
const fiches = parseFiches(source);
const answers = parseAnswers(source);
const quizStart = source.indexOf("# PARTIE II");
const answerStart = source.indexOf("# PARTIE III");
const quizChunk = source.slice(quizStart, answerStart);
const questions = [
  ...parseThemeQuestions(quizChunk, answers),
  ...parseTextCompletionQuestions(quizChunk, answers),
].sort((a, b) => a.id - b.id);

if (fiches.length !== 14) throw new Error(`Fiches attendues: 14, trouvees: ${fiches.length}`);
if (questions.length !== 400) throw new Error(`Questions attendues: 400, trouvees: ${questions.length}`);
if (answers.size !== 400) throw new Error(`Reponses attendues: 400, trouvees: ${answers.size}`);

fs.writeFileSync(targetPath, buildMarkdown(fiches, questions), "utf8");
console.log(`TOEIC converti: ${fiches.length} fiches, ${questions.length} questions -> ${path.relative(root, targetPath)}`);
