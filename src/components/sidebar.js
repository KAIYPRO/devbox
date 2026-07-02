/**
 * Sidebar component
 */
var TOOLS = [
  { id: "json-formatter", icon: "{ }", label: "JSON 格式化" },
  { id: "timestamp", icon: "🕐", label: "时间戳转换" },
  { id: "base64", icon: "🔏", label: "Base64 编解码" },
  { id: "url-encoder", icon: "🔗", label: "URL 编解码" },
  { id: "regex-tester", icon: "※", label: "正则测试" },
  { id: "text-diff", icon: "⇄", label: "文本差异对比" },
  { id: "color-converter", icon: "🎨", label: "颜色转换" },
  { id: "uuid-generator", icon: "◇", label: "UUID 生成器" },
  { id: "password-generator", icon: "🔑", label: "密码生成器" },
  { id: "hash-generator", icon: "#", label: "哈希生成器" },
  { id: "html-entity", icon: "&lt;", label: "HTML 实体编解码" },
  { id: "number-base", icon: "0x", label: "进制转换" },
  { id: "string-case", icon: "Aa", label: "字符串格式转换" },
  { id: "jwt-decoder", icon: "🔐", label: "JWT 解码器" },
  { id: "lorem-ipsum", icon: "¶", label: "Lorem Ipsum" },
  { id: "img-base64", icon: "🖼", label: "图片转 Base64" },
  { id: "slug-generator", icon: "🔤", label: "URL Slug" },
  { id: "csv-json", icon: "⇆", label: "CSV / JSON" },
  { id: "ua-parser", icon: "🌐", label: "UA 解析" },
  { id: "text-counter", icon: "∑", label: "文本统计" },
  { id: "css-minifier", icon: "✂", label: "CSS 压缩" },
  { id: "html-preview", icon: "▶", label: "HTML 预览" },
  { id: "sql-formatter", icon: "SQL", label: "SQL 格式化" },
  { id: "xml-formatter", icon: "&lt;/&gt;", label: "XML 格式化" },
  { id: "http-status", icon: "🌐", label: "HTTP 状态码" },
  { id: "line-tools", icon: "≡", label: "行处理工具" },
  { id: "css-gradient", icon: "🎨", label: "渐变生成器" },
]

var BOTTOM_LINKS = [
  { id: "donate", icon: "❤️", label: "支持开发者" },
  { id: "github", icon: "⭐", label: "GitHub" },
]

export function renderSidebar() {
  var sidebar = document.getElementById("sidebar")
  var toolHtml = TOOLS.map(function(t) {
    return '<a class="sidebar-item" data-tool="' + t.id + '" href="#' + t.id + '">' +
      '<span class="sidebar-item-icon">' + t.icon + '</span>' +
      t.label +
    "</a>"
  }).join("\n")
  var bottomHtml = BOTTOM_LINKS.map(function(b) {
    if (b.id === "github") {
      return '<a class="sidebar-item" href="https://github.com/KAIYPRO/devbox" target="_blank" rel="noopener">' +
        '<span class="sidebar-item-icon">' + b.icon + '</span>' + b.label + "</a>"
    }
    return '<a class="sidebar-item" id="donate-btn" href="javascript:void(0)">' +
      '<span class="sidebar-item-icon">' + b.icon + '</span>' + b.label + "</a>"
  }).join("\n")
  sidebar.innerHTML =
    '<div class="sidebar-section"><div class="sidebar-section-title">工具</div>' + toolHtml + "</div>" +
    '<div class="sidebar-section" style="margin-top:auto;border-top:1px solid var(--border);padding-top:8px">' + bottomHtml + "</div>"
  sidebar.innerHTML =
    '<div class="sidebar-section">' +
    '<div class="sidebar-search"><input type="text" id="tool-search" class="tool-input" placeholder="搜索工具..." style="font-size:12px;padding:6px 8px;margin-bottom:6px;width:100%;box-sizing:border-box"></div>' +
    '<div class="sidebar-section-title">工具</div>' + toolHtml + "</div>" +
    '<div class="sidebar-section" style="margin-top:auto;border-top:1px solid var(--border);padding-top:8px">' + bottomHtml + "</div>"

  // Tool search filter
  function filterTools(query) {
    query = query.toLowerCase()
    sidebar.querySelectorAll(".sidebar-item[data-tool]").forEach(function(el) {
      el.style.display = (!query || el.textContent.toLowerCase().indexOf(query) !== -1) ? "" : "none"
    })
  }
  sidebar.addEventListener("input", function(e) {
    if (e.target.id === "tool-search") filterTools(e.target.value)
  })


  // Bind donate click via event delegation
  sidebar.addEventListener("click", function(e) {
    var target = e.target.closest("#donate-btn")
    if (target) showDonateModal()
  })
}

export function showDonateModal() {
  var existing = document.querySelector(".donate-modal-overlay")
  if (existing) { existing.remove(); return }
  var overlay = document.createElement("div")
  overlay.className = "donate-modal-overlay"
  overlay.innerHTML =
    '<div class="donate-modal">' +
    '<button class="donate-close" id="donate-close">&times;</button>' +
    '<h3 style="margin:0 0 12px 0">支持 DevBox 开发</h3>' +
    '<p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">如果 DevBox 对你有帮助，请开发者喝杯咖啡 ☕</p>' +
    '<div class="donate-qr-placeholder">' +
    '  <div class="donate-qr-box"><img src="./wechat-pay.png" style="width:150px;height:150px;border-radius:8px;display:block" alt="微信收款码"></div>' +
    '  <div class="donate-qr-box"><img src="./alipay.jpg" style="width:150px;height:150px;border-radius:8px;display:block" alt="支付宝收款码"></div>' +
    '</div>' +
    '<p style="font-size:11px;color:var(--text-muted);margin-top:12px">你的支持让这个工具箱变得更好 ❤️</p>' +
    '</div>'
  document.body.appendChild(overlay)
  overlay.addEventListener("click", function(e) { if (e.target === overlay) overlay.remove() })
  document.getElementById("donate-close").addEventListener("click", function() { overlay.remove() })
}

export { TOOLS }
