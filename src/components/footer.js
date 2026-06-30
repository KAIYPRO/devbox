/**
 * Footer component
 */
export function renderFooter() {
  document.getElementById("footer").innerHTML = [
    '<div class="footer-links">',
    '  <span class="footer-link footer-share" title="分享给朋友">📤 分享</span>',
    '  <a class="footer-link" href="https://github.com/KAIYPRO/devbox" target="_blank" rel="noopener">⭐ GitHub Star</a>',
    '  <a class="footer-link" href="https://github.com/KAIYPRO/devbox/issues" target="_blank" rel="noopener">💬 反馈</a>',
    "</div>",
    '<div class="footer-text">DevBox - 免费在线开发者工具箱 | 所有工具在浏览器本地运行</div>',
    '<div class="footer-recs" style="font-size:11px;color:var(--text-muted);margin-top:6px">',
    '  推荐: <a href="https://www.aliyun.com/" target="_blank" rel="noopener" style="color:var(--text-muted)">阿里云</a> · <a href="https://cloud.tencent.com/" target="_blank" rel="noopener" style="color:var(--text-muted)">腾讯云</a> · <a href="https://www.digitalocean.com/" target="_blank" rel="noopener" style="color:var(--text-muted)">DigitalOcean</a>',
    "</div>"
  ].join("\n")

  setTimeout(function() {
    var shareBtn = document.querySelector(".footer-share")
    if (shareBtn) shareBtn.addEventListener("click", showShareModal)
  }, 100)
}

function showShareModal() {
  var url = encodeURIComponent("https://kaiypro.github.io/devbox/")
  var text = encodeURIComponent("DevBox - 免费在线开发者工具箱，27个实用工具，推荐给开发者！")
  var overlay = document.createElement("div")
  overlay.className = "donate-modal-overlay"
  overlay.innerHTML =
    '<div class="donate-modal">' +
    '<button class="donate-close" id="share-close">&times;</button>' +
    '<h3 style="margin:0 0 12px 0">分享 DevBox</h3>' +
    '<div style="display:flex;flex-direction:column;gap:8px">' +
    '  <a class="btn btn-primary" href="https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" rel="noopener" style="text-decoration:none;text-align:center">🐦 Twitter / X</a>' +
    '  <a class="btn" href="https://service.weibo.com/share/share.php?url=' + url + '&title=' + text + '" target="_blank" rel="noopener" style="text-decoration:none;text-align:center">🇨🇳 微博</a>' +
    '  <button class="btn" id="share-wechat" style="cursor:pointer">💬 微信</button>' +
    '  <button class="btn" id="share-copy" style="cursor:pointer">📋 复制链接</button>' +
    "</div>" +
    "</div>"
  document.body.appendChild(overlay)
  overlay.addEventListener("click", function(e) { if (e.target === overlay) overlay.remove() })
  document.getElementById("share-close").addEventListener("click", function() { overlay.remove() })
  document.getElementById("share-copy").addEventListener("click", async function() {
    try {
      await navigator.clipboard.writeText("https://kaiypro.github.io/devbox/")
      this.textContent = "✅ 已复制！"
      setTimeout(function() { this.textContent = "📋 复制链接" }.bind(this), 2000)
    } catch (e) { alert("复制失败，请手动复制") }
  })
  document.getElementById("share-wechat").addEventListener("click", async function() {
    var msg = "DevBox - 免费在线开发者工具箱 🧰\n27 个实用工具，全浏览器本地运行，不上传任何数据。\n\n👉 https://kaiypro.github.io/devbox/"
    try {
      await navigator.clipboard.writeText(msg)
      this.textContent = "✅ 文案已复制，去微信粘贴发送！"
      setTimeout(function() { this.textContent = "💬 微信" }.bind(this), 3000)
    } catch (e) { alert("复制失败，请手动复制") }
  })
}