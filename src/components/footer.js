/**
 * Footer component
 */
export function renderFooter() {
  document.getElementById('footer').innerHTML = [
    '<div class="footer-links">',
    '  <a class="footer-link" href="https://github.com/KAIYPRO/devbox" target="_blank" rel="noopener">⭐ GitHub Star</a>',
    '  <a class="footer-link" href="https://github.com/KAIYPRO/devbox/issues" target="_blank" rel="noopener">💬 反馈建议</a>',
    '</div>',
    '<div class="footer-text">DevBox - 免费在线开发者工具箱 | 所有工具在浏览器本地运行，不上传任何数据</div>'
  ].join("\n")
}
