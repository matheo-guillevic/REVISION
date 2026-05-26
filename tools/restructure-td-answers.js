const fs = require("fs");
const path = require("path");

const tdDir = path.join(process.cwd(), "src", "subjects", "probabilites", "td");
const files = ["td1.html", "td2.html", "td3.html"];

function getListItems(html, className) {
  const blockMatch = html.match(new RegExp(`<[^>]+class="${className}"[^>]*>[\\s\\S]*?<ul>([\\s\\S]*?)<\\/ul>[\\s\\S]*?<\\/div>`));
  if (!blockMatch) return [];
  return [...blockMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1].trim());
}

function getQuestionItems(article) {
  const blockMatch = article.match(/<div class="question-block"[\s\S]*?<ol>([\s\S]*?)<\/ol>[\s\S]*?<\/div>/);
  if (!blockMatch) return [];
  return [...blockMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1].trim());
}

function getSolutionItems(article) {
  const blockMatch = article.match(/<ol class="solution-steps">([\s\S]*?)<\/ol>/);
  if (!blockMatch) return [];
  return [...blockMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1].trim());
}

function getGeneralReasoning(article) {
  const match = article.match(/<div class="reasoning-note"[^>]*><strong>Raisonnement<\/strong><p>([\s\S]*?)<\/p><\/div>/);
  return match ? match[1].trim() : "On commence par identifier le modele mathematique adapte, puis on applique la formule du cours avec les hypotheses de l'enonce.";
}

function distribute(items, count) {
  if (count === 0) return [];
  if (items.length === 0) return Array.from({ length: count }, () => []);
  return Array.from({ length: count }, (_, index) => {
    const start = Math.floor((index * items.length) / count);
    const end = Math.floor(((index + 1) * items.length) / count);
    const slice = items.slice(start, Math.max(end, start + 1));
    return slice.length ? slice : [items[Math.min(index, items.length - 1)]];
  });
}

function listHtml(items) {
  if (!items.length) return "<p>La reponse s'obtient en appliquant le raisonnement general de l'exercice.</p>";
  if (items.length === 1) return `<p>${items[0]}</p>`;
  return `<ol class="solution-steps">\n${items.map((item) => `                    <li>${item}</li>`).join("\n")}\n                  </ol>`;
}

function buildAnswerPanel(id, questions, notes, solutions, generalReasoning) {
  const noteGroups = distribute(notes, questions.length);
  const solutionGroups = distribute(solutions, questions.length);

  const cards = questions.map((question, index) => {
    const n = index + 1;
    const reasoningId = `${id}-q${n}-reasoning`;
    const solutionId = `${id}-q${n}-solution`;
    const reasoningItems = noteGroups[index]?.length ? noteGroups[index] : [generalReasoning];
    const solutionItems = solutionGroups[index] || [];

    return `              <div class="question-answer-card">
                <div class="question-answer-heading">
                  <span>Question ${n}</span>
                  <p>${question}</p>
                </div>
                <div class="button-row">
                  <button type="button" data-toggle="${reasoningId}">Afficher le raisonnement</button>
                  <button type="button" data-toggle="${solutionId}">Afficher la solution</button>
                </div>
                <div id="${reasoningId}" class="hidden-panel reasoning-panel">
                  <strong>Raisonnement</strong>
                  ${listHtml(reasoningItems)}
                </div>
                <div id="${solutionId}" class="hidden-panel solution-panel">
                  <strong>Solution</strong>
                  ${listHtml(solutionItems)}
                </div>
              </div>`;
  }).join("\n");

  return `          <div id="${id}" class="answer-block">
            <div class="per-question-answers">
              <h4>Reponses par question</h4>
${cards}
            </div>
          </div>`;
}

for (const file of files) {
  const filePath = path.join(tdDir, file);
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(/<article class="exercise-card">[\s\S]*?<\/article>/g, (article) => {
    const idMatch = article.match(/data-toggle="(td\d-e\d+)"/) || article.match(/<div id="(td\d-e\d+)" class="answer-block">/);
    if (!idMatch) return article;
    const id = idMatch[1];
    const questions = getQuestionItems(article);
    if (!questions.length) return article;

    const notes = getListItems(article, "question-notes");
    const solutions = getSolutionItems(article);
    const generalReasoning = getGeneralReasoning(article);
    const panelStart = article.indexOf(`<div id="${id}"`);
    if (panelStart === -1) return article;

    let prefix = article.slice(0, panelStart);
    prefix = prefix.replace(/\s*<div class="td-actions"><button type="button" data-toggle="td\d-e\d+">Afficher la correction<\/button><\/div>\n/, "\n");
    return `${prefix}${buildAnswerPanel(id, questions, notes, solutions, generalReasoning)}
        </article>`;
  });

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`${file} restructure en reponses par question.`);
}
