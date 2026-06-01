const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "out");
const mathCoursePath = path.join(root, "src", "subjects", "probabilites", "cours.html");
const mathTdDir = path.join(root, "src", "subjects", "probabilites", "td");
const mathExamDir = path.join(root, "src", "subjects", "probabilites", "exam");
const autoCoursePath = path.join(root, "src", "subjects", "auto", "cours.html");
const autoTdDir = path.join(root, "src", "subjects", "auto", "td");
const javaCoursePath = path.join(root, "src", "subjects", "java", "cours.html");

const pages = {
  home: path.join(outDir, "index.html"),
  math: path.join(outDir, "math.html"),
  auto: path.join(outDir, "auto.html"),
  java: path.join(outDir, "java.html"),
};

const mathNav = [
  ["math.html#probabilites", "Accueil"],
  ["math.html#probabilites-programme", "Programme"],
  ["math.html#probabilites-chap1", "1. Denombrement"],
  ["math.html#probabilites-chap2", "2. Espaces probabilises"],
  ["math.html#probabilites-chap3", "3. Variables discretes"],
  ["math.html#probabilites-chap4", "4. Variables continues"],
  ["math.html#probabilites-methodes", "Methodes"],
  ["math.html#probabilites-td", "TD"],
  ["math.html#probabilites-sujets", "Sujet type"],
  ["math.html#probabilites-revision", "Revision finale"],
];

const javaNav = [
  ["java.html#java-intro", "Accueil"],
  ["java.html#java-bases", "1. Bases"],
  ["java.html#java-collections", "2. Collections"],
  ["java.html#java-objet", "3. Objet"],
  ["java.html#java-heritage", "4. Heritage"],
  ["java.html#java-interfaces", "5. Interfaces"],
  ["java.html#java-exceptions", "6. Exceptions"],
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8").trimEnd();
}

function write(filePath, html) {
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function copyIfExists(source, target) {
  if (!fs.existsSync(source)) return;
  fs.cpSync(source, target, { recursive: true });
}

function renderNav(items, activeHref) {
  return items
    .map(([href, label]) => {
      const active = href === activeHref ? " active" : "";
      return `          <a class="nav-link${active}" href="${href}">${label}</a>`;
    })
    .join("\n");
}

function renderShell({ title, brandMark, brandTitle, brandSubtitle, nav, eyebrow, heading, cta, body, showAnnotations = false }) {
  const annotationButton = showAnnotations
    ? '\n      <button class="annotation-toggle" type="button" data-toggle-annotations>Masquer annotations</button>'
    : "";

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
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
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="Navigation principale">
        <a class="brand" href="index.html" aria-label="Retour a l'accueil">
          <span class="brand-mark">${brandMark}</span>
          <span>
            <strong>${brandTitle}</strong>
            <small>${brandSubtitle}</small>
          </span>
        </a>

        <nav class="nav-list">
${nav}
        </nav>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div>
            <span class="eyebrow">${eyebrow}</span>
            <h1>${heading}</h1>
          </div>
          ${cta}
        </header>

${body}
      </main>${annotationButton}
    </div>
  </body>
</html>`;
}

function renderHome() {
  const nav = renderNav(
    [
      ["index.html", "Accueil"],
      ["math.html", "Cours de math"],
      ["auto.html", "Automatique"],
      ["java.html", "Java"],
    ],
    "index.html"
  );

  const body = `        <section id="accueil" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">Cours</span>
            <h2>Choisir une matiere</h2>
            <p>Le site est separe en pages dediees pour garder les revisions lisibles quand de nouveaux cours arrivent.</p>
          </div>

          <div class="dashboard-grid">
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>Mathematiques</h3>
              <p>Cours de probabilites, TD, methodes et fiche de revision finale.</p>
              <p class="secondary-link"><a href="math.html">Ouvrir le cours</a></p>
            </article>
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>Automatique</h3>
              <p>Cours AU361 construit a partir du poly, des supports PID/RST et des TD.</p>
              <p class="secondary-link"><a href="auto.html">Ouvrir le cours</a></p>
            </article>
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>Java</h3>
              <p>Bases du langage, collections, approche objet, heritage, interfaces et exceptions.</p>
              <p class="secondary-link"><a href="java.html">Ouvrir le cours</a></p>
            </article>
          </div>
        </section>`;

  return renderShell({
    title: "Revision ESISAR",
    brandMark: "R",
    brandTitle: "Revision ESISAR",
    brandSubtitle: "Cours separes",
    nav,
    eyebrow: "Revision",
    heading: "Revisions par cours",
    cta: '<a class="primary-button" href="math.html">Cours de math</a>',
    body,
  });
}

function renderMath() {
  const course = read(mathCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ...mathNav], "math.html#probabilites");

  return renderShell({
    title: "Cours de mathematiques - Revision ESISAR",
    brandMark: "M",
    brandTitle: "Cours de math",
    brandSubtitle: "Probabilites",
    nav,
    eyebrow: "Mathematiques",
    heading: "Cours de probabilites",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderAutoCourse() {
  const course = read(autoCoursePath);
  const nav = renderNav(
    [
      ["index.html", "Accueil"],
      ["math.html", "Cours de math"],
      ["java.html", "Java"],
      ["#auto-intro", "Automatique"],
      ["#auto-modelisation", "Modelisation"],
      ["#auto-analyse", "Analyse"],
      ["#auto-commande", "Commande"],
      ["#auto-marges", "Marges"],
      ["#auto-pid-rst", "PID/RST"],
      ["#auto-td", "TD"],
      ["#auto-revision", "Revision finale"],
    ],
    "#auto-intro"
  );

  return renderShell({
    title: "Automatique AU361 - Revision ESISAR",
    brandMark: "A",
    brandTitle: "Automatique",
    brandSubtitle: "AU361",
    nav,
    eyebrow: "Automatique",
    heading: "Analyse et commande des systemes lineaires",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderJavaCourse() {
  const course = read(javaCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ["math.html", "Cours de math"], ["auto.html", "Automatique"], ...javaNav], "java.html#java-intro");

  return renderShell({
    title: "Java - Revision ESISAR",
    brandMark: "J",
    brandTitle: "Java",
    brandSubtitle: "Programmation objet",
    nav,
    eyebrow: "Java",
    heading: "Langage Java et programmation objet",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
  });
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

copyIfExists(path.join(root, "styles.css"), path.join(outDir, "styles.css"));
copyIfExists(path.join(root, "script.js"), path.join(outDir, "script.js"));
copyIfExists(path.join(root, "assets"), path.join(outDir, "assets"));
copyIfExists(path.join(root, "pdf"), path.join(outDir, "pdf"));

write(pages.home, renderHome());
write(pages.math, renderMath());
write(pages.auto, renderAutoCourse());
write(pages.java, renderJavaCourse());

for (const file of ["td1.html", "td2.html", "td3.html"]) {
  fs.copyFileSync(path.join(mathTdDir, file), path.join(outDir, file));
}

if (fs.existsSync(autoTdDir)) {
  for (const file of fs.readdirSync(autoTdDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(autoTdDir, file), path.join(outDir, file));
  }
}

if (fs.existsSync(mathExamDir)) {
  for (const file of fs.readdirSync(mathExamDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(mathExamDir, file), path.join(outDir, file));
  }
}

console.log("Application construite dans out/.");
