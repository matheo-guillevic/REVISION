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
  "IN331-Algo": path.join(outDir, "IN331-Algo.html"),
  "MT331-Probabilites": path.join(outDir, "MT331-Probabilites.html"),
  "AU361-Automatique": path.join(outDir, "AU361-Automatique.html"),
  "EP361-electonique": path.join(outDir, "EP361-electonique.html"),
  "IN361-JAVA": path.join(outDir, "IN361-JAVA.html"),
  "IN363-Reseau": path.join(outDir, "IN363-Reseau.html"),
  "SN361-VHDL": path.join(outDir, "SN361-VHDL.html"),
  "SN421-Dev-Micro": path.join(outDir, "SN421-Dev-Micro.html"),
  "MT461-Methode-numerique": path.join(outDir, "MT461-Methode-numerique.html"),
  "EP425-Capteur": path.join(outDir, "EP425-Capteur.html"),
  "AU425-Automatique-avance": path.join(outDir, "AU425-Automatique-avance.html"),
};

const courseStructures = {
  "IN331-Algo": {
    page: "IN331-Algo.html",
    subject: "IN331-Algo",
    intro: "in331-intro",
    contentHref: "in331-chap1-fondations",
    content: [
      ["in331-chap1-fondations", "Fondations C"],
      ["in331-chap2-modularite", "Modularite et Make"],
      ["in331-chap3-tableaux", "Tableaux"],
      ["in331-chap4-fichiers-chaines", "Fichiers et chaines"],
      ["in331-chap5-structures", "Structures lineaires"],
      ["in331-chap6-pointeurs", "Pointeurs"],
      ["in331-chap7-recursivite-debug", "Recursivite et debug"],
      ["in331-chap8-allocation-listes", "Allocation et listes"],
    ],
    td: "IN331-Algo-td",
    exams: "IN331-Algo-exams",
    revision: "in331-revision",
    support: "IN331-Algo-supports",
  },
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
  "SN421-Dev-Micro": {
    page: "SN421-Dev-Micro.html",
    subject: "SN421-Dev-Micro",
    intro: "sn421-intro",
    contentHref: "sn421-mcu",
    content: [
      ["sn421-mcu", "Microcontroleurs"],
      ["sn421-software", "Logiciel embarque"],
      ["sn421-periph", "Peripheriques"],
      ["sn421-bus", "Bus et liaisons"],
      ["sn421-se", "Genie logiciel"],
    ],
    td: "SN421-Dev-Micro-td",
    exams: "SN421-Dev-Micro-exams",
    revision: "SN421-Dev-Micro-revision",
    support: "SN421-Dev-Micro-supports",
  },
  "EP425-Capteur": {
    page: "EP425-Capteur.html",
    subject: "EP425-Capteur",
    intro: "ep425-intro",
    contentHref: "ep425-mesure",
    content: [
      ["ep425-mesure", "Mesure"],
      ["ep425-metrologie", "Metrologie"],
      ["ep425-erreurs-bruits", "Erreurs et bruits"],
      ["ep425-conditionnement", "Conditionnement"],
      ["ep425-temperature", "Temperature"],
      ["ep425-position-inertiel", "Position et inertiel"],
      ["ep425-instrumentation", "Instrumentation"],
    ],
    td: "EP425-Capteur-td",
    exams: "EP425-Capteur-exams",
    revision: "ep425-synthese",
    support: "EP425-Capteur-supports",
  },
  "AU425-Automatique-avance": {
    page: "AU425-Automatique-avance.html",
    subject: "AU425-Automatique-avance",
    intro: "au425-intro",
    contentHref: "au425-rappels",
    content: [
      ["au425-rappels", "Rappels et robustesse"],
      ["au425-etat", "Representation d'etat"],
      ["au425-structure", "Commandabilite et observabilite"],
      ["au425-retour-etat", "Retour d'etat"],
      ["au425-observateurs", "Observateurs"],
      ["au425-lqr", "Commande LQR"],
      ["au425-lqg", "LQG et ponderations"],
      ["au425-cas", "Etudes de cas"],
    ],
    td: "AU425-Automatique-avance-td",
    exams: "AU425-Automatique-avance-exams",
    revision: "au425-revision",
    support: "AU425-Automatique-avance-supports",
  },
  "MT461-Methode-numerique": {
    page: "MT461-Methode-numerique.html",
    subject: "MT461-Methode-numerique",
    intro: "mt461-intro",
    contentHref: "mt461-module-1",
    content: [
      ["mt461-module-1", "Erreurs et flottants"],
      ["mt461-module-2", "Equations non lineaires"],
      ["mt461-module-3", "EDO"],
    ],
    td: "MT461-Methode-numerique-td",
    exams: "MT461-Methode-numerique-exams",
    revision: "mt461-synthese",
    support: "MT461-Methode-numerique-supports",
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

function renderGeneratedSupportSection(id) {
  return `        <section id="${id}" class="page-section">
          <div class="section-heading">
            <span class="eyebrow">Sources integrees</span>
            <h2>Sources integrees au Markdown</h2>
            <p>Les supports bruts ne sont plus publies : le contenu utile est repris directement dans le cours et les exercices.</p>
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
  const support = take(structure.support) || renderGeneratedSupportSection(structure.support);
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
    <script defer src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        if (window.mermaid) window.mermaid.initialize({ startOnLoad: true, securityLevel: "loose" });
      });
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3/plotly.min.js"></script>
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
              <li><a href="IN331-Algo.html">IN331-Algo</a></li>
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
          </details>
          <details class="sidebar-semester">
            <summary>Semestre 7</summary>
            <ul class="sidebar-semester-list">
              <li><a href="index.html#semestre-7">Vue semestre</a></li>
              <li><a href="SN421-Dev-Micro.html">SN421-Dev-Micro</a></li>
              <li><a href="MT461-Methode-numerique.html">MT461-Methode-numerique</a></li>
              <li><a href="EP425-Capteur.html">EP425-Capteur</a></li>
              <li><a href="AU425-Automatique-avance.html">AU425-Automatique-avance</a></li>
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
              <span class="semester-count">4 matieres</span>
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
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>IN331-Algo</h3>
                <p>Programmation C et algorithmique : compilation, modularite, tableaux, fichiers, pointeurs et listes chainees.</p>
                <p class="secondary-link"><a href="IN331-Algo.html">Ouvrir le cours</a></p>
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

          <details id="semestre-7" class="semester-group" open>
            <summary>
              <span>
                <span class="eyebrow">Semestre 7</span>
                <strong>Semestre 7</strong>
              </span>
              <span class="semester-count">4 matieres</span>
            </summary>

            <div class="dashboard-grid semester-content">
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>SN421-Dev-Micro</h3>
                <p>Programmation embarquee sur microcontroleur : architecture MCU, code bare-metal, peripheriques, bus et conception systeme.</p>
                <p class="secondary-link"><a href="SN421-Dev-Micro.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>MT461-Methode-numerique</h3>
                <p>Calcul scientifique : erreurs, arithmetique flottante, solveurs non lineaires, EDO et stabilite numerique.</p>
                <p class="secondary-link"><a href="MT461-Methode-numerique.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>EP425-Capteur</h3>
                <p>Capteurs et instrumentation : metrologie, conditionnement, bruit, temperature, position et amplificateurs de precision.</p>
                <p class="secondary-link"><a href="EP425-Capteur.html">Ouvrir le cours</a></p>
              </article>
              <article class="chapter-card">
                <span class="status-pill">Disponible</span>
                <h3>AU425-Automatique-avance</h3>
                <p>Commande avancee : espace d'etat, proprietes structurelles, retour d'etat, observateurs et commande optimale LQR.</p>
                <p class="secondary-link"><a href="AU425-Automatique-avance.html">Ouvrir le cours</a></p>
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

function renderAlgoCourse() {
  const structure = courseStructures["IN331-Algo"];
  const course = readCourseBody("IN331-Algo", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "IN331-Algo - Revision ESISAR",
    brandMark: "C",
    brandTitle: "IN331-Algo",
    brandSubtitle: "C et algorithmique",
    nav,
    eyebrow: "Semestre 5",
    heading: "Programmation C et algorithmique",
    cta: '<a class="primary-button" href="index.html#semestre-5">Semestre 5</a>',
    body: course,
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

function renderDevMcuCourse() {
  const structure = courseStructures["SN421-Dev-Micro"];
  const course = readCourseBody("SN421-Dev-Micro", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "SN421-Dev-Micro - Revision ESISAR",
    brandMark: "µ",
    brandTitle: "SN421-Dev-Micro",
    brandSubtitle: "Microcontroleurs",
    nav,
    eyebrow: "Semestre 7",
    heading: "Programmation embarquee sur microcontroleur",
    cta: '<a class="primary-button" href="index.html#semestre-7">Semestre 7</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderNumericMethodsCourse() {
  const structure = courseStructures["MT461-Methode-numerique"];
  const course = readCourseBody("MT461-Methode-numerique", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "MT461-Methode-numerique - Revision ESISAR",
    brandMark: "M",
    brandTitle: "MT461-Methode-numerique",
    brandSubtitle: "Methodes numeriques",
    nav,
    eyebrow: "Semestre 7",
    heading: "Analyse numerique et calcul scientifique",
    cta: '<a class="primary-button" href="index.html#semestre-7">Semestre 7</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderSensorCourse() {
  const structure = courseStructures["EP425-Capteur"];
  const course = readCourseBody("EP425-Capteur", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "EP425-Capteur - Revision ESISAR",
    brandMark: "E",
    brandTitle: "EP425-Capteur",
    brandSubtitle: "Capteurs et instrumentation",
    nav,
    eyebrow: "Semestre 7",
    heading: "Capteurs, mesure et instrumentation",
    cta: '<a class="primary-button" href="index.html#semestre-7">Semestre 7</a>',
    body: course,
    showAnnotations: true,
  });
}

function renderAdvancedControlCourse() {
  const structure = courseStructures["AU425-Automatique-avance"];
  const course = readCourseBody("AU425-Automatique-avance", structure);
  const nav = renderCommonCourseNav(structure);

  return renderShell({
    title: "AU425-Automatique-avance - Revision ESISAR",
    brandMark: "A",
    brandTitle: "AU425-Automatique-avance",
    brandSubtitle: "Commande avancee",
    nav,
    eyebrow: "Semestre 7",
    heading: "Commande avancee des systemes",
    cta: '<a class="primary-button" href="index.html#semestre-7">Semestre 7</a>',
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
write(pages["IN331-Algo"], renderAlgoCourse());
write(pages["MT331-Probabilites"], renderMath());
write(pages["AU361-Automatique"], renderAutoCourse());
write(pages["EP361-electonique"], renderElecCourse());
write(pages["IN361-JAVA"], renderJavaCourse());
write(pages["IN363-Reseau"], renderReseauCourse());
write(pages["SN361-VHDL"], renderVhdlCourse());
write(pages["SN421-Dev-Micro"], renderDevMcuCourse());
write(pages["MT461-Methode-numerique"], renderNumericMethodsCourse());
write(pages["EP425-Capteur"], renderSensorCourse());
write(pages["AU425-Automatique-avance"], renderAdvancedControlCourse());

console.log("Application construite dans out/.");
