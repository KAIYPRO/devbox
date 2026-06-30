import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="url-encode">编码 &rarr;</button>' +
      '<button class="btn btn-secondary" id="url-decode">解码 &larr;</button>' +
    "</div>" +
    createInputGroup("输入", "url-input", { placeholder: "输入 URL 或文本" }) +
    createOutputGroup("输出", "url-output")
  var page = createToolPage("URL 编解码", "URL 编码与解码", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("url-input")
  var output = document.getElementById("url-output")
  document.getElementById("url-encode").addEventListener("click", function() {
    try { output.value = encodeURIComponent(input.value) }
    catch (e) { output.value = "编码错误: " + e.message }
  })
  document.getElementById("url-decode").addEventListener("click", function() {
    try { output.value = decodeURIComponent(input.value) }
    catch (e) { output.value = "解码错误: " + e.message }
  })
  setupCopyButtons(document.getElementById("content"))
}
