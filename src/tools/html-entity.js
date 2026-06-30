/**
 * HTML Entity Encoder/Decoder
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="html-encode">编码 &rarr;</button>' +
      '<button class="btn btn-secondary" id="html-decode">解码 &larr;</button>' +
    "</div>" +
    createInputGroup("输入", "html-input", { placeholder: "输入要编码/解码的文本" }) +
    createOutputGroup("输出", "html-output")
  var page = createToolPage("HTML 实体编解码", "将特殊字符转换为 HTML 实体（编码）或还原为原始字符（解码）", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("html-input")
  var output = document.getElementById("html-output")
  var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }
  var rev = {}
  for (var k in map) rev[map[k]] = k

  document.getElementById("html-encode").addEventListener("click", function() {
    output.value = input.value.replace(/[&<>\"']/g, function(c) { return map[c] })
  })
  document.getElementById("html-decode").addEventListener("click", function() {
    output.value = input.value.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, function(c) { return rev[c] })
  })
  setupCopyButtons(document.getElementById("content"))
}
