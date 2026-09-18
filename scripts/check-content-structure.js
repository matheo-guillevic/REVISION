const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { listSubjectDirs, subjectFile } = require("../src/build/content-paths");

const root = process.cwd();
const outDir = path.join(root, "out");
const configDir = path.join(root, "src", "config");

const errors = [];
const warnings = [];

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(configDir, fileName), "utf8").replace(/^\uFEFF/, ""));
}

function readMatter(filePath) {
  return matter(fs.readFileSync(filePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

function checkCourseFrontmatter(subjects) {
  for (const subject of subjects) {
    const coursePath = subjectFile(subject, "cours.md");
    assert(fs.existsSync(coursePath), `${subject}: cours.md introuvable`);
    if (!fs.existsSync(coursePath)) continue;

    const parsed = readMatter(coursePath);
    assert(parsed.data.subject === subject, `${rel(coursePath)}: subject frontmatter="${parsed.data.subject}" au lieu de "${subject}"`);
    assert(parsed.data.type === "course", `${rel(coursePath)}: type frontmatter attendu "course"`);
    warn(Boolean(parsed.data.title), `${rel(coursePath)}: titre frontmatter manquant`);
  }
}

function checkConfiguredPages(configFile, kind, subjects, targets) {
  const config = readJson(configFile);
  assert(Array.isArray(config.groups), `${configFile}: groups doit etre un tableau`);

  for (const group of config.groups || []) {
    assert(subjects.includes(group.subject), `${configFile}: subject "${group.subject}" absent de content/`);
    const pages = kind === "exam" ? group.exams : group.pages;
    assert(Array.isArray(pages), `${configFile}: pages manquantes pour ${group.subject}`);

    for (const page of pages || []) {
      const target = page.target;
      assert(Boolean(target), `${configFile}: target manquant pour ${group.subject}`);
      if (!target) continue;

      assert(!targets.has(target), `Target HTML dupliquee: ${target}`);
      targets.add(target);

      const source = page.source || target.replace(/\.html$/i, ".md");
      const markdownPath = subjectFile(group.subject, kind, source);
      assert(fs.existsSync(markdownPath), `${configFile}: source Markdown introuvable ${rel(markdownPath)}`);
      if (!fs.existsSync(markdownPath)) continue;

      const parsed = readMatter(markdownPath);
      assert(parsed.data.subject === group.subject, `${rel(markdownPath)}: subject="${parsed.data.subject}" au lieu de "${group.subject}"`);
      assert(parsed.data.type === kind, `${rel(markdownPath)}: type="${parsed.data.type}" au lieu de "${kind}"`);
      assert(parsed.data.target === target, `${rel(markdownPath)}: target="${parsed.data.target}" au lieu de "${target}"`);
      for (const field of ["title", "eyebrow", "heading", "summary"]) {
        assert(Boolean(parsed.data[field] || page[field]), `${rel(markdownPath)}: frontmatter/config "${field}" manquant`);
      }
      warn(/^:::\s*section\b/m.test(parsed.content), `${rel(markdownPath)}: aucune section enrichie :::section detectee`);

      const outputPath = path.join(outDir, target);
      assert(fs.existsSync(outputPath), `HTML genere introuvable: ${rel(outputPath)}`);
    }
  }
}

function checkOrphanMarkdown(subjects, pageConfigs) {
  const configured = new Set();
  for (const { config, kind } of pageConfigs) {
    for (const group of config.groups || []) {
      const pages = kind === "exam" ? group.exams : group.pages;
      for (const page of pages || []) {
        configured.add(rel(subjectFile(group.subject, kind, page.source || page.target.replace(/\.html$/i, ".md"))));
      }
    }
  }

  for (const subject of subjects) {
    for (const kind of ["td", "tp", "exam"]) {
      const dir = subjectFile(subject, kind);
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir).filter((entry) => entry.endsWith(".md"))) {
        const filePath = rel(path.join(dir, file));
        assert(configured.has(filePath), `${filePath}: Markdown ${kind} non reference dans la config`);
      }
    }
  }
}

function checkCourseHtml(subjects) {
  for (const subject of subjects) {
    const htmlPath = path.join(outDir, `${subject}.html`);
    assert(fs.existsSync(htmlPath), `${rel(htmlPath)} introuvable`);
    if (!fs.existsSync(htmlPath)) continue;

    const html = fs.readFileSync(htmlPath, "utf8");
    assert(!/class="nav-link-sub" href="[^"]+-td\d+\.html"/.test(html), `${rel(htmlPath)}: la sidebar contient encore des liens directs vers les TD numerotes`);
    assert(!html.includes("undefined"), `${rel(htmlPath)}: contient "undefined"`);
  }
}

function main() {
  const subjects = listSubjectDirs();
  const targets = new Set();
  const tdConfig = readJson("td-pages.json");
  const tpConfig = readJson("tp-pages.json");
  const examConfig = readJson("exam-pages.json");

  checkCourseFrontmatter(subjects);
  checkConfiguredPages("td-pages.json", "td", subjects, targets);
  checkConfiguredPages("tp-pages.json", "tp", subjects, targets);
  checkConfiguredPages("exam-pages.json", "exam", subjects, targets);
  checkOrphanMarkdown(subjects, [
    { config: tdConfig, kind: "td" },
    { config: tpConfig, kind: "tp" },
    { config: examConfig, kind: "exam" },
  ]);
  checkCourseHtml(subjects);

  for (const message of warnings) console.warn(`WARN: ${message}`);
  if (errors.length) {
    for (const message of errors) console.error(`ERROR: ${message}`);
    process.exit(1);
  }

  console.log(`Content structure OK: ${subjects.length} cours, ${targets.size} pages TD/TP/exam verifiees.`);
}

main();
