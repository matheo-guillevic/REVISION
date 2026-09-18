const fs = require("fs");
const path = require("path");

const root = process.cwd();
const contentDir = path.join(root, "content");

const semesterSubjects = {
  S5: [
    "AU331-Traitement-Signal",
    "SN331-Architecture-processeur",
    "EP331-Electronique-analogique",
    "IN331-Algo",
    "IN333-OS",
    "MT321-Mathematiques-general",
  ],
  S6: [
    "MT331-Probabilites",
    "AU361-Automatique",
    "EP361-electonique",
    "IN361-JAVA",
    "IN363-Reseau",
    "SN361-VHDL",
  ],
  S7: [
    "SN421-Dev-Micro",
    "MT461-Methode-numerique",
    "EP425-Capteur",
    "AU425-Automatique-avance",
    "IN451-IA",
    "ANGLAIS-TOEIC",
  ],
};

const subjectToSemester = new Map(
  Object.entries(semesterSubjects).flatMap(([semester, subjects]) => subjects.map((subject) => [subject, semester]))
);

function subjectDir(subject) {
  const semester = subjectToSemester.get(subject);
  if (semester) return path.join(contentDir, semester, subject);

  for (const candidate of Object.keys(semesterSubjects)) {
    const candidateDir = path.join(contentDir, candidate, subject);
    if (fs.existsSync(candidateDir)) return candidateDir;
  }

  return path.join(contentDir, subject);
}

function subjectFile(subject, ...parts) {
  return path.join(subjectDir(subject), ...parts);
}

function listSubjectDirs() {
  const subjects = [];

  for (const [semester, semesterSubjectNames] of Object.entries(semesterSubjects)) {
    const semesterDir = path.join(contentDir, semester);
    if (!fs.existsSync(semesterDir)) continue;
    for (const subject of semesterSubjectNames) {
      if (fs.existsSync(path.join(semesterDir, subject))) subjects.push(subject);
    }
    for (const entry of fs.readdirSync(semesterDir, { withFileTypes: true })) {
      if (entry.isDirectory()) subjects.push(entry.name);
    }
  }

  if (fs.existsSync(contentDir)) {
    for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || semesterSubjects[entry.name]) continue;
      subjects.push(entry.name);
    }
  }

  return [...new Set(subjects)].sort((a, b) => a.localeCompare(b, "fr"));
}

module.exports = {
  contentDir,
  semesterSubjects,
  subjectDir,
  subjectFile,
  listSubjectDirs,
};
