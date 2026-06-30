import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    createInputGroup("正则表达式", "regex-pattern", { type: "text", placeholder: "例如: \\d{4}-\\d{2}-\\d{2}" }) +
    createInputGroup("测试文本", "regex-text", { placeholder: "输入要匹配的文本..." }) +
    '<div class="btn-group">' +
      '<button class="btn btn-primary" id="regex-match">匹配</button>' +
      '<label class="tool-label" style="display:inline-flex;align-items:center;gap:4px;margin:0">' +
        '<input type="checkbox" id="regex-global" checked> 全局' +
      "</label>" +
      '<label class="tool-label" style="display:inline-flex;align-items:center;gap:4px;margin:0">' +
        '<input type="checkbox" id="regex-case"> 忽略大小写' +
      "</label>" +
    "</div>" +
    '<div id="regex-status" class="status-msg"></div>' +
    createOutputGroup("匹配结果", "regex-output")
  var page = createToolPage("正则测试", "在线测试正则表达式匹配", html)
  container.appendChild(page)
}

export function setup() {
  document.getElementById("regex-match").addEventListener("click", function() {
    var pattern = document.getElementById("regex-pattern").value
    var text = document.getElementById("regex-text").value
    var output = document.getElementById("regex-output")
    var status = document.getElementById("regex-status")
    if (!pattern) { status.className = "status-msg show error"; status.textContent = "请输入正则表达式"; return }
    try {
      var flags = document.getElementById("regex-global").checked ? "g" : ""
      if (document.getElementById("regex-case").checked) flags += "i"
      var re = new RegExp(pattern, flags)
      var matches = text.match(re)
      if (matches) {
        output.value = "找到 " + matches.length + " 个匹配:\n" + matches.map(function(m, i) { return "[" + i + "] " + m }).join("\n")
      } else {
        output.value = "无匹配结果"
      }
      status.className = "status-msg show success"
      status.textContent = "匹配完成"
    } catch (e) {
      status.className = "status-msg show error"
      status.textContent = "正则错误: " + e.message
    }
  })
  setupCopyButtons(document.getElementById("content"))
}
