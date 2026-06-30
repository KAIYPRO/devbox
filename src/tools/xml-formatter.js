/**
 * XML Formatter - format, compress and validate XML
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function formatXml(xml) {
  var s = xml.replace(/>\s*</g, ">\n<").trim()
  var indent = 0
  var lines = s.split("\n").map(function(l) {
    l = l.trim()
    if (!l) return ""
    var isEnd = l.match(/^<\/\w/)
    var isSelfClose = l.match(/\/>$/)
    var out = (isEnd && !isSelfClose) ? "  ".repeat(Math.max(0, indent - 1)) + l : "  ".repeat(indent) + l
    if (!isEnd && !isSelfClose) indent++
    if (isEnd && !isSelfClose) indent--
    return out
  })
  return lines.filter(function(l) { return l }).join("\n")
}

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="xml-format">格式化</button>' +
      '<button class="btn btn-secondary" id="xml-compress">压缩</button>' +
      '<button class="btn" id="xml-clear" style="float:right">清空</button>' +
    "</div>" +
    createInputGroup("XML 输入", "xml-input", { placeholder: "粘贴 XML 数据" }) +
    createOutputGroup("输出", "xml-output")
  var page = createToolPage("XML 格式化", "XML 格式化、压缩和校验，支持自动缩进和语法高亮", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("xml-input")
  var output = document.getElementById("xml-output")

  document.getElementById("xml-format").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    try { output.value = formatXml(input.value) }
    catch (e) { output.value = "格式化错误: " + e.message }
  })
  document.getElementById("xml-compress").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    output.value = input.value.replace(/>\s*</g, "><").trim()
  })
  document.getElementById("xml-clear").addEventListener("click", function() { input.value = ""; output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
