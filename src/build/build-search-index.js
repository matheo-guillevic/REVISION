const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const root = process.cwd();
const contentDir = path.join(root, "content");
const configDir = path.join(root, "src", "config");
const outDir = path.join(root, "out");

function readJson(fileName) {
  const filePath = path.join(configDir, fileName);
  if (!fs.existsSync(filePath)) return { groups: [] };
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function normalizeSpace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function stripNoisyBlocks(source) {
  return source
    .replace(/:::toeicquiz[\s\S]*?^:::/gm, "")
    .replace(/:::rplayground[\s\S]*?^:::/gm, "")
    .replace(/:::cplayground[\s\S]*?^:::/gm, "")
    .replace(/:::linuxplayground[\s\S]*?^:::/gm, "")
    .replace(/:::riscvplayground[\s\S]*?^:::/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

function markdownToText(source) {
  return normalizeSpace(stripNoisyBlocks(source)
    .replace(/^---[\s\S]*?---/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/:::\w+[^\n]*/g, " ")
    .replace(/^:::\s*$/gm, " ")
    .replace(/[`*_>#|{}[\]()]/g, " ")
    .replace(/&nbsp;/g, " "));
}

function parseAttrs(source = "") {
  const attrs = {};
  for (const match of source.matchAll(/([a-zA-Z0-9_-]+)="([^"]*)"/g)) attrs[match[1]] = match[2];
  return attrs;
}

function sectionRecords(markdown, fallback) {
  const records = [];
  const starts = [];
  const sectionRe = /^:::section\s+([^\n]+)/gm;
  for (const match of markdown.matchAll(sectionRe)) {
    const attrs = parseAttrs(match[1]);
    if (attrs.id) starts.push({ index: match.index, id: attrs.id, title: attrs.title || fallback.title, summary: attrs.summary || "" });
  }

  if (starts.length) {
    starts.forEach((start, index) => {
      const end = starts[index + 1]?.index ?? markdown.length;
      const chunk = markdown.slice(start.index, end);
      records.push({
        ...fallback,
        id: `${fallback.id}#${start.id}`,
        title: start.title,
        href: `${fallback.href}#${start.id}`,
        text: markdownToText(`${start.title}. ${start.summary}. ${chunk}`),
      });
    });
    return records;
  }

  const headingRe = /^#{1,3}\s+(.+)$/gm;
  for (const match of markdown.matchAll(headingRe)) {
    starts.push({ index: match.index, title: normalizeSpace(match[1].replace(/[﻿#]/g, "")) });
  }

  if (starts.length) {
    starts.forEach((start, index) => {
      const end = starts[index + 1]?.index ?? markdown.length;
      const slug = start.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      records.push({
        ...fallback,
        id: `${fallback.id}#${slug}`,
        title: start.title,
        href: fallback.href,
        text: markdownToText(markdown.slice(start.index, end)),
      });
    });
    return records;
  }

  return [{ ...fallback, text: markdownToText(markdown) }];
}

function configuredPages(kind) {
  const config = readJson(`${kind}-pages.json`);
  const entries = new Map();
  for (const group of config.groups || []) {
    const pages = kind === "exam" ? group.exams : group.pages;
    for (const page of pages || []) {
      const source = page.source || page.target.replace(/\.html$/i, ".md");
      entries.set(path.join(contentDir, group.subject, kind, source), {
        subject: group.subject,
        type: kind,
        title: page.title || page.heading || source,
        href: page.target,
      });
    }
  }
  return entries;
}

function courseEntries() {
  return fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const subject = entry.name;
      const filePath = path.join(contentDir, subject, "cours.md");
      if (!fs.existsSync(filePath)) return null;
      return [filePath, { subject, type: "course", title: subject, href: `${subject}.html` }];
    })
    .filter(Boolean);
}

function main() {
  const pageEntries = new Map([
    ...courseEntries(),
    ...configuredPages("td"),
    ...configuredPages("tp"),
    ...configuredPages("exam"),
  ]);

  const documents = [];
  for (const [filePath, meta] of pageEntries) {
    const parsed = matter(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
    const base = {
      id: rel(filePath),
      subject: parsed.data.subject || meta.subject,
      type: parsed.data.type || meta.type,
      title: parsed.data.title || meta.title,
      href: parsed.data.target || meta.href,
      source: rel(filePath),
    };
    documents.push(...sectionRecords(parsed.content, base).filter((record) => record.text.length > 20));
  }

  fs.writeFileSync(path.join(outDir, "search-index.json"), JSON.stringify({
    generatedAt: new Date().toISOString(),
    count: documents.length,
    documents,
  }), "utf8");
  console.log(`Index de recherche genere: ${documents.length} entrees.`);
}

main();
