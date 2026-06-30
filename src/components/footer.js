/**
 * Footer component
 */
export function renderFooter() {
  document.getElementById("footer").innerHTML = [
    '<div class="footer-links">',
    '  <a class="footer-link" href="https://github.com" target="_blank" rel="noopener">⭐ GitHub Star</a>',
    '  <a class="footer-link" href="https://ko-fi.com" target="_blank" rel="noopener">☕ 请喝咖啡</a>',
    '  <a class="footer-link" href="https://afdian.com" target="_blank" rel="noopener">❤️ 爱发电支持</a>',
    "</div>",
    '<div class="footer-text">DevBox - 免费在线开发者工具箱 | 所有工具在浏览器本地运行，不上传任何数据</div>'
  ].join("\n")
}

export function updateFooterGitHub(repoUrl) {
  // Update GitHub link if we have a real repo URL
  var link = document.querySelector(".footer-link[href*='github.com']")
  if (link) link.href = repoUrl
}
