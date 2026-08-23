const body = document.body;
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const exercises = Array.from(document.querySelectorAll("[data-exercise]"));

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
updateProgress();
