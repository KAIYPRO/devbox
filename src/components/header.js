/**
 * Header component
 */
export function renderHeader() {
  var header = document.getElementById("header")
  header.innerHTML = [
    '<div class="header-left">',
    '  <div class="header-logo">D</div>',
    '  <span class="header-title">DevBox</span>',
    '  <span class="header-subtitle">开发者工具箱</span>',
    "</div>",
    '<div class="header-actions">',
    '  <button class="theme-toggle" id="theme-toggle" title="切换主题">🌙</button>',
    "</div>"
  ].join("\n")
}

export function setupHeader(router) {
  document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("light")
    var isLight = document.body.classList.contains("light")
    this.textContent = isLight ? "☀️" : "🌙"
    localStorage.setItem("devbox-theme", isLight ? "light" : "dark")
  })
  // Restore theme preference
  var saved = localStorage.getItem("devbox-theme")
  if (saved === "light") {
    document.body.classList.add("light")
    document.getElementById("theme-toggle").textContent = "☀️"
  }
}
