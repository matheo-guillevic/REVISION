const body = document.body;
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const exercises = Array.from(document.querySelectorAll("[data-exercise]"));

function rangeValues(start, end, count, scale = "linear") {
  const n = Math.max(Number(count) || 2, 2);
  if (scale === "log" && start > 0 && end > 0) {
    const logStart = Math.log10(start);
    const logEnd = Math.log10(end);
    return Array.from({ length: n }, (_, index) => 10 ** (logStart + ((logEnd - logStart) * index) / (n - 1)));
  }
  return Array.from({ length: n }, (_, index) => start + ((end - start) * index) / (n - 1));
}

function evaluateFormula(expression, variables) {
  const fn = new Function(
    "vars",
    "Math",
    `
      const { x, y, t, n, i } = vars;
      const { abs, acos, asin, atan, atan2, ceil, cos, exp, floor, log, log10, max, min, PI, pow, round, sign, sin, sqrt, tan } = Math;
      return (${expression});
    `
  );
  return fn(variables, Math);
}

function numericValue(value, variables = {}) {
  return typeof value === "number" ? value : evaluateFormula(String(value), variables);
}

function cleanTraceConfig(series) {
  const {
    generator,
    range,
    points,
    x,
    y,
    xFormula,
    yFormula,
    xStart,
    xEnd,
    tStart,
    tEnd,
    nStart,
    nEnd,
    scale,
    steps,
    x0,
    formula,
    ...trace
  } = series;
  return trace;
}

function rk4StabilityBoundary(samples) {
  const points = [];

  for (let theta = Math.PI / 2; theta <= (3 * Math.PI) / 2; theta += Math.PI / Math.max(samples, 90)) {
    let low = 0;
    let high = 4;

    for (let iteration = 0; iteration < 44; iteration += 1) {
      const radius = (low + high) / 2;
      const zr = radius * Math.cos(theta);
      const zi = radius * Math.sin(theta);
      const z2r = zr * zr - zi * zi;
      const z2i = 2 * zr * zi;
      const z3r = z2r * zr - z2i * zi;
      const z3i = z2r * zi + z2i * zr;
      const z4r = z3r * zr - z3i * zi;
      const z4i = z3r * zi + z3i * zr;
      const rr = 1 + zr + z2r / 2 + z3r / 6 + z4r / 24;
      const ri = zi + z2i / 2 + z3i / 6 + z4i / 24;
      const modulus = Math.hypot(rr, ri);

      if (modulus <= 1) low = radius;
      else high = radius;
    }

    points.push([low * Math.cos(theta), low * Math.sin(theta)]);
  }

  return points;
}

function buildGeneratedSeries(series) {
  const trace = cleanTraceConfig(series);
  const generator = series.generator || "function";

  if (generator === "function") {
    const [start, end] = series.range || [series.xStart ?? 0, series.xEnd ?? 1];
    const xs = rangeValues(numericValue(start), numericValue(end), series.points || 120, series.scale);
    return {
      type: "scatter",
      mode: "lines",
      ...trace,
      x: xs,
      y: xs.map((x, i) =>
        typeof series.y === "number" ? series.y : evaluateFormula(series.y || series.yFormula, { x, i })
      ),
    };
  }

  if (generator === "parametric") {
    const [start, end] = series.range || [series.tStart ?? 0, series.tEnd ?? 1];
    const ts = rangeValues(numericValue(start), numericValue(end), series.points || 160, series.scale);
    return {
      type: "scatter",
      mode: "lines",
      ...trace,
      x: ts.map((t, i) => evaluateFormula(series.x || series.xFormula, { t, i })),
      y: ts.map((t, i) => evaluateFormula(series.y || series.yFormula, { t, i })),
    };
  }

  if (generator === "sequence") {
    const start = Number(series.nStart ?? 0);
    const end = Number(series.nEnd ?? 10);
    const xs = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    return {
      type: "scatter",
      mode: "lines+markers",
      ...trace,
      x: xs,
      y: xs.map((n, i) => evaluateFormula(series.y || series.yFormula, { n, i })),
    };
  }

  if (generator === "point") {
    const x = evaluateFormula(String(series.x), {});
    const y = evaluateFormula(String(series.y), {});
    return {
      type: "scatter",
      mode: "markers",
      ...trace,
      x: [x],
      y: [y],
    };
  }

  if (generator === "fixed-point-staircase") {
    let x = Number(series.x0 ?? 1);
    const xs = [];
    const ys = [];

    for (let index = 0; index < Number(series.steps || 4); index += 1) {
      const next = evaluateFormula(series.formula, { x, i: index });
      xs.push(x, x, next);
      ys.push(x, next, next);
      x = next;
    }

    return {
      type: "scatter",
      mode: "lines+markers",
      ...trace,
      x: xs,
      y: ys,
    };
  }

  if (generator === "floating-distribution") {
    const minExponent = Number(series.minExponent ?? -5);
    const maxExponent = Number(series.maxExponent ?? 1);
    const mantissas = series.mantissas || [1, 1.25, 1.5, 1.75];
    const limit = Number(series.limit ?? 4);
    const values = [0];

    for (let exponent = minExponent; exponent <= maxExponent; exponent += 1) {
      mantissas.forEach((mantissa) => {
        const value = Number(mantissa) * 2 ** exponent;
        if (value <= limit) {
          values.push(value, -value);
        }
      });
    }

    const xs = [...new Set(values.map((value) => Number(value.toFixed(8))))].sort((a, b) => a - b);
    return {
      type: "scatter",
      mode: "markers",
      ...trace,
      x: xs,
      y: xs.map(() => Number(series.level ?? 1)),
    };
  }

  if (generator === "rk4-stability-boundary") {
    const points = rk4StabilityBoundary(Number(series.points || 180));
    return {
      type: "scatter",
      mode: "lines",
      fill: "toself",
      ...trace,
      x: points.map((point) => point[0]),
      y: points.map((point) => point[1]),
    };
  }

  return trace;
}

function expandPlotlySpec(spec) {
  return {
    ...spec,
    data: [...(spec.data || []), ...(spec.series || []).map(buildGeneratedSeries)],
  };
}

function initPlotlyCharts() {
  if (!window.Plotly) return;

  document.querySelectorAll("[data-plotly-chart]").forEach((chart) => {
    const configScript = chart.parentElement?.querySelector("[data-plotly-config]");
    if (!configScript) return;

    try {
      const spec = expandPlotlySpec(JSON.parse(configScript.textContent));
      const layout = {
        autosize: true,
        margin: { t: 86, r: 340, b: 70, l: 76 },
        paper_bgcolor: "#ffffff",
        plot_bgcolor: "#ffffff",
        font: { family: "Inter, system-ui, sans-serif", color: "#172033" },
        legend: {
          x: 1.02,
          y: 0.5,
          xanchor: "left",
          yanchor: "middle",
          bgcolor: "rgba(255,255,255,0.92)",
          bordercolor: "#d4d8df",
          borderwidth: 1,
        },
        ...(spec.layout || {}),
      };
      if (window.matchMedia("(max-width: 780px)").matches) {
        layout.margin = { ...(layout.margin || {}), r: 24, t: Math.max(layout.margin?.t || 0, 96) };
        layout.legend = {
          ...(layout.legend || {}),
          x: 0,
          y: -0.25,
          xanchor: "left",
          yanchor: "top",
          orientation: "h",
        };
      }
      const config = {
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["lasso2d", "select2d"],
        ...(spec.config || {}),
      };
      window.Plotly.newPlot(chart, spec.data || [], layout, config);
    } catch (error) {
      chart.innerHTML = '<div class="plotly-error">Configuration Plotly invalide.</div>';
      console.error("Configuration Plotly invalide", error);
    }
  });
}

function decodeCString(value) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function splitCArguments(source) {
  const args = [];
  let current = "";
  let inString = false;
  let escaped = false;
  let depth = 0;

  for (const char of source) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === "\\") {
      current += char;
      escaped = true;
      continue;
    }
    if (char === '"') inString = !inString;
    if (!inString && ["(", "[", "{"].includes(char)) depth += 1;
    if (!inString && [")", "]", "}"].includes(char)) depth -= 1;
    if (!inString && depth === 0 && char === ",") {
      args.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  if (current.trim()) args.push(current.trim());
  return args;
}

function collectCVariables(code) {
  const variables = {};
  const declarations = code.matchAll(/\b(?:int|long|short|char)\s+([^;\n]+);/g);

  for (const declaration of declarations) {
    splitCArguments(declaration[1]).forEach((part) => {
      const match = part.match(/\*?\s*([a-zA-Z_]\w*)\s*(?:=\s*(.+))?/);
      if (!match) return;
      const raw = match[2];
      if (!raw) variables[match[1]] = 0;
      else if (raw.trim().startsWith("'")) variables[match[1]] = raw.trim().charCodeAt(1);
      else variables[match[1]] = evaluateCExpression(raw, variables);
    });
  }

  return variables;
}

function extractCFunctionCalls(source, name) {
  const calls = [];
  let index = 0;

  while (index < source.length) {
    const start = source.indexOf(`${name}(`, index);
    if (start === -1) break;

    let cursor = start + name.length;
    let depth = 0;
    let inString = false;
    let escaped = false;
    let callStart = -1;

    for (; cursor < source.length; cursor += 1) {
      const char = source[cursor];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (inString) continue;
      if (char === "(") {
        if (depth === 0) callStart = cursor + 1;
        depth += 1;
      } else if (char === ")") {
        depth -= 1;
        if (depth === 0) {
          calls.push(source.slice(callStart, cursor));
          cursor += 1;
          break;
        }
      }
    }

    index = Math.max(cursor, start + name.length + 1);
  }

  return calls;
}

function parsePrintfCall(callSource) {
  const match = callSource.match(/^\s*"((?:\\.|[^"\\])*)"\s*(?:,\s*([\s\S]*))?\s*$/);
  if (!match) return null;
  return {
    format: match[1],
    args: splitCArguments(match[2] || ""),
  };
}

function evaluateKnownRecursiveCall(expression, variables) {
  const pgcdCall = expression.trim().match(/^pgcd\s*\(([^,]+),\s*([^)]+)\)$/);
  if (!pgcdCall) return null;

  let a = Number(evaluateCExpression(pgcdCall[1], variables));
  let b = Number(evaluateCExpression(pgcdCall[2], variables));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  let guard = 0;
  while (b !== 0 && guard < 100) {
    const next = a % b;
    a = b;
    b = next;
    guard += 1;
  }

  return a;
}

function evaluateCExpression(expression, variables) {
  const normalized = expression.trim();
  const knownRecursiveCall = evaluateKnownRecursiveCall(normalized, variables);
  if (knownRecursiveCall !== null) return knownRecursiveCall;
  if (/^-?\d+$/.test(normalized)) return Number(normalized);
  if (Object.prototype.hasOwnProperty.call(variables, normalized)) return variables[normalized];
  const substituted = normalized.replace(/\b[a-zA-Z_]\w*\b/g, (name) =>
    Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : name
  );
  if (/^[\d\s+\-*/%().]+$/.test(substituted)) {
    try {
      return Function(`"use strict"; return (${substituted});`)();
    } catch {
      return normalized;
    }
  }
  return normalized;
}

function evaluateCCondition(expression, variables) {
  const substituted = expression.trim().replace(/\b[a-zA-Z_]\w*\b/g, (name) =>
    Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : name
  );
  if (/^[\d\s+\-*/%().<>=!&|]+$/.test(substituted)) {
    try {
      return Boolean(Function(`"use strict"; return (${substituted});`)());
    } catch {
      return false;
    }
  }
  return false;
}

function applySimpleAssignments(source, variables) {
  source
    .split("\n")
    .map((line) => line.trim())
    .forEach((line) => {
      const assignment = line.match(/^([a-zA-Z_]\w*)\s*=\s*([^;]+);$/);
      if (!assignment || /^(?:if|while|for|switch|printf|scanf|return)$/.test(assignment[1])) return;
      variables[assignment[1]] = evaluateCExpression(assignment[2], variables);
    });
}

function collectPrintfOutput(source, variables, output) {
  for (const call of extractCFunctionCalls(source, "printf")) {
    const parsed = parsePrintfCall(call);
    if (parsed) output.push(renderPrintf(parsed.format, parsed.args, variables));
  }
}

function renderPrintf(format, args, variables) {
  let index = 0;
  return decodeCString(format).replace(/%[dicsf]/g, (token) => {
    const value = evaluateCExpression(args[index] || "0", variables);
    index += 1;
    if (token === "%c") return String.fromCharCode(Number(value) || 0);
    if (token === "%f") return Number(value).toFixed(6);
    return String(value);
  });
}

function renderPgcdTrace(code, output) {
  const variables = collectCVariables(code);
  const mainBody = code.match(/\bint\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}\s*$/);
  const searchArea = mainBody ? mainBody[1] : code;
  const mainCall = extractCFunctionCalls(searchArea, "pgcd")
    .map((call) => splitCArguments(call))
    .find((args) => args.length >= 2 && args.every((arg) => Number.isFinite(Number(evaluateCExpression(arg, variables)))));
  if (!mainCall) return false;

  let a = Number(evaluateCExpression(mainCall[0], variables));
  let b = Number(evaluateCExpression(mainCall[1], variables));
  let guard = 0;
  output.push(`pgcd(${a}, ${b})\n`);

  while (b !== 0 && guard < 100) {
    const next = a % b;
    output.push(`pgcd(${b}, ${next})\n`);
    a = b;
    b = next;
    guard += 1;
  }

  output.push(`Resultat = ${a}\n`);
  return true;
}

function simulateCProgram(code, variables) {
  const output = [];
  let compact = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const simpleFor = /for\s*\(\s*(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(-?\d+)\s*;\s*\1\s*<\s*(-?\d+)\s*;\s*\1\+\+\s*\)\s*\{([\s\S]*?)\}/g;

  if (/\bint\s+pgcd\s*\(/.test(compact) && renderPgcdTrace(compact, output)) return output.join("");

  compact = compact.replace(simpleFor, (fullMatch, name, start, end, body) => {
    for (let value = Number(start); value < Number(end) && value < Number(start) + 100; value += 1) {
      variables[name] = value;
      applySimpleAssignments(body, variables);
      collectPrintfOutput(body, variables, output);
    }
    return "";
  });

  compact = compact.replace(
    /if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}\s*else\s*\{([\s\S]*?)\}/g,
    (fullMatch, condition, thenBody, elseBody) => {
      const selectedBody = evaluateCCondition(condition, variables) ? thenBody : elseBody;
      applySimpleAssignments(selectedBody, variables);
      collectPrintfOutput(selectedBody, variables, output);
      return "";
    }
  );

  compact = compact.replace(/if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}/g, (fullMatch, condition, thenBody) => {
    if (evaluateCCondition(condition, variables)) {
      applySimpleAssignments(thenBody, variables);
      collectPrintfOutput(thenBody, variables, output);
    }
    return "";
  });

  applySimpleAssignments(compact, variables);
  collectPrintfOutput(compact, variables, output);

  return output.join("");
}

function analyzeCProgram(code) {
  const diagnostics = [];
  const explanations = [];
  const stripped = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

  if (!/\bint\s+main\s*\(/.test(stripped)) diagnostics.push("Erreur : fonction main introuvable.");
  if (/\bprintf\s*\(/.test(stripped) && !/#include\s*<stdio\.h>/.test(stripped)) {
    diagnostics.push("Avertissement : printf necessite generalement #include <stdio.h>.");
  }
  if ((stripped.match(/{/g) || []).length !== (stripped.match(/}/g) || []).length) {
    diagnostics.push("Erreur : accolades non equilibrees.");
  }
  stripped
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const needsSemicolon =
        !/[;{}:]$/.test(line) &&
        !/^(#|if\b|else\b|for\b|while\b|do\b|switch\b|int\s+main\b)/.test(line);
      if (needsSemicolon) diagnostics.push(`Erreur probable : point-virgule manquant apres "${line}".`);
    });
  if (/\bscanf\s*\([^;]*,\s*[a-zA-Z_]\w*\s*\)/.test(stripped)) {
    diagnostics.push("Erreur probable : scanf attend l'adresse de la variable, par exemple &x.");
  }

  const variables = collectCVariables(stripped);
  const output = simulateCProgram(stripped, variables);

  if (diagnostics.some((message) => message.startsWith("Erreur"))) {
    explanations.push("Le programme ne peut pas etre simule tant que les erreurs de structure sont presentes.");
  } else {
    explanations.push("Structure generale correcte : main est present et les blocs semblent coherents.");
    if (output) explanations.push("La sortie est reconstruite a partir des appels printf reconnus.");
    else explanations.push("Aucun printf simple reconnu : ajoute un affichage pour observer le resultat.");
  }
  if (/\*/.test(stripped) || /&[a-zA-Z_]\w*/.test(stripped)) {
    explanations.push("Pointeurs reperes : verifie toujours si tu manipules une adresse ou la valeur pointee.");
  }
  if (/\bmalloc\s*\(/.test(stripped) && !/==\s*NULL|!=\s*NULL/.test(stripped)) {
    explanations.push("Allocation dynamique : pense a tester le retour de malloc avant d'utiliser le pointeur.");
  }
  if (/\bfor\s*\(/.test(stripped)) {
    explanations.push("Boucle for : controle l'initialisation, la condition de continuation et le pas.");
  }

  return {
    output: diagnostics.length ? diagnostics.join("\n") : output || "Programme termine sans sortie.",
    explanations,
    hasError: diagnostics.some((message) => message.startsWith("Erreur")),
  };
}

function initCPlaygrounds() {
  document.querySelectorAll("[data-c-playground]").forEach((playground) => {
    const editor = playground.querySelector("[data-c-editor]");
    const output = playground.querySelector("[data-c-output]");
    const explain = playground.querySelector("[data-c-explain]");
    const initialCode = editor?.value || "";
    const resizeEditor = () => {
      if (!editor) return;
      editor.style.height = "auto";
      editor.style.height = `${editor.scrollHeight + 2}px`;
    };

    resizeEditor();
    editor?.addEventListener("input", resizeEditor);

    playground.querySelector("[data-c-run]")?.addEventListener("click", () => {
      const result = analyzeCProgram(editor.value);
      playground.classList.toggle("has-error", result.hasError);
      output.textContent = result.output;
      explain.innerHTML = result.explanations.map((item) => `<li>${item}</li>`).join("");
    });

    playground.querySelector("[data-c-reset]")?.addEventListener("click", () => {
      editor.value = initialCode;
      resizeEditor();
      playground.classList.remove("has-error");
      output.textContent = "En attente d'execution.";
      explain.innerHTML = "";
    });
  });
}

function openDetailsFromHash() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target && target.tagName === "DETAILS") target.open = true;
}

function updateProgress() {
  const mainProgress = document.querySelector("#main-progress");
  const sidebarProgress = document.querySelector("#sidebar-progress");
  const mainProgressLabel = document.querySelector("#main-progress-label");
  const sidebarProgressLabel = document.querySelector("#sidebar-progress-label");

  if (!mainProgress || !sidebarProgress || !mainProgressLabel || !sidebarProgressLabel) return;

  const total = Math.max(exercises.length, 1);
  const done = exercises.filter((exercise) => exercise.classList.contains("done")).length;
  const value = Math.round((done / total) * 100);

  mainProgress.style.width = `${value}%`;
  sidebarProgress.style.width = `${value}%`;
  mainProgressLabel.textContent = `${value}%`;
  sidebarProgressLabel.textContent = `${value}%`;
}

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.toggle);
    if (!panel) return;

    panel.classList.toggle("open");
    const isOpen = panel.classList.contains("open");
    const label = button.textContent.replace("Afficher", "").replace("Masquer", "").trim();
    button.textContent = `${isOpen ? "Masquer" : "Afficher"} ${label.toLowerCase()}`;
  });
});

document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const hash = new URL(link.href, window.location.href).hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target && target.tagName === "DETAILS") target.open = true;
  });
});

document.querySelectorAll("[data-mark-done]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-exercise]");
    card.classList.toggle("done");
    button.textContent = card.classList.contains("done") ? "Fait" : "Marquer comme fait";
    updateProgress();
  });
});

document.querySelectorAll("[data-toggle-redo]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-exercise]");
    card.classList.toggle("redo");
    button.classList.toggle("active");
    button.textContent = card.classList.contains("redo") ? "A refaire marque" : "A refaire";
  });
});

const annotationToggle = document.querySelector("[data-toggle-annotations]");
if (annotationToggle) {
  annotationToggle.addEventListener("click", (buttonEvent) => {
    body.classList.toggle("annotations-hidden");
    buttonEvent.currentTarget.textContent = body.classList.contains("annotations-hidden")
      ? "Afficher annotations"
      : "Masquer annotations";
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll(".page-section").forEach((section) => observer.observe(section));
openDetailsFromHash();
updateProgress();
initPlotlyCharts();
initCPlaygrounds();
