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
