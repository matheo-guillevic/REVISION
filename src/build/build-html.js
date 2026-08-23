const fs = require("fs");
const path = require("path");
const { renderMarkdownCourse } = require("./markdown-renderer");

const root = process.cwd();
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");

const pages = {
  home: path.join(outDir, "index.html"),
  "AU331-Traitement-Signal": path.join(outDir, "AU331-Traitement-Signal.html"),
  "SN331-Architecture-processeur": path.join(outDir, "SN331-Architecture-processeur.html"),
  "EP331-Electronique-analogique": path.join(outDir, "EP331-Electronique-analogique.html"),
  "MT331-Probabilites": path.join(outDir, "MT331-Probabilites.html"),
  "AU361-Automatique": path.join(outDir, "AU361-Automatique.html"),
  "EP361-electonique": path.join(outDir, "EP361-electonique.html"),
  "IN361-JAVA": path.join(outDir, "IN361-JAVA.html"),
  "IN363-Reseau": path.join(outDir, "IN363-Reseau.html"),
  "SN361-VHDL": path.join(outDir, "SN361-VHDL.html"),
};

const courseStructures = {
  "MT331-Probabilites": {
    page: "MT331-Probabilites.html",
    subject: "MT331-Probabilites",
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
  "AU361-Automatique": {
    page: "AU361-Automatique.html",
    subject: "AU361-Automatique",
    intro: "AU361-Automatique-intro",
    contentHref: "AU361-Automatique-modelisation",
    content: [
      ["AU361-Automatique-modelisation", "Modélisation"],
      ["AU361-Automatique-analyse", "Analyse"],
      ["AU361-Automatique-commande", "Commande"],
      ["AU361-Automatique-marges", "Marges"],
      ["AU361-Automatique-pid-rst", "PID/RST"],
    ],
    td: "AU361-Automatique-td",
    exams: "AU361-Automatique-exams",
    revision: "AU361-Automatique-revision",
    support: "AU361-Automatique-supports",
  },
  "EP361-electonique": {
    page: "EP361-electonique.html",
    subject: "EP361-electonique",
    intro: "elec-intro",
    contentHref: "elec-quadripoles",
    content: [
      ["elec-quadripoles", "Quadripôles"],
      ["elec-filtres", "Filtres"],
      ["elec-amplis", "Amplificateurs"],
      ["elec-oscillateurs", "Oscillateurs"],
      ["elec-simulations", "CircuitJS"],
    ],
    td: "EP361-electonique-td",
    exams: "EP361-electonique-exams",
    revision: "elec-revision",
    support: "elec-pdfs",
  },
  "IN361-JAVA": {
    page: "IN361-JAVA.html",
    subject: "IN361-JAVA",
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
    td: "IN361-JAVA-td",
    exams: "IN361-JAVA-exams",
    revision: "java-revision",
    support: "java-supports",
  },
  "IN363-Reseau": {
    page: "IN363-Reseau.html",
    subject: "IN363-Reseau",
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
    td: "IN363-Reseau-td",
    exams: "IN363-Reseau-exams",
    revision: "reseau-revision",
    support: "reseau-pdfs",
  },
  "SN361-VHDL": {
    page: "SN361-VHDL.html",
    subject: "SN361-VHDL",
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
    td: "SN361-VHDL-td",
    exams: "SN361-VHDL-exams",
    revision: "vhdl-revision",
    support: "vhdl-pdfs",
  },
};

function write(filePath, html) {
  fs.writeFileSync(filePath, `${html.trimEnd()}\n`, "utf8");
}

function toWebPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function copyPublicFiles() {
  if (!fs.existsSync(publicDir)) return;
  for (const entry of fs.readdirSync(publicDir)) {
    fs.cpSync(path.join(publicDir, entry), path.join(outDir, entry), { recursive: true });
  }
}

function toTitleFromFile(file) {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function listCoursePdfFiles(subject) {
  const courseDir = path.join(publicDir, "pdf", subject, "cours");
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

function readCourseBody(subject, structure) {
  const markdownPath = path.join(root, "content", subject, "cours.md");
  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Source Markdown introuvable : ${path.relative(root, markdownPath)}`);
  }
  const body = renderMarkdownCourse(markdownPath).body;
  return composeCourseBody(body, structure);
}

function readStandaloneCourseBody(subject) {
  const markdownPath = path.join(root, "content", subject, "cours.md");
  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Source Markdown introuvable : ${path.relative(root, markdownPath)}`);
  }

  return renderMarkdownCourse(markdownPath).body;
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
        tex: { inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]], displayMath: [["\\\\[", "\\\\]"], ["$$", "$$"]] },
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
  const nav = `          <a class="nav-link active" href="index.html">Accueil</a>
          <details class="sidebar-semester">
            <summary>Semestre 5</summary>
            <ul class="sidebar-semester-list">
              <li><a href="index.html#semestre-5">Vue semestre</a></li>
              <li><a href="AU331-Traitement-Signal.html">AU331-Traitement-Signal</a></li>
              <li><a href="SN331-Architecture-processeur.html">SN331-Architecture-processeur</a></li>
              <li><a href="EP331-Electronique-analogique.html">EP331-Electronique-analogique</a></li>
            </ul>
          </details>
          <details class="sidebar-semester">
            <summary>Semestre 6</summary>
            <ul class="sidebar-semester-list">
              <li><a href="index.html#semestre-6">Vue semestre</a></li>
              <li><a href="MT331-Probabilites.html">MT331-Probabilites</a></li>
              <li><a href="AU361-Automatique.html">AU361-Automatique</a></li>
              <li><a href="EP361-electonique.html">EP361-electonique</a></li>
              <li><a href="IN361-JAVA.html">IN361-JAVA</a></li>
              <li><a href="IN363-Reseau.html">IN363-Reseau</a></li>
              <li><a href="SN361-VHDL.html">SN361-VHDL</a></li>
            </ul>
          </details>`;

  const body = `        <section id="accueil" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">Cours</span>
            <h2>Choisir un semestre</h2>
            <p>Les matieres sont regroupees par semestre pour retrouver plus vite les cours, TD et examens.</p>
          </div>
        </section>

        <section class="page-section semester-list">
          <details id="semestre-5" class="semester-group">
            <summary>
              <span>
                <span class="eyebrow">Semestre 5</span>
                <strong>Semestre 5</strong>
              </span>
              <span class="semester-count">3 matieres</span>
            </summary>

            <div class="dashboard-grid semester-content">
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>AU331-Traitement-Signal</h3>
                <p>Synthese de traitement du signal deterministe : signaux, Fourier, Laplace, echantillonnage et filtrage.</p>
                <p class="secondary-link"><a href="AU331-Traitement-Signal.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>SN331-Architecture-processeur</h3>
                <p>Architecture processeur : abstractions, RISC-V, assembleur, pipeline, caches et memoire virtuelle.</p>
                <p class="secondary-link"><a href="SN331-Architecture-processeur.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>EP331-Electronique-analogique</h3>
                <p>Cours EP331 : diodes, redressement, Zener, transistors bipolaires, AOP, thermique et simulations CircuitJS.</p>
                <p class="secondary-link"><a href="EP331-Electronique-analogique.html">Ouvrir le cours</a></p>
              </article>
            </div>
          </details>

          <details id="semestre-6" class="semester-group">
            <summary>
              <span>
                <span class="eyebrow">Semestre 6</span>
                <strong>Semestre 6</strong>
              </span>
              <span class="semester-count">6 matieres</span>
            </summary>

            <div class="dashboard-grid semester-content">
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>MT331-Probabilites</h3>
                <p>Cours de probabilites, TD, methodes et fiche de revision finale.</p>
                <p class="secondary-link"><a href="MT331-Probabilites.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>AU361-Automatique</h3>
                <p>AU361-Automatique construit a partir du poly, des supports PID/RST et des TD.</p>
                <p class="secondary-link"><a href="AU361-Automatique.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>EP361-electonique</h3>
                <p>Cours EP361 : quadripoles, filtres, amplificateurs et oscillateurs quasi-sinusoidaux.</p>
                <p class="secondary-link"><a href="EP361-electonique.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>IN361-JAVA</h3>
                <p>Bases du langage, collections, approche objet, heritage, interfaces et exceptions.</p>
                <p class="secondary-link"><a href="IN361-JAVA.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>IN363-Reseau</h3>
                <p>Cours IN363 : modele OSI, Ethernet, IP, ARP, TCP/UDP, ICMP et HTTP.</p>
                <p class="secondary-link"><a href="IN363-Reseau.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>SN361-VHDL</h3>
                <p>Supports SN361 : logique reconfigurable, codage binaire, circuits combinatoires, sequentiels, FSM et FPGA.</p>
                <p class="secondary-link"><a href="SN361-VHDL.html">Ouvrir le cours</a></p>
              </article>
            </div>
          </details>
        </section>`;

  return renderShell({
    title: "Revision ESISAR",
    brandMark: "R",
    brandTitle: "Revision ESISAR",
    brandSubtitle: "Cours separes",
    nav,
    eyebrow: "Revision",
    heading: "Revisions par semestre",
    cta: '<a class="primary-button" href="#semestre-5">Semestre 5</a>',
    body,
  });
}

function renderSignalCourse() {
  const nav = renderNav(
    [
      ["index.html", "Accueil"],
      ["AU331-Traitement-Signal.html#au331-intro", "Introduction"],
      ["AU331-Traitement-Signal.html#au331-objectifs", "Objectifs", "sub"],
      ["AU331-Traitement-Signal.html#au331-signaux-continus", "Signaux continus", "sub"],
      ["AU331-Traitement-Signal.html#au331-analyse-spectrale", "Analyse spectrale", "sub"],
      ["AU331-Traitement-Signal.html#au331-echantillonnage", "Echantillonnage", "sub"],
      ["AU331-Traitement-Signal.html#au331-systemes-rif", "Systemes discrets et RIF", "sub"],
      ["AU331-Traitement-Signal.html#au331-td", "TD"],
      ["AU331-Traitement-Signal.html#au331-revision", "Revision"],
    ],
    "AU331-Traitement-Signal.html#au331-intro"
  );

  return renderShell({
    title: "AU331-Traitement-Signal - Revision ESISAR",
    brandMark: "S",
    brandTitle: "AU331-Traitement-Signal",
    brandSubtitle: "Traitement du signal",
    nav,
    eyebrow: "Semestre 5",
    heading: "Traitement du signal deterministe",
    cta: '<a class="primary-button" href="index.html#semestre-5">Semestre 5</a>',
    body: readStandaloneCourseBody("AU331-Traitement-Signal"),
    showAnnotations: true,
  });
}

function renderProcessorCourse() {
  const nav = renderNav(
    [
      ["index.html", "Accueil"],
      ["SN331-Architecture-processeur.html#sn331-intro", "Introduction"],
      ["SN331-Architecture-processeur.html#sn331-abstractions", "Abstractions", "sub"],
      ["SN331-Architecture-processeur.html#sn331-donnees", "Donnees", "sub"],
      ["SN331-Architecture-processeur.html#sn331-isa", "ISA RISC-V", "sub"],
      ["SN331-Architecture-processeur.html#sn331-assembleur", "Assembleur", "sub"],
      ["SN331-Architecture-processeur.html#sn331-pipeline", "Pipeline", "sub"],
      ["SN331-Architecture-processeur.html#sn331-caches", "Caches", "sub"],
      ["SN331-Architecture-processeur.html#sn331-memoire-virtuelle", "Memoire virtuelle", "sub"],
      ["SN331-Architecture-processeur.html#sn331-exercices", "Exercices"],
      ["SN331-Architecture-processeur.html#sn331-td", "TD"],
      ["SN331-Architecture-processeur.html#sn331-revision", "Revision"],
    ],
    "SN331-Architecture-processeur.html#sn331-intro"
  );

  return renderShell({
    title: "SN331-Architecture-processeur - Revision ESISAR",
    brandMark: "P",
    brandTitle: "SN331-Architecture-processeur",
    brandSubtitle: "Architecture processeur",
    nav,
    eyebrow: "Semestre 5",
    heading: "Architecture processeur et RISC-V",
    cta: '<a class="primary-button" href="index.html#semestre-5">Semestre 5</a>',
    body: readStandaloneCourseBody("SN331-Architecture-processeur"),
    showAnnotations: true,
  });
}

function renderAnalogElecCourse() {
  const nav = renderNav(
    [
      ["index.html", "Accueil"],
      ["EP331-Electronique-analogique.html#ep331-intro", "Introduction"],
      ["EP331-Electronique-analogique.html#ep331-fondations", "Fondations", "sub"],
      ["EP331-Electronique-analogique.html#ep331-diodes", "Diodes", "sub"],
      ["EP331-Electronique-analogique.html#ep331-redressement-zener", "Redressement et Zener", "sub"],
      ["EP331-Electronique-analogique.html#ep331-bjt", "Transistors bipolaires", "sub"],
      ["EP331-Electronique-analogique.html#ep331-aop", "AOP", "sub"],
      ["EP331-Electronique-analogique.html#ep331-thermique", "Thermique", "sub"],
      ["EP331-Electronique-analogique.html#ep331-circuitjs", "CircuitJS", "sub"],
      ["EP331-Electronique-analogique.html#ep331-td", "TD"],
      ["EP331-Electronique-analogique.html#ep331-revision", "Revision"],
    ],
    "EP331-Electronique-analogique.html#ep331-intro"
  );

  return renderShell({
    title: "EP331-Electronique-analogique - Revision ESISAR",
    brandMark: "E",
    brandTitle: "EP331-Electronique-analogique",
    brandSubtitle: "Electronique analogique",
    nav,
    eyebrow: "Semestre 5",
    heading: "Electronique analogique",
    cta: '<a class="primary-button" href="index.html#semestre-5">Semestre 5</a>',
    body: readStandaloneCourseBody("EP331-Electronique-analogique"),
    showAnnotations: true,
  });
}

function renderMath() {
  const structure = courseStructures["MT331-Probabilites"];
  const course = readCourseBody("MT331-Probabilites", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "MT331-Probabilites - Revision ESISAR",
    brandMark: "M",
    brandTitle: "MT331-Probabilites",
    brandSubtitle: "Probabilites",
    nav,
    eyebrow: "MT331-Probabilites",
    heading: "Probabilites",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderAutoCourse() {
  const structure = courseStructures["AU361-Automatique"];
  const course = readCourseBody("AU361-Automatique", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "AU361-Automatique - Revision ESISAR",
    brandMark: "A",
    brandTitle: "AU361-Automatique",
    brandSubtitle: "Automatique",
    nav,
    eyebrow: "AU361-Automatique",
    heading: "Analyse et commande des systemes lineaires",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderElecCourse() {
  const structure = courseStructures["EP361-electonique"];
  const course = readCourseBody("EP361-electonique", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "EP361-electonique - Revision ESISAR",
    brandMark: "E",
    brandTitle: "EP361-electonique",
    brandSubtitle: "EP361",
    nav,
    eyebrow: "EP361-electonique",
    heading: "Circuits electroniques",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderJavaCourse() {
  const structure = courseStructures["IN361-JAVA"];
  const course = readCourseBody("IN361-JAVA", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "IN361-JAVA - Revision ESISAR",
    brandMark: "J",
    brandTitle: "IN361-JAVA",
    brandSubtitle: "Programmation objet",
    nav,
    eyebrow: "IN361-JAVA",
    heading: "Langage Java et programmation objet",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
  });
}

function renderReseauCourse() {
  const structure = courseStructures["IN363-Reseau"];
  const course = readCourseBody("IN363-Reseau", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "IN363-Reseau - Revision ESISAR",
    brandMark: "R",
    brandTitle: "IN363-Reseau",
    brandSubtitle: "Reseaux",
    nav,
    eyebrow: "IN363-Reseau",
    heading: "Couches reseau et protocoles",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderVhdlCourse() {
  const structure = courseStructures["SN361-VHDL"];
  const course = readCourseBody("SN361-VHDL", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "SN361-VHDL - Revision ESISAR",
    brandMark: "V",
    brandTitle: "SN361-VHDL",
    brandSubtitle: "VHDL",
    nav,
    eyebrow: "SN361-VHDL",
    heading: "Conception de circuits numeriques",
    cta: '<a class="primary-button" href="index.html">Accueil</a>',
    body: course,
    showAnnotations: true,
  });
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

copyPublicFiles();

write(pages.home, renderHome());
write(pages["AU331-Traitement-Signal"], renderSignalCourse());
write(pages["SN331-Architecture-processeur"], renderProcessorCourse());
write(pages["EP331-Electronique-analogique"], renderAnalogElecCourse());
write(pages["MT331-Probabilites"], renderMath());
write(pages["AU361-Automatique"], renderAutoCourse());
write(pages["EP361-electonique"], renderElecCourse());
write(pages["IN361-JAVA"], renderJavaCourse());
write(pages["IN363-Reseau"], renderReseauCourse());
write(pages["SN361-VHDL"], renderVhdlCourse());

console.log("Application construite dans out/.");
