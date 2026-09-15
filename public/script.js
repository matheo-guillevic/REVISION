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
    const indices = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    return {
      type: "scatter",
      mode: "lines+markers",
      ...trace,
      x: indices.map((n, i) =>
        series.x === undefined ? n : evaluateFormula(series.x || series.xFormula, { n, i })
      ),
      y: indices.map((n, i) => evaluateFormula(series.y || series.yFormula, { n, i })),
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

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

function initCodeCopyButtons() {
  document.querySelectorAll("pre > code").forEach((code) => {
    const pre = code.parentElement;
    if (pre.closest("[data-linux-playground]") || pre.parentElement?.classList.contains("code-copy-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "code-copy-wrapper";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-button";
    button.textContent = "Copier";
    button.addEventListener("click", async () => {
      await copyToClipboard(code.textContent);
      button.textContent = "Copié";
      window.setTimeout(() => { button.textContent = "Copier"; }, 1800);
    });
    wrapper.appendChild(button);
  });
}

function initLinuxPlaygrounds() {
  let activeEmulator = null;
  let activePlayground = null;
  let v86Loader = null;
  const playgrounds = [...document.querySelectorAll("[data-linux-playground]")];
  if (!playgrounds.length) return;
  let starting = false;
  let manifestPromise = null;
  let cacheWarning = false;

  const fetchResource = async (url, kind = "arrayBuffer") => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 120000);
    try {
      const response = await fetch(url, { cache: "no-cache", referrerPolicy: "no-referrer", signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status} : ${url}`);
      return await response[kind]();
    } finally { window.clearTimeout(timer); }
  };
  const getManifest = () => {
    if (!manifestPromise) manifestPromise = fetchResource("linux/manifest.json", "json").catch((error) => {
      manifestPromise = null;
      throw error;
    });
    return manifestPromise;
  };
  const cacheMessage = (type) => new Promise((resolve, reject) => {
    if (!navigator.serviceWorker?.controller) return reject(new Error("Cache non actif"));
    const channel = new MessageChannel();
    const timer = window.setTimeout(() => { channel.port1.close(); reject(new Error("Cache sans réponse")); }, 10000);
    channel.port1.onmessage = ({ data }) => {
      window.clearTimeout(timer);
      channel.port1.close();
      data.ok ? resolve(data) : reject(new Error(data.error));
    };
    navigator.serviceWorker.controller.postMessage({ type }, [channel.port2]);
  });
  const showCacheStatus = async () => {
    let label = "Cache indisponible : les fichiers seront téléchargés à nouveau.";
    if (!cacheWarning) {
      try {
        const info = await cacheMessage("linux-cache-status");
        label = `Cache Linux actif : ${info.entries} fichiers conservés. Les fichiers encore inutilisés nécessitent une connexion.`;
      } catch (_) { /* The VM can still run without persistent storage. */ }
    }
    playgrounds.forEach((item) => { item.querySelector("[data-linux-cache-status]").textContent = label; });
  };
  navigator.serviceWorker?.addEventListener("message", ({ data }) => {
    if (data?.type !== "linux-cache-warning") return;
    cacheWarning = true;
    showCacheStatus();
  });
  const prepareCache = async (version) => {
    if (!("serviceWorker" in navigator)) { cacheWarning = true; return; }
    try {
      const workerUrl = new URL("service-worker.js", window.location.href);
      if (window.REVISION_ASSET_VERSION) {
        workerUrl.searchParams.set("v", window.REVISION_ASSET_VERSION);
      }
      await navigator.serviceWorker.register(workerUrl.href, { updateViaCache: "none" });
      // ready alone does not mean this document is controlled. Also wait for
      // the newly installed worker, not an older controller left by an update.
      const deadline = Date.now() + 15000;
      while (Date.now() < deadline) {
        if (navigator.serviceWorker.controller) {
          try {
            const info = await cacheMessage("linux-cache-status");
            if (info.version === version) return;
          } catch (_) { /* Old worker may not implement this protocol. */ }
        }
        await new Promise((resolve) => window.setTimeout(resolve, 100));
      }
      throw new Error("Activation du cache trop longue");
    } catch (error) {
      console.warn("Cache Linux :", error);
      cacheWarning = true;
    }
  };

  const loadV86 = (manifest) => {
    if (window.V86) return Promise.resolve(window.V86);
    if (v86Loader) return v86Loader;
    v86Loader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = manifest.runtime;
      script.onload = () => window.V86 ? resolve(window.V86) : reject(new Error("V86 n'est pas disponible"));
      script.onerror = () => { v86Loader = null; script.remove(); reject(new Error("Impossible de charger le moteur v86")); };
      document.head.appendChild(script);
    });
    return v86Loader;
  };

  const injectSource = async (playground, emulator) => {
    const editor = playground.querySelector("[data-linux-editor]");
    const status = playground.querySelector("[data-linux-status]");
    const bytes = new TextEncoder().encode(editor.value.replace(/\r\n/g, "\n"));
    const filesystem = emulator.fs9p;
    const file = filesystem?.SearchPath?.("/root/main.c");
    if (file && file.id >= 0 && filesystem.ChangeSize && filesystem.Write) {
      await filesystem.ChangeSize(file.id, bytes.length);
      if (bytes.length) await filesystem.Write(file.id, 0, bytes.length, bytes);
    } else {
      await emulator.create_file("/root/main.c", bytes);
    }
    status.innerHTML = "Source enregistrée dans <code>/root/main.c</code>. Compilez avec <code>gcc -Wall -Wextra /root/main.c -o /root/main</code>, puis lancez <code>/root/main</code>.";
  };

  const linuxKeyScancodes = {
    Enter: [0x1C],
    Backspace: [0x0E],
    Tab: [0x0F],
    Escape: [0x01],
    ArrowUp: [0xE0, 0x48],
    ArrowDown: [0xE0, 0x50],
    ArrowLeft: [0xE0, 0x4B],
    ArrowRight: [0xE0, 0x4D],
    Delete: [0xE0, 0x53],
    Home: [0xE0, 0x47],
    End: [0xE0, 0x4F],
  };
  const linuxKeyboardQueues = new WeakMap();

  const sendLinuxScancodes = (emulator, codes, interrupt = false) => {
    let queue = linuxKeyboardQueues.get(emulator);
    if (!queue) {
      queue = { jobs: [], index: 0, timer: null };
      linuxKeyboardQueues.set(emulator, queue);
    }
    // Ctrl+C / Ctrl+Z must not wait behind a long paste. Finish only the
    // current key tap, including modifier releases, before the interrupt.
    if (interrupt) queue.jobs.splice(1);
    queue.jobs.push(codes);
    if (queue.timer !== null) return;

    // Laisser le contrôleur PS/2 traiter chaque octet avant le suivant.
    // Une seule file préserve l'ordre des modificateurs, frappes et collages.
    const sendNext = () => {
      if (queue.jobs.length && queue.index === queue.jobs[0].length) {
        queue.jobs.shift();
        queue.index = 0;
      }
      if (!queue.jobs.length) {
        queue.timer = null;
        return;
      }
      emulator.keyboard_send_scancodes([queue.jobs[0][queue.index++]]);
      queue.timer = window.setTimeout(sendNext, 10);
    };
    sendNext();
  };

  const clearLinuxKeyboard = (emulator) => {
    const queue = linuxKeyboardQueues.get(emulator);
    if (queue) window.clearTimeout(queue.timer);
    linuxKeyboardQueues.delete(emulator);
  };

  const sendScancodeTap = (emulator, codes) => {
    const release = codes.length === 2 && codes[0] === 0xE0
      ? [0xE0, codes[1] | 0x80]
      : [codes[0] | 0x80];
    sendLinuxScancodes(emulator, [...codes, ...release]);
  };

  const linuxUsKeys = {
    "1": 0x02, "2": 0x03, "3": 0x04, "4": 0x05, "5": 0x06,
    "6": 0x07, "7": 0x08, "8": 0x09, "9": 0x0A, "0": 0x0B,
    "-": 0x0C, "=": 0x0D,
    q: 0x10, w: 0x11, e: 0x12, r: 0x13, t: 0x14, y: 0x15,
    u: 0x16, i: 0x17, o: 0x18, p: 0x19, "[": 0x1A, "]": 0x1B,
    a: 0x1E, s: 0x1F, d: 0x20, f: 0x21, g: 0x22, h: 0x23,
    j: 0x24, k: 0x25, l: 0x26, ";": 0x27, "'": 0x28, "`": 0x29,
    "\\": 0x2B, z: 0x2C, x: 0x2D, c: 0x2E, v: 0x2F, b: 0x30,
    n: 0x31, m: 0x32, ",": 0x33, ".": 0x34, "/": 0x35, " ": 0x39,
  };
  const linuxShiftedKeys = {
    "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6",
    "&": "7", "*": "8", "(": "9", ")": "0", "_": "-", "+": "=",
    "{": "[", "}": "]", "|": "\\", ":": ";", "\"": "'", "~": "`",
    "<": ",", ">": ".", "?": "/",
  };
  const linuxTransliteration = {
    à: "a", â: "a", ä: "a", ç: "c", é: "e", è: "e", ê: "e", ë: "e",
    î: "i", ï: "i", ô: "o", ö: "o", ù: "u", û: "u", ü: "u",
    À: "A", Â: "A", Ä: "A", Ç: "C", É: "E", È: "E", Ê: "E", Ë: "E",
    Î: "I", Ï: "I", Ô: "O", Ö: "O", Ù: "U", Û: "U", Ü: "U",
  };

  const sendLinuxText = (emulator, value) => {
    for (let character of String(value)) {
      character = linuxTransliteration[character] || character;
      if (character === "\n" || character === "\r") {
        sendScancodeTap(emulator, linuxKeyScancodes.Enter);
        continue;
      }
      if (character === "\t") {
        sendScancodeTap(emulator, linuxKeyScancodes.Tab);
        continue;
      }

      const lower = character.toLowerCase();
      const uppercaseLetter = character !== lower && /^[a-z]$/.test(lower);
      const shiftedBase = linuxShiftedKeys[character];
      const scancode = linuxUsKeys[shiftedBase || lower];
      if (!scancode) continue;

      if (uppercaseLetter || shiftedBase) {
        sendLinuxScancodes(emulator, [0x2A, scancode, scancode | 0x80, 0xAA]);
      } else {
        sendScancodeTap(emulator, [scancode]);
      }
    }
  };

  const installAzertyKeyboard = (screen, emulator) => {
    screen.addEventListener("pointerdown", () => screen.focus());
    screen.addEventListener("keydown", (event) => {
      if (event.isComposing || event.metaKey) return;

      // AltGr peut aussi activer ctrlKey : ses caractères restent du texte.
      if (event.ctrlKey && !event.altKey && !event.getModifierState?.("AltGraph")) {
        const key = event.key.toLowerCase();
        // Laisser le navigateur déclencher paste, sans insérer un « v ».
        if (key === "v") return;
        const codes = linuxKeyScancodes[event.key]
          || (linuxUsKeys[key] ? [linuxUsKeys[key]] : null);
        if (codes) {
          const release = codes.map((code) => code === 0xE0 ? code : code | 0x80);
          sendLinuxScancodes(emulator, [0x1D, ...codes, ...release, 0x9D], key === "c" || key === "z");
          event.preventDefault();
        }
        return;
      }

      if (event.key.length === 1) {
        // event.key contient déjà le caractère produit par la disposition
        // AZERTY du navigateur. On le transforme directement en scancodes US,
        // sans dépendre du keyboard_adapter désactivé de v86.
        sendLinuxText(emulator, event.key);
        event.preventDefault();
        return;
      }

      const codes = linuxKeyScancodes[event.key];
      if (codes) {
        sendScancodeTap(emulator, codes);
        event.preventDefault();
      }
    });

    screen.addEventListener("paste", (event) => {
      const text = event.clipboardData?.getData("text/plain");
      if (!text) return;
      sendLinuxText(emulator, text.replace(/\r\n/g, "\n"));
      event.preventDefault();
    });
  };

  document.querySelectorAll("[data-linux-playground]").forEach((playground) => {
    const startButton = playground.querySelector("[data-linux-start]");
    const copyButton = playground.querySelector("[data-linux-copy]");
    const sendButton = playground.querySelector("[data-linux-send]");
    const pasteButton = playground.querySelector("[data-linux-paste]");
    const runButton = playground.querySelector("[data-linux-run]");
    const editor = playground.querySelector("[data-linux-editor]");
    const status = playground.querySelector("[data-linux-status]");
    const terminal = playground.querySelector("[data-linux-terminal]");

    if (window.location.protocol === "file:") {
      startButton.disabled = true;
      status.innerHTML = 'v86 nécessite une page servie en HTTP. Lancez <code>npm run preview</code>, puis ouvrez <a href="http://localhost:4173/IN333-OS.html">http://localhost:4173/IN333-OS.html</a>.';
      terminal.innerHTML = '<div class="linux-playground-placeholder"><strong>Serveur local requis</strong><p>Les navigateurs interdisent le chargement de WebAssembly depuis une page ouverte en <code>file://</code>.</p><p>Dans le dossier du projet : <code>npm run preview</code></p></div>';
      return;
    }

    copyButton?.addEventListener("click", async () => {
      try {
        await copyToClipboard(editor.value);
        copyButton.textContent = "Code copié";
        status.textContent = "Code copié dans le presse-papiers.";
        window.setTimeout(() => { copyButton.textContent = "Copier le code C"; }, 1800);
      } catch (error) {
        status.textContent = "La copie a été refusée par le navigateur. Sélectionnez le code avec Ctrl+A puis Ctrl+C.";
      }
    });

    sendButton?.addEventListener("click", async () => {
      if (!activeEmulator || activePlayground !== playground) return;
      sendButton.disabled = true;
      try {
        await injectSource(playground, activeEmulator);
        terminal.querySelector(".linux-v86-screen")?.focus();
      } catch (error) {
        status.textContent = `Impossible d'envoyer main.c : ${error.message}`;
      } finally {
        sendButton.disabled = false;
      }
    });

    pasteButton?.addEventListener("click", async () => {
      if (!activeEmulator || activePlayground !== playground) return;
      try {
        const text = await navigator.clipboard.readText();
        sendLinuxText(activeEmulator, text.replace(/\r\n/g, "\n"));
        terminal.querySelector(".linux-v86-screen")?.focus();
        status.textContent = "Texte collé dans le terminal.";
      } catch (error) {
        status.textContent = "Lecture du presse-papiers refusée. Autorisez-la pour localhost, ou utilisez Ctrl+V dans le terminal.";
      }
    });

    runButton?.addEventListener("click", async () => {
      if (!activeEmulator || activePlayground !== playground) return;
      runButton.disabled = true;
      try {
        await injectSource(playground, activeEmulator);
        sendLinuxText(activeEmulator, "gcc -std=c11 -D_POSIX_C_SOURCE=200809L -Wall -Wextra -Werror=incompatible-pointer-types /root/main.c -o /root/main && /root/main\n");
        terminal.querySelector(".linux-v86-screen")?.focus();
        status.textContent = "Compilation et exécution demandées dans Linux. La sortie apparaît dans le terminal.";
      } catch (error) {
        status.textContent = `Impossible d'exécuter le programme : ${error.message}`;
      } finally {
        runButton.disabled = false;
      }
    });

    playground.querySelector("[data-linux-cache-clear]")?.addEventListener("click", async () => {
      if (starting) return;
      const button = playground.querySelector("[data-linux-cache-clear]");
      button.disabled = true;
      try {
        const manifest = await getManifest();
        await prepareCache(manifest.version);
        await cacheMessage("linux-cache-clear");
        cacheWarning = false;
        await showCacheStatus();
      } catch (error) {
        playground.querySelector("[data-linux-cache-status]").textContent = `Réinitialisation impossible : ${error.message}`;
      } finally { button.disabled = false; }
    });

    startButton?.addEventListener("click", async () => {
      if (starting) return;
      starting = true;
      playgrounds.forEach((item) => item.querySelectorAll("[data-linux-start], [data-linux-cache-clear]").forEach((button) => { button.disabled = true; }));
      sendButton.disabled = pasteButton.disabled = runButton.disabled = true;
      status.textContent = "Préparation de l’image Linux et du cache…";
      let nextEmulator = null;
      let basefsUrl = null;
      try {
        const manifest = await getManifest();
        await prepareCache(manifest.version);
        await showCacheStatus();
        // Lazy 9p reads also need this policy when no worker is available.
        let referrerPolicy = document.querySelector('meta[name="referrer"]');
        if (!referrerPolicy) {
          referrerPolicy = document.createElement("meta");
          referrerPolicy.name = "referrer";
          document.head.appendChild(referrerPolicy);
        }
        referrerPolicy.content = "no-referrer";

        status.textContent = "Chargement du noyau et de l’image corrigée (premier téléchargement plus long)…";
        const [V86Constructor, basefs, overlay, kernel, initrd, bios, vgaBios] = await Promise.all([
          loadV86(manifest), fetchResource(playground.dataset.linuxBasefs || manifest.basefs, "json"),
          fetchResource(manifest.overlay, "json"), fetchResource(manifest.kernel),
          fetchResource(manifest.initrd), fetchResource(manifest.bios), fetchResource(manifest.vgaBios),
        ]);
        if (basefs.version !== 3 || !Array.isArray(basefs.fsroot)) throw new Error("Description du système de fichiers invalide");
        basefsUrl = URL.createObjectURL(new Blob([JSON.stringify(basefs)], { type: "application/json" }));

        if (activeEmulator) {
          clearLinuxKeyboard(activeEmulator);
          await activeEmulator.destroy();
          if (activePlayground) {
            activePlayground.querySelectorAll("[data-linux-send], [data-linux-paste], [data-linux-run]").forEach((button) => { button.disabled = true; });
            activePlayground.querySelector("[data-linux-status]").textContent = "Machine arrêtée : un autre démarrage a été demandé.";
            activePlayground.querySelector("[data-linux-terminal]").innerHTML = '<div class="linux-playground-placeholder"><strong>Machine arrêtée</strong><p>Démarrez ce laboratoire pour reprendre cet exemple.</p></div>';
          }
          activeEmulator = null;
        }

        const screen = document.createElement("div");
        screen.className = "linux-v86-screen";
        screen.tabIndex = 0;
        screen.setAttribute("aria-label", "Terminal Linux v86 interactif");
        screen.innerHTML = '<div class="linux-v86-text"></div><canvas class="linux-v86-canvas"></canvas>';
        terminal.replaceChildren(screen);
        nextEmulator = new V86Constructor({
          wasm_path: manifest.wasm,
          memory_size: 512 * 1024 * 1024,
          vga_memory_size: 8 * 1024 * 1024,
          screen_container: screen,
          disable_keyboard: true,
          disable_mouse: true,
          bios: { buffer: bios }, vga_bios: { buffer: vgaBios },
          bzimage: { buffer: kernel }, initrd: { buffer: initrd },
          filesystem: { baseurl: playground.dataset.linuxFs || manifest.filesystem, basefs: basefsUrl },
          cmdline: "rw apm=off vga=0x344 video=vesafb:ypan,vremap:8 root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose mitigations=off audit=0 init_on_free=on tsc=reliable random.trust_cpu=on nowatchdog init=/usr/bin/init-openrc net.ifnames=0 biosdevname=0",
          // Inject the repaired configuration before the first CPU instruction.
          autostart: false,
        });
        const emulator = nextEmulator;
        activeEmulator = emulator;
        activePlayground = playground;
        startButton.textContent = "Redémarrer Linux";
        screen.addEventListener("click", () => screen.focus());
        installAzertyKeyboard(screen, emulator);
        status.textContent = "Initialisation de Linux…";

        await new Promise((resolve, reject) => {
          let serial = "";
          let settled = false;
          const finish = (error) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            emulator.remove_listener("serial0-output-byte", serialOutput);
            error ? reject(error) : resolve();
          };
          const serialOutput = (byte) => {
            serial = (serial + String.fromCharCode(byte)).slice(-200);
            if (serial.includes("\x1eREVISION_LINUX_READY\x1f")) finish();
          };
          const timeout = window.setTimeout(() => finish(new Error("Linux n’a pas atteint le terminal après 3 minutes. Vérifiez la connexion, puis réessayez.")), 180000);
          emulator.add_listener("serial0-output-byte", serialOutput);
          emulator.add_listener("download-error", () => finish(new Error("Téléchargement d’un fichier Linux impossible.")));
          emulator.add_listener("emulator-ready", async () => {
            if (settled) return;
            try {
              for (const [filename, contents] of Object.entries(overlay)) {
                await emulator.create_file(filename, new TextEncoder().encode(contents));
              }
              await injectSource(playground, emulator);
              if (settled) return;
              status.textContent = "Démarrage de Linux ; attente du terminal…";
              await emulator.run();
            } catch (error) { finish(error); }
          });
        });
        sendButton.disabled = pasteButton.disabled = runButton.disabled = false;
        status.textContent = "Linux est prêt. Clavier AZERTY actif ; /root/main.c est à jour.";
        screen.focus();
        await showCacheStatus();
      } catch (error) {
        if (nextEmulator) {
          clearLinuxKeyboard(nextEmulator);
          await nextEmulator.destroy();
          if (activeEmulator === nextEmulator) activeEmulator = null;
        }
        terminal.textContent = `Échec du démarrage : ${error.message}`;
        status.textContent = "Linux n’a pas démarré. Vous pouvez réessayer ou réinitialiser son cache.";
      } finally {
        if (basefsUrl) URL.revokeObjectURL(basefsUrl);
        starting = false;
        playgrounds.forEach((item) => item.querySelectorAll("[data-linux-start], [data-linux-cache-clear]").forEach((button) => { button.disabled = false; }));
      }
    });

  });
}
const riscvAliases = {
  zero: 0, ra: 1, sp: 2, gp: 3, tp: 4,
  t0: 5, t1: 6, t2: 7, s0: 8, fp: 8, s1: 9,
  a0: 10, a1: 11, a2: 12, a3: 13, a4: 14, a5: 15, a6: 16, a7: 17,
  s2: 18, s3: 19, s4: 20, s5: 21, s6: 22, s7: 23, s8: 24, s9: 25,
  s10: 26, s11: 27, t3: 28, t4: 29, t5: 30, t6: 31,
};

function riscvRegisterIndex(name) {
  const token = String(name || "").trim().toLowerCase();
  if (/^x(?:[0-9]|[12][0-9]|3[01])$/.test(token)) return Number(token.slice(1));
  if (Object.hasOwn(riscvAliases, token)) return riscvAliases[token];
  throw new Error(`registre inconnu : ${name}`);
}

function riscvImmediate(value) {
  const token = String(value || "").trim();
  const sign = token.startsWith("-") ? -1 : 1;
  const unsigned = token.replace(/^[+-]/, "");
  const result = /^0x[0-9a-f]+$/i.test(unsigned) ? parseInt(unsigned, 16) : Number(unsigned);
  if (!Number.isInteger(result)) throw new Error(`immediat invalide : ${value}`);
  return sign * result;
}

function assembleRiscv(source) {
  const labels = new Map();
  const instructions = [];
  const pending = [];

  String(source).split(/\r?\n/).forEach((raw, lineIndex) => {
    let line = raw.replace(/#.*$/, "").trim();
    if (!line) return;
    while (/^[A-Za-z_.$][\w.$]*\s*:/.test(line)) {
      const match = line.match(/^([A-Za-z_.$][\w.$]*)\s*:\s*/);
      if (labels.has(match[1])) throw new Error(`ligne ${lineIndex + 1} : label duplique ${match[1]}`);
      labels.set(match[1], instructions.length);
      line = line.slice(match[0].length).trim();
    }
    if (!line || line.startsWith(".")) return;
    const parts = line.replace(/,/g, " ").trim().split(/\s+/);
    pending.push({ op: parts[0].toLowerCase(), args: parts.slice(1), text: line, line: lineIndex + 1 });
    instructions.push(null);
  });

  pending.forEach((instruction, index) => {
    const target = (token) => {
      if (labels.has(token)) return labels.get(token);
      return index + riscvImmediate(token);
    };
    const memoryOperand = (token) => {
      const match = String(token).match(/^([^()]*)\(([^()]+)\)$/);
      if (!match) throw new Error(`ligne ${instruction.line} : adressage attendu offset(base)`);
      return { offset: riscvImmediate(match[1] || 0), base: riscvRegisterIndex(match[2]) };
    };
    const r = riscvRegisterIndex;
    const i = riscvImmediate;
    const { op, args } = instruction;
    let decoded;
    if (["add", "sub", "and", "or", "xor", "sll", "srl", "sra", "slt", "sltu"].includes(op))
      decoded = { op, rd: r(args[0]), rs1: r(args[1]), rs2: r(args[2]) };
    else if (["addi", "andi", "ori", "xori", "slti"].includes(op))
      decoded = { op, rd: r(args[0]), rs1: r(args[1]), imm: i(args[2]) };
    else if (["lw", "sw"].includes(op))
      decoded = { op, reg: r(args[0]), ...memoryOperand(args[1]) };
    else if (["beq", "bne", "blt", "bge"].includes(op))
      decoded = { op, rs1: r(args[0]), rs2: r(args[1]), target: target(args[2]) };
    else if (op === "jal")
      decoded = { op, rd: r(args[0]), target: target(args[1]) };
    else if (op === "jalr") {
      const address = memoryOperand(args[1]);
      decoded = { op, rd: r(args[0]), rs1: address.base, imm: address.offset };
    } else if (op === "li") decoded = { op: "addi", rd: r(args[0]), rs1: 0, imm: i(args[1]) };
    else if (op === "mv") decoded = { op: "addi", rd: r(args[0]), rs1: r(args[1]), imm: 0 };
    else if (op === "j") decoded = { op: "jal", rd: 0, target: target(args[0]) };
    else if (op === "ret") decoded = { op: "jalr", rd: 0, rs1: 1, imm: 0 };
    else if (op === "nop") decoded = { op: "addi", rd: 0, rs1: 0, imm: 0 };
    else if (op === "ecall") decoded = { op };
    else throw new Error(`ligne ${instruction.line} : instruction non prise en charge : ${op}`);
    instructions[index] = { ...instruction, ...decoded };
  });
  return instructions;
}

function createRiscvState(source) {
  const registers = new Int32Array(32);
  registers[2] = 4096;
  return { source, instructions: assembleRiscv(source), registers, memory: new Map(), pc: 0, trace: [], output: "", halted: false };
}

function executeRiscvStep(state) {
  if (state.halted) return;
  if (state.pc < 0 || state.pc >= state.instructions.length) {
    state.halted = true;
    return;
  }
  const ins = state.instructions[state.pc];
  const r = state.registers;
  const before = Array.from(r);
  let next = state.pc + 1;
  const write = (rd, value) => { if (rd !== 0) r[rd] = value | 0; };
  const shifts = r[ins.rs2] & 31;
  switch (ins.op) {
    case "add": write(ins.rd, r[ins.rs1] + r[ins.rs2]); break;
    case "sub": write(ins.rd, r[ins.rs1] - r[ins.rs2]); break;
    case "and": write(ins.rd, r[ins.rs1] & r[ins.rs2]); break;
    case "or": write(ins.rd, r[ins.rs1] | r[ins.rs2]); break;
    case "xor": write(ins.rd, r[ins.rs1] ^ r[ins.rs2]); break;
    case "sll": write(ins.rd, r[ins.rs1] << shifts); break;
    case "srl": write(ins.rd, r[ins.rs1] >>> shifts); break;
    case "sra": write(ins.rd, r[ins.rs1] >> shifts); break;
    case "slt": write(ins.rd, r[ins.rs1] < r[ins.rs2] ? 1 : 0); break;
    case "sltu": write(ins.rd, (r[ins.rs1] >>> 0) < (r[ins.rs2] >>> 0) ? 1 : 0); break;
    case "addi": write(ins.rd, r[ins.rs1] + ins.imm); break;
    case "andi": write(ins.rd, r[ins.rs1] & ins.imm); break;
    case "ori": write(ins.rd, r[ins.rs1] | ins.imm); break;
    case "xori": write(ins.rd, r[ins.rs1] ^ ins.imm); break;
    case "slti": write(ins.rd, r[ins.rs1] < ins.imm ? 1 : 0); break;
    case "lw": {
      const address = (r[ins.base] + ins.offset) | 0;
      if (address % 4) throw new Error(`adresse non alignee : ${address}`);
      write(ins.reg, state.memory.get(address) || 0);
      break;
    }
    case "sw": {
      const address = (r[ins.base] + ins.offset) | 0;
      if (address % 4) throw new Error(`adresse non alignee : ${address}`);
      state.memory.set(address, r[ins.reg] | 0);
      break;
    }
    case "beq": if (r[ins.rs1] === r[ins.rs2]) next = ins.target; break;
    case "bne": if (r[ins.rs1] !== r[ins.rs2]) next = ins.target; break;
    case "blt": if (r[ins.rs1] < r[ins.rs2]) next = ins.target; break;
    case "bge": if (r[ins.rs1] >= r[ins.rs2]) next = ins.target; break;
    case "jal": write(ins.rd, (state.pc + 1) * 4); next = ins.target; break;
    case "jalr": {
      const destination = ((r[ins.rs1] + ins.imm) & ~1) / 4;
      write(ins.rd, (state.pc + 1) * 4);
      next = destination;
      break;
    }
    case "ecall":
      if (r[17] === 1) state.output += String(r[10]);
      else if (r[17] === 11) state.output += String.fromCharCode(r[10] & 255);
      else if (r[17] === 10) state.halted = true;
      else throw new Error(`ecall inconnu : a7=${r[17]}`);
      break;
    default: throw new Error(`instruction non executable : ${ins.op}`);
  }
  r[0] = 0;
  state.trace.push(`${String(state.pc * 4).padStart(4, "0")}: ${ins.text}`);
  if (state.trace.length > 120) state.trace.shift();
  state.pc = next;
  state.changed = r.map((value, index) => value !== before[index]);
  if (state.pc === state.instructions.length) state.halted = true;
}

function initRiscvPlaygrounds() {
  document.querySelectorAll("[data-riscv-playground]").forEach((playground) => {
    const editor = playground.querySelector("[data-riscv-editor]");
    const output = playground.querySelector("[data-riscv-output]");
    const status = playground.querySelector("[data-riscv-status]");
    const registerView = playground.querySelector("[data-riscv-registers]");
    const initialCode = editor.value;
    let state;
    const names = ["zero", "ra", "sp", "gp", "tp", "t0", "t1", "t2", "s0", "s1", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "t3", "t4", "t5", "t6"];
    const render = (message = "") => {
      const registers = state?.registers || new Int32Array(32);
      registerView.innerHTML = Array.from(registers, (value, index) =>
        `<span class="${state?.changed?.[index] ? "changed" : ""}">x${index}/${names[index]}<br>${value} · 0x${(value >>> 0).toString(16).padStart(8, "0")}</span>`
      ).join("");
      output.textContent = state ? `${state.trace.join("\n")}\n${state.output ? `\nSortie : ${state.output}` : ""}`.trim() || "Programme assemble." : "En attente d'execution.";
      status.textContent = message || (state?.halted ? `Programme termine apres ${state.trace.length} instruction(s).` : `PC = ${(state?.pc || 0) * 4} · prochaine instruction ${(state?.pc || 0) + 1}.`);
    };
    const prepare = () => {
      state = createRiscvState(editor.value);
      playground.classList.remove("has-error");
      render(`${state.instructions.length} instruction(s) assemblee(s), PC = 0.`);
    };
    const safely = (action) => {
      try { action(); }
      catch (error) { playground.classList.add("has-error"); status.textContent = `Erreur : ${error.message}`; }
    };
    playground.querySelector("[data-riscv-run]")?.addEventListener("click", () => safely(() => {
      prepare();
      let count = 0;
      while (!state.halted && count < 10000) { executeRiscvStep(state); count += 1; }
      if (!state.halted) throw new Error("limite de 10 000 instructions atteinte (boucle possible)");
      render(`Programme termine : ${count} instruction(s) executee(s).`);
    }));
    playground.querySelector("[data-riscv-step]")?.addEventListener("click", () => safely(() => {
      if (!state || state.source !== editor.value || state.halted) prepare();
      executeRiscvStep(state);
      render();
    }));
    playground.querySelector("[data-riscv-reset]")?.addEventListener("click", () => {
      editor.value = initialCode; state = undefined; playground.classList.remove("has-error"); render("Programme reinitialise.");
    });
    editor.addEventListener("input", () => { state = undefined; playground.classList.remove("has-error"); });
    render();
  });
}

let webRSessionPromise = null;

async function loadWebRSession() {
  if (!webRSessionPromise) {
    webRSessionPromise = import("https://webr.r-wasm.org/latest/webr.mjs").then(async ({ WebR }) => {
      const webR = new WebR();
      await webR.init();
      return webR;
    });
  }
  return webRSessionPromise;
}

function formatROutputItem(item) {
  if (!item) return "";
  if (typeof item.data === "string") return item.data;
  if (item.data && typeof item.data.message === "string") return item.data.message;
  return String(item.data ?? "");
}

function escapeHtmlText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightRCode(code) {
  const tokenPattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|\b(?:function|for|in|if|else|return|while|repeat|TRUE|FALSE|NULL|NA|NaN|Inf|library|require|print|plot|lines|points|data\.frame|sprintf|abs|sqrt|log|exp|seq|c|length|numeric|cat|legend|grid)\b|\b[A-Za-z.][\w.]*\s*(?=\()|<-|->|==|!=|<=|>=|&&|\|\||[+\-*/^=<>~:$])/gi;
  let cursor = 0;
  let html = "";

  for (const match of code.matchAll(tokenPattern)) {
    const value = match[0];
    const index = match.index || 0;
    html += escapeHtmlText(code.slice(cursor, index));

    let tokenClass = "operator";
    if (value.startsWith("#")) tokenClass = "comment";
    else if (value.startsWith("\"") || value.startsWith("'")) tokenClass = "string";
    else if (/^\d/.test(value)) tokenClass = "number";
    else if (/^[A-Za-z.][\w.]*\s*$/.test(value)) tokenClass = "function";
    else if (/^[A-Za-z.]/.test(value)) tokenClass = "keyword";

    html += `<span class="r-token-${tokenClass}">${escapeHtmlText(value)}</span>`;
    cursor = index + value.length;
  }

  html += escapeHtmlText(code.slice(cursor));
  return html || "\n";
}

function initRCodeHighlight(editor, highlight) {
  const shell = editor.closest(".r-code-shell");
  if (!shell || !highlight) return;

  const sync = () => {
    highlight.innerHTML = highlightRCode(editor.value);
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
  };

  shell.classList.add("is-highlighted");
  editor.addEventListener("input", sync);
  editor.addEventListener("scroll", () => {
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
  });
  sync();
}

function renderROutput(container, items) {
  container.replaceChildren();
  if (!items.length) {
    container.textContent = "Code execute sans sortie console.";
    return;
  }

  items.forEach((item) => {
    const text = formatROutputItem(item);
    if (!text) return;
    const line = document.createElement("span");
    const type = String(item.type || "R").toLowerCase();
    line.className = `r-output-line r-output-${type.replace(/[^a-z0-9_-]/g, "")}`;
    line.innerHTML = `<span class="r-output-type">[${escapeHtmlText(item.type || "R")}]</span> ${escapeHtmlText(text)}`;
    container.appendChild(line);
  });

  if (!container.childElementCount) container.textContent = "Code execute sans sortie console.";
}

function renderRImages(container, images) {
  container.replaceChildren();
  if (!images.length) {
    container.textContent = "Aucun graphique genere.";
    return;
  }

  images.forEach((image) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
    container.appendChild(canvas);
  });
}

function initRPlaygrounds() {
  document.querySelectorAll("[data-r-playground]").forEach((playground) => {
    const editor = playground.querySelector("[data-r-editor]");
    const output = playground.querySelector("[data-r-output]");
    const plotOutput = playground.querySelector("[data-r-plots]");
    const status = playground.querySelector("[data-r-status]");
    const runButton = playground.querySelector("[data-r-run]");
    const resetButton = playground.querySelector("[data-r-reset]");
    const highlight = playground.querySelector("[data-r-highlight]");
    const initialCode = editor?.defaultValue || editor?.textContent || editor?.value || "";

    if (!editor || !output || !plotOutput || !status || !runButton || !resetButton) return;
    editor.value = initialCode;
    initRCodeHighlight(editor, highlight);

    resetButton.addEventListener("click", () => {
      editor.value = initialCode;
      output.textContent = "En attente d'execution.";
      plotOutput.textContent = "Aucun graphique pour le moment.";
      playground.classList.remove("has-error");
      status.textContent = "Code restaure. WebR sera charge au prochain lancement si necessaire.";
      editor.dispatchEvent(new Event("input"));
    });

    runButton.addEventListener("click", async () => {
      runButton.disabled = true;
      playground.classList.remove("has-error");
      status.textContent = "Chargement de WebR et execution du code...";
      output.textContent = "Execution en cours...";
      plotOutput.textContent = "Generation des graphiques...";

      try {
        const webR = await loadWebRSession();
        const shelter = await new webR.Shelter();
        const capture = await shelter.captureR(editor.value, {
          captureGraphics: playground.dataset.captureGraphics !== "false"
            ? { width: 900, height: 540, bg: "white" }
            : false,
        });
        renderROutput(output, capture.output || []);
        renderRImages(plotOutput, capture.images || []);
        status.textContent = "Execution terminee dans le navigateur.";
        shelter.purge();
      } catch (error) {
        playground.classList.add("has-error");
        output.textContent = error?.message || String(error);
        plotOutput.textContent = "Aucun graphique genere.";
        status.textContent = "Erreur pendant l'execution R.";
      } finally {
        runButton.disabled = false;
      }
    });
  });
}

function renderToeicInline(text) {
  return escapeHtmlText(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
}

function renderToeicMarkdown(text = "") {
  const lines = String(text).trim().split(/\n+/);
  const html = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${renderToeicInline(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    const bullet = line.match(/^[-*]\s+(.+)/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flushList();
    html.push(`<p>${renderToeicInline(line)}</p>`);
  });
  flushList();
  return html.join("");
}

function initToeicQuizzes() {
  document.querySelectorAll("[data-toeic-quiz]").forEach((quiz) => {
    const dataNode = quiz.querySelector("[data-toeic-data]");
    const panel = quiz.querySelector("[data-toeic-panel]");
    const modeSelect = quiz.querySelector("[data-toeic-mode]");
    const ficheSelect = quiz.querySelector("[data-toeic-fiche]");
    const scoreNode = quiz.querySelector("[data-toeic-score]");
    const scoreLabel = quiz.querySelector("[data-toeic-score-label]");
    const progressNode = quiz.querySelector("[data-toeic-progress]");
    const resetButton = quiz.querySelector("[data-toeic-reset]");
    if (!dataNode || !panel || !modeSelect || !ficheSelect || !scoreNode || !scoreLabel || !progressNode || !resetButton) return;

    const data = JSON.parse(dataNode.textContent || "{}");
    const questions = Array.isArray(data.questions) ? data.questions : [];
    const fiches = new Map((data.fiches || []).map((fiche) => [fiche.id, fiche]));
    const storageKey = `toeic-quiz:${quiz.id || data.title || "default"}`;
    let answers = {};
    try {
      answers = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      answers = {};
    }
    let currentIndex = 0;
    let helpOpen = false;

    ficheSelect.innerHTML = [
      '<option value="all">Toutes les fiches</option>',
      ...(data.fiches || []).map((fiche) => `<option value="${escapeHtmlText(fiche.id)}">Fiche ${fiche.n} - ${escapeHtmlText(fiche.title)}</option>`),
    ].join("");

    const save = () => localStorage.setItem(storageKey, JSON.stringify(answers));
    const getAnswer = (question) => answers[question.id];
    const isRight = (question) => getAnswer(question) === question.answer;
    const isAnswered = (question) => Boolean(getAnswer(question));

    const filteredQuestions = () => {
      const mode = modeSelect.value;
      const ficheId = ficheSelect.value;
      return questions.filter((question) => {
        if (mode === "unanswered" && isAnswered(question)) return false;
        if (mode === "wrong" && (!isAnswered(question) || isRight(question))) return false;
        if (mode === "right" && !isRight(question)) return false;
        if (ficheId !== "all" && question.ficheId !== ficheId) return false;
        return true;
      });
    };

    const currentQuestionSet = () => filteredQuestions();
    const currentQuestion = () => {
      const visible = currentQuestionSet();
      if (!visible.length) return undefined;
      currentIndex = Math.min(Math.max(currentIndex, 0), visible.length - 1);
      return visible[currentIndex];
    };

    const renderScore = () => {
      const answered = questions.filter(isAnswered).length;
      const correct = questions.filter(isRight).length;
      const percent = questions.length ? Math.round((answered / questions.length) * 100) : 0;
      scoreNode.textContent = `${correct} / ${answered}`;
      scoreLabel.textContent = answered ? `${Math.round((correct / answered) * 100)}% de reussite` : "Aucune reponse";
      progressNode.style.width = `${percent}%`;
    };

    const renderFicheHtml = (question) => {
      const fiche = fiches.get(question.ficheId);
      if (!fiche) {
        return '<div class="toeic-help-panel"><p>Aucune fiche associee.</p></div>';
      }
      return `
        <aside class="toeic-help-panel">
        <span class="status-pill">Fiche ${fiche.n}</span>
        <h4>${escapeHtmlText(fiche.title)}</h4>
        <div class="toeic-fiche-body">${renderToeicMarkdown(fiche.body)}</div>
        </aside>
      `;
    };

    const renderQuestion = () => {
      const question = currentQuestion();
      if (!question) {
        panel.innerHTML = '<p class="toeic-empty">Aucune question disponible avec ces filtres.</p>';
        return;
      }

      const visible = currentQuestionSet();
      const selected = getAnswer(question);
      const answered = Boolean(selected);
      const correction = answered
        ? `<div class="toeic-correction ${isRight(question) ? "is-right" : "is-wrong"}">
            <strong>${isRight(question) ? "Bonne reponse" : "A revoir"}</strong>
            <p>Reponse attendue : <b>${escapeHtmlText(question.answer)}</b>${question.answerText ? ` - ${escapeHtmlText(question.answerText)}` : ""}</p>
            <p>${renderToeicInline(question.explanation || "Pas d'explication disponible.")}</p>
          </div>`
        : `<p class="toeic-hint">Choisis une reponse pour afficher la correction et relier la question a sa fiche.</p>`;

      panel.innerHTML = `
        <article class="toeic-card">
        <div class="toeic-question-heading">
          <div>
            <span class="status-pill">Question ${question.id}</span>
            <h4>${escapeHtmlText(question.theme || question.section || "Entrainement TOEIC")}</h4>
          </div>
          <span>${currentIndex + 1} / ${visible.length}</span>
        </div>
        <div class="toeic-stem">${renderToeicMarkdown(question.stem)}</div>
        <div class="toeic-options">
          ${question.options.map((option) => {
            const classes = ["toeic-option"];
            if (answered && option.letter === question.answer) classes.push("is-correct");
            if (answered && option.letter === selected && selected !== question.answer) classes.push("is-selected-wrong");
            if (!answered && option.letter === selected) classes.push("is-selected");
            return `<button type="button" class="${classes.join(" ")}" data-toeic-answer="${escapeHtmlText(option.letter)}">
              <span>${escapeHtmlText(option.letter)}</span>
              <strong>${escapeHtmlText(option.text)}</strong>
            </button>`;
          }).join("")}
        </div>
        ${correction}
        <div class="toeic-card-actions">
          <button type="button" class="ghost-button" data-toeic-help>${helpOpen ? "Masquer la fiche" : "Help"}</button>
          <button type="button" data-toeic-next>Next</button>
        </div>
        ${helpOpen ? renderFicheHtml(question) : ""}
        </article>
      `;

      panel.querySelectorAll("[data-toeic-answer]").forEach((button) => {
        button.addEventListener("click", () => {
          answers[question.id] = button.dataset.toeicAnswer;
          save();
          renderAll();
        });
      });
      panel.querySelector("[data-toeic-help]")?.addEventListener("click", () => {
        helpOpen = !helpOpen;
        renderQuestion();
      });
      panel.querySelector("[data-toeic-next]")?.addEventListener("click", () => {
        const nextSet = currentQuestionSet();
        if (nextSet.length) currentIndex = (currentIndex + 1) % nextSet.length;
        helpOpen = false;
        renderAll();
      });
    };

    function renderAll() {
      renderScore();
      renderQuestion();
    }

    [modeSelect, ficheSelect].forEach((control) => control.addEventListener("input", () => {
      currentIndex = 0;
      helpOpen = false;
      renderAll();
    }));
    resetButton.addEventListener("click", () => {
      answers = {};
      currentIndex = 0;
      helpOpen = false;
      save();
      renderAll();
    });

    renderAll();
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
initRPlaygrounds();
initToeicQuizzes();
initCPlaygrounds();
initCodeCopyButtons();
initLinuxPlaygrounds();
initRiscvPlaygrounds();
