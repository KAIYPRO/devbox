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
  { id: "jwt-decoder", icon: "JWT", label: "JWT 解码器" },
  { id: "lorem-ipsum", icon: "¶", label: "Lorem Ipsum" },
]

export function renderSidebar() {
  var sidebar = document.getElementById("sidebar")
  var html = TOOLS.map(function(t) {
    return '<a class=\"sidebar-item\" data-tool=\"' + t.id + '\" href=\"#' + t.id + '\">' +
      '<span class=\"sidebar-item-icon\">' + t.icon + '</span>' +
      t.label +
    "</a>"
  }).join("\n")
  sidebar.innerHTML = '<div class=\"sidebar-section\"><div class=\"sidebar-section-title\">工具</div>' + html + "</div>"
}

export { TOOLS }
