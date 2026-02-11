const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const isReload = () => {
  const entries = performance.getEntriesByType("navigation");
  return entries.length > 0 ? entries[0].type === "reload" : performance.navigation.type === 1;
};

window.addEventListener("load", () => {
  if (window.location.hash && isReload()) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
});

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.querySelector(".toggle-icon").textContent = isDark ? "🌙" : "☀️";
};

if (storedTheme) {
  applyTheme(storedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));
