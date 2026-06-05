const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "out");
const mathCoursePath = path.join(root, "src", "subjects", "probabilites", "cours.html");
const mathTdDir = path.join(root, "src", "subjects", "probabilites", "td");
const mathExamDir = path.join(root, "src", "subjects", "probabilites", "exam");
const autoCoursePath = path.join(root, "src", "subjects", "auto", "cours.html");
const autoTdDir = path.join(root, "src", "subjects", "auto", "td");
const elecCoursePath = path.join(root, "src", "subjects", "elec", "cours.html");
const elecExamDir = path.join(root, "src", "subjects", "elec", "exam");
const javaCoursePath = path.join(root, "src", "subjects", "java", "cours.html");
const reseauCoursePath = path.join(root, "src", "subjects", "reseau", "cours.html");
const javaExamDir = path.join(root, "src", "subjects", "java", "exam");
const vhdlCoursePath = path.join(root, "src", "subjects", "vhdl", "cours.html");
const vhdlTdDir = path.join(root, "src", "subjects", "vhdl", "td");
const vhdlExamDir = path.join(root, "src", "subjects", "vhdl", "exam");

const pages = {
  home: path.join(outDir, "index.html"),
  math: path.join(outDir, "math.html"),
  auto: path.join(outDir, "auto.html"),
  elec: path.join(outDir, "elec.html"),
  java: path.join(outDir, "java.html"),
  reseau: path.join(outDir, "reseau.html"),
  vhdl: path.join(outDir, "vhdl.html"),
};

const mathNav = [
  ["math.html#probabilites", "Intro"],
  ["math.html#probabilites-programme", "Programme"],
  ["math.html#probabilites-chap1", "1. Denombrement"],
  ["math.html#probabilites-chap2", "2. Espaces probabilises"],
  ["math.html#probabilites-chap3", "3. Variables discretes"],
  ["math.html#probabilites-chap4", "4. Variables continues"],
  ["math.html#probabilites-chap5-discret", "5. Couples discrets"],
  ["math.html#probabilites-methodes", "Methodes"],
  ["math.html#probabilites-td", "TD"],
  ["math.html#probabilites-sujets", "Sujet type"],
  ["math.html#probabilites-revision", "Revision finale"],
];

const javaNav = [
  ["java.html#java-intro", "Intro"],
  ["java.html#java-bases", "1. Bases"],
  ["java.html#java-collections", "2. Collections"],
  ["java.html#java-objet", "3. Objet"],
  ["java.html#java-heritage", "4. Heritage"],
  ["java.html#java-interfaces", "5. Interfaces"],
  ["java.html#java-exceptions", "6. Exceptions"],
  ["java.html#java-exams", "Examens"],
];

const vhdlNav = [
  ["vhdl.html#vhdl-intro", "Intro"],
  ["vhdl.html#vhdl-cm1", "1. Introduction"],
  ["vhdl.html#vhdl-cm2", "2. Nombres"],
  ["vhdl.html#vhdl-cm3", "3. Combinatoire"],
  ["vhdl.html#vhdl-cm4", "4. Sequentiel"],
  ["vhdl.html#vhdl-cm5", "5. FSM"],
  ["vhdl.html#vhdl-cm6", "6. HDL"],
  ["vhdl.html#vhdl-cm7", "7. FPGA"],
  ["vhdl.html#vhdl-td", "TD"],
  ["vhdl.html#vhdl-exams", "Examens"],
  ["vhdl.html#vhdl-pdfs", "PDF"],
];

const elecNav = [
  ["elec.html#elec-intro", "Intro"],
  ["elec.html#elec-quadripoles", "1. Quadripoles"],
  ["elec.html#elec-filtres", "2. Filtres"],
  ["elec.html#elec-amplis", "3. Amplis"],
  ["elec.html#elec-oscillateurs", "4. Oscillateurs"],
  ["elec.html#elec-exams", "Examens"],
  ["elec.html#elec-revision", "Revision"],
  ["elec.html#elec-pdfs", "PDF"],
];

const reseauNav = [
  ["reseau.html#reseau-intro", "Intro"],
  ["reseau.html#reseau-bases", "Bases"],
  ["reseau.html#reseau-osi", "Modele OSI"],
  ["reseau.html#reseau-couche1", "Couche 1"],
  ["reseau.html#reseau-couche2", "Couche 2"],
  ["reseau.html#reseau-couche3", "Couche 3"],
  ["reseau.html#reseau-transport", "Transport"],
  ["reseau.html#reseau-revision", "Revision"],
  ["reseau.html#reseau-pdfs", "PDF"],
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
      ["elec.html", "Electronique"],
      ["java.html", "Java"],
      ["reseau.html", "Reseaux"],
      ["vhdl.html", "VHDL"],
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
              <h3>Electronique</h3>
              <p>Cours EP361 : quadripoles, filtres, amplificateurs et oscillateurs quasi-sinusoidaux.</p>
              <p class="secondary-link"><a href="elec.html">Ouvrir le cours</a></p>
            </article>
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>Java</h3>
              <p>Bases du langage, collections, approche objet, heritage, interfaces et exceptions.</p>
              <p class="secondary-link"><a href="java.html">Ouvrir le cours</a></p>
            </article>
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>Reseaux</h3>
              <p>Cours IN363 : modele OSI, Ethernet, IP, ARP, TCP/UDP, ICMP et HTTP.</p>
              <p class="secondary-link"><a href="reseau.html">Ouvrir le cours</a></p>
            </article>
            <article class="chapter-card">
              <span class="status-pill">Disponible</span>
              <h3>VHDL</h3>
              <p>Supports SN361 : logique reconfigurable, codage binaire, circuits combinatoires, sequentiels, FSM et FPGA.</p>
              <p class="secondary-link"><a href="vhdl.html">Ouvrir le cours</a></p>
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
      ["#auto-intro", "Intro"],
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

function renderElecCourse() {
  const course = read(elecCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ...elecNav], "elec.html#elec-intro");

  return renderShell({
    title: "Electronique EP361 - Revision ESISAR",
    brandMark: "E",
    brandTitle: "Electronique",
    brandSubtitle: "EP361",
    nav,
    eyebrow: "Electronique",
    heading: "Circuits electroniques",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderJavaCourse() {
  const course = read(javaCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ...javaNav], "java.html#java-intro");

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

function renderReseauCourse() {
  const course = read(reseauCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ...reseauNav], "reseau.html#reseau-intro");

  return renderShell({
    title: "Reseaux IN363 - Revision ESISAR",
    brandMark: "R",
    brandTitle: "Reseaux",
    brandSubtitle: "IN363",
    nav,
    eyebrow: "Reseaux",
    heading: "Couches reseau et protocoles",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderVhdlCourse() {
  const course = read(vhdlCoursePath);
  const nav = renderNav([["index.html", "Accueil"], ...vhdlNav], "vhdl.html#vhdl-intro");

  return renderShell({
    title: "VHDL SN361 - Revision ESISAR",
    brandMark: "V",
    brandTitle: "VHDL",
    brandSubtitle: "SN361",
    nav,
    eyebrow: "VHDL",
    heading: "Conception de circuits numeriques",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
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
write(pages.elec, renderElecCourse());
write(pages.java, renderJavaCourse());
write(pages.reseau, renderReseauCourse());
write(pages.vhdl, renderVhdlCourse());

for (const file of fs.readdirSync(mathTdDir).filter((entry) => entry.endsWith(".html"))) {
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

if (fs.existsSync(elecExamDir)) {
  for (const file of fs.readdirSync(elecExamDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(elecExamDir, file), path.join(outDir, file));
  }
}

if (fs.existsSync(javaExamDir)) {
  for (const file of fs.readdirSync(javaExamDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(javaExamDir, file), path.join(outDir, file));
  }
}

if (fs.existsSync(vhdlTdDir)) {
  for (const file of fs.readdirSync(vhdlTdDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(vhdlTdDir, file), path.join(outDir, file));
  }
}

if (fs.existsSync(vhdlExamDir)) {
  for (const file of fs.readdirSync(vhdlExamDir).filter((entry) => entry.endsWith(".html"))) {
    fs.copyFileSync(path.join(vhdlExamDir, file), path.join(outDir, file));
  }
}

console.log("Application construite dans out/.");
