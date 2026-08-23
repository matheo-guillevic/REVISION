const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const root = process.cwd();
const contentDir = path.join(root, "content");
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

function listSubjectDirs() {
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "fr"));
}

function checkCourseFrontmatter(subjects) {
  for (const subject of subjects) {
    const coursePath = path.join(contentDir, subject, "cours.md");
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
    const pages = kind === "td" ? group.pages : group.exams;
    assert(Array.isArray(pages), `${configFile}: pages manquantes pour ${group.subject}`);

    for (const page of pages || []) {
      const target = page.target;
      assert(Boolean(target), `${configFile}: target manquant pour ${group.subject}`);
      if (!target) continue;

      assert(!targets.has(target), `Target HTML dupliquee: ${target}`);
      targets.add(target);

      const markdownPath = path.join(contentDir, group.subject, kind, target.replace(/\.html$/i, ".md"));
      assert(fs.existsSync(markdownPath), `${configFile}: source Markdown introuvable ${rel(markdownPath)}`);
      if (!fs.existsSync(markdownPath)) continue;

      const parsed = readMatter(markdownPath);
      assert(parsed.data.subject === group.subject, `${rel(markdownPath)}: subject="${parsed.data.subject}" au lieu de "${group.subject}"`);
      assert(parsed.data.type === kind, `${rel(markdownPath)}: type="${parsed.data.type}" au lieu de "${kind}"`);
      assert(parsed.data.target === target, `${rel(markdownPath)}: target="${parsed.data.target}" au lieu de "${target}"`);

      const outputPath = path.join(outDir, target);
      assert(fs.existsSync(outputPath), `HTML genere introuvable: ${rel(outputPath)}`);
    }
  }
}

function checkOrphanMarkdown(subjects, tdConfig, examConfig) {
  const configured = new Set();
  for (const group of tdConfig.groups || []) {
    for (const page of group.pages || []) {
      configured.add(rel(path.join(contentDir, group.subject, "td", page.target.replace(/\.html$/i, ".md"))));
    }
  }
  for (const group of examConfig.groups || []) {
    for (const page of group.exams || []) {
      configured.add(rel(path.join(contentDir, group.subject, "exam", page.target.replace(/\.html$/i, ".md"))));
    }
  }

  for (const subject of subjects) {
    for (const kind of ["td", "exam"]) {
      const dir = path.join(contentDir, subject, kind);
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
  const examConfig = readJson("exam-pages.json");

  checkCourseFrontmatter(subjects);
  checkConfiguredPages("td-pages.json", "td", subjects, targets);
  checkConfiguredPages("exam-pages.json", "exam", subjects, targets);
  checkOrphanMarkdown(subjects, tdConfig, examConfig);
  checkCourseHtml(subjects);

  for (const message of warnings) console.warn(`WARN: ${message}`);
  if (errors.length) {
    for (const message of errors) console.error(`ERROR: ${message}`);
    process.exit(1);
  }

  console.log(`Content structure OK: ${subjects.length} cours, ${targets.size} pages TD/exam verifiees.`);
}

main();
