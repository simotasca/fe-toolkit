function getTheme() {
  return localStorage.theme === "dark" || 
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
}

function applyTheme() {
  document.documentElement.dataset.theme = getTheme();
}

/** @param {"light" | "dark"} theme */
function setTheme(theme) {
  localStorage.theme = theme;
  applyTheme();
}

applyTheme();