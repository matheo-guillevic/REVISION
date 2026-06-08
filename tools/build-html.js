const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "out");
const mathCoursePath = path.join(root, "src", "subjects", "math", "cours.html");
const mathTdDir = path.join(root, "src", "subjects", "math", "td");
const mathExamDir = path.join(root, "src", "subjects", "math", "exam");
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

const courseStructures = {
  math: {
    page: "math.html",
    subject: "math",
    intro: "probabilites",
    contentHref: "probabilites-programme",
    content: [
      ["probabilites-programme", "Programme"],
      ["probabilites-chap1", "Dénombrement"],
      ["probabilites-chap2", "Espaces probabilisés"],
      ["probabilites-chap3", "Variables discrètes"],
      ["probabilites-chap4", "Variables continues"],
      ["probabilites-chap5-discret", "Couples discrets"],
      ["probabilites-methodes", "Méthodes"],
    ],
    td: "probabilites-td",
    exams: "probabilites-sujets",
    revision: "probabilites-revision",
    support: "math-supports",
  },
  auto: {
    page: "auto.html",
    subject: "auto",
    intro: "auto-intro",
    contentHref: "auto-modelisation",
    content: [
      ["auto-modelisation", "Modélisation"],
      ["auto-analyse", "Analyse"],
      ["auto-commande", "Commande"],
      ["auto-marges", "Marges"],
      ["auto-pid-rst", "PID/RST"],
    ],
    td: "auto-td",
    exams: "auto-exams",
    revision: "auto-revision",
    support: "auto-supports",
  },
  elec: {
    page: "elec.html",
    subject: "elec",
    intro: "elec-intro",
    contentHref: "elec-quadripoles",
    content: [
      ["elec-quadripoles", "Quadripôles"],
      ["elec-filtres", "Filtres"],
      ["elec-amplis", "Amplificateurs"],
      ["elec-oscillateurs", "Oscillateurs"],
    ],
    td: "elec-td",
    exams: "elec-exams",
    revision: "elec-revision",
    support: "elec-pdfs",
  },
  java: {
    page: "java.html",
    subject: "java",
    intro: "java-intro",
    contentHref: "java-bases",
    content: [
      ["java-bases", "Bases"],
      ["java-collections", "Collections"],
      ["java-objet", "Objet"],
      ["java-heritage", "Héritage"],
      ["java-interfaces", "Interfaces"],
      ["java-exceptions", "Exceptions"],
    ],
    td: "java-td",
    exams: "java-exams",
    revision: "java-revision",
    support: "java-supports",
  },
  reseau: {
    page: "reseau.html",
    subject: "reseau",
    intro: "reseau-intro",
    contentHref: "reseau-bases",
    content: [
      ["reseau-bases", "Bases"],
      ["reseau-osi", "Modèle OSI"],
      ["reseau-couche1", "Couche 1"],
      ["reseau-couche2", "Couche 2"],
      ["reseau-couche3", "Couche 3"],
      ["reseau-transport", "Transport"],
    ],
    td: "reseau-td",
    exams: "reseau-exams",
    revision: "reseau-revision",
    support: "reseau-pdfs",
  },
  vhdl: {
    page: "vhdl.html",
    subject: "vhdl",
    intro: "vhdl-intro",
    contentHref: "vhdl-cm1",
    content: [
      ["vhdl-cm1", "Introduction"],
      ["vhdl-cm2", "Nombres"],
      ["vhdl-cm3", "Combinatoire"],
      ["vhdl-cm4", "Séquentiel"],
      ["vhdl-cm5", "FSM"],
      ["vhdl-cm6", "HDL"],
      ["vhdl-cm7", "FPGA"],
    ],
    td: "vhdl-td",
    exams: "vhdl-exams",
    revision: "vhdl-revision",
    support: "vhdl-pdfs",
  },
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8").trimEnd();
}

function write(filePath, html) {
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function toWebPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function copyIfExists(source, target) {
  if (!fs.existsSync(source)) return;
  fs.cpSync(source, target, { recursive: true });
}

function toTitleFromFile(file) {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function listCoursePdfFiles(subject) {
  const courseDir = path.join(root, "pdf", subject, "cours");
  if (!fs.existsSync(courseDir)) return [];

  return fs
    .readdirSync(courseDir)
    .filter((entry) => entry.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, "fr"))
    .map((file) => ({
      file,
      title: toTitleFromFile(file),
      href: toWebPath(path.join("pdf", subject, "cours", file)),
    }));
}

function extractCourseSections(html) {
  const starts = [...html.matchAll(/^ {8}<section id="([^"]+)" class="page-section">/gm)];
  return starts.map((match, index) => {
    const next = starts[index + 1];
    const end = next ? next.index : html.length;
    return {
      id: match[1],
      html: html.slice(match.index, end).trimEnd(),
    };
  });
}

function renderEmptySection(id, eyebrow, heading) {
  return `        <section id="${id}" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">${eyebrow}</span>
            <h2>${heading}</h2>
            <p><span class="status-pill">∅</span> Aucun contenu pour cette section.</p>
          </div>
        </section>`;
}

function renderGeneratedSupportSection(id, subject) {
  const files = listCoursePdfFiles(subject);
  if (!files.length) return renderEmptySection(id, "Support de cours", "Support de cours");

  return `        <section id="${id}" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">Support de cours</span>
            <h2>Support de cours</h2>
            <p>PDF sources disponibles pour cette matière.</p>
          </div>

          <div class="dashboard-grid">
${files
  .map(
    (file) => `            <article class="chapter-card">
              <span class="status-pill">PDF</span>
              <h3>${file.title}</h3>
              <p class="secondary-link"><a href="${file.href}">Ouvrir le PDF</a></p>
            </article>`
  )
  .join("\n")}
          </div>
        </section>`;
}

function renderCommonCourseNav(structure) {
  const contentLinks = structure.content.map(([id, label]) => [`${structure.page}#${id}`, label, "sub"]);
  return renderNav(
    [
      ["index.html", "Accueil"],
      [`${structure.page}#${structure.intro}`, "Introduction"],
      [`${structure.page}#${structure.contentHref}`, "Contenu du cours"],
      ...contentLinks,
      [`${structure.page}#${structure.td}`, "TD"],
      [`${structure.page}#${structure.exams}`, "Examens"],
      [`${structure.page}#${structure.revision}`, "Révision"],
      [`${structure.page}#${structure.support}`, "Support de cours"],
    ],
    `${structure.page}#${structure.intro}`
  );
}

function composeCourseBody(html, structure) {
  const sections = extractCourseSections(html);
  const byId = new Map(sections.map((section) => [section.id, section.html]));
  const used = new Set();
  const take = (id) => {
    const section = byId.get(id);
    if (section) used.add(id);
    return section || "";
  };

  const intro = take(structure.intro) || renderEmptySection(structure.intro, "Introduction", "Introduction");
  const content = structure.content.map(([id]) => take(id)).filter(Boolean);
  const td = take(structure.td) || renderEmptySection(structure.td, "TD", "TD");
  const exams = take(structure.exams) || renderEmptySection(structure.exams, "Examens", "Examens");
  const revision = take(structure.revision) || renderEmptySection(structure.revision, "Révision", "Révision");
  const support = take(structure.support) || renderGeneratedSupportSection(structure.support, structure.subject);
  const leftovers = sections.filter((section) => !used.has(section.id)).map((section) => section.html);
  const contentHtml = [...content, ...leftovers].join("\n\n") || renderEmptySection(structure.contentHref, "Contenu du cours", "Contenu du cours");

  return [intro, contentHtml, td, exams, revision, support].join("\n\n");
}

function renderNav(items, activeHref) {
  return items
    .map(([href, label, level]) => {
      const active = href === activeHref ? " active" : "";
      const sub = level === "sub" ? " nav-link-sub" : "";
      return `          <a class="nav-link${sub}${active}" href="${href}">${label}</a>`;
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
      ["math.html", "Mathématiques"],
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
              <h3>Mathématiques</h3>
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
    cta: '<a class="primary-button" href="math.html">Mathématiques</a>',
    body,
  });
}

function renderMath() {
  const structure = courseStructures.math;
  const course = composeCourseBody(read(mathCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "Mathématiques - Revision ESISAR",
    brandMark: "M",
    brandTitle: "Mathématiques",
    brandSubtitle: "Probabilites",
    nav,
    eyebrow: "Mathématiques",
    heading: "Cours de probabilites",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderAutoCourse() {
  const structure = courseStructures.auto;
  const course = composeCourseBody(read(autoCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

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
  const structure = courseStructures.elec;
  const course = composeCourseBody(read(elecCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

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
  const structure = courseStructures.java;
  const course = composeCourseBody(read(javaCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

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
  const structure = courseStructures.reseau;
  const course = composeCourseBody(read(reseauCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

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
  const structure = courseStructures.vhdl;
  const course = composeCourseBody(read(vhdlCoursePath), structure);
  const nav = renderCommonCourseNav(structure);

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
