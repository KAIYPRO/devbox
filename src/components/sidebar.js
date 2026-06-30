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
]

export function renderSidebar() {
  var sidebar = document.getElementById("sidebar")
  var html = TOOLS.map(function(t) {
    return '<a class="sidebar-item" data-tool="' + t.id + '" href="#' + t.id + '">' +
      '<span class="sidebar-item-icon">' + t.icon + '</span>' +
      t.label +
    "</a>"
  }).join("\n")
  sidebar.innerHTML = '<div class="sidebar-section"><div class="sidebar-section-title">工具</div>' + html + "</div>"
}

export { TOOLS }
