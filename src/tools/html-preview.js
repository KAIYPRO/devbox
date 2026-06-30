/**
 * HTML Preview - live HTML/CSS preview
 */
import { createToolPage, createInputGroup } from "./helpers.js"

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="hp-preview">渲染预览</button>' +
      '<button class="btn" id="hp-clear">清空</button>' +
    "</div>" +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-height:300px">' +
    '  <div>' +
    '    <label class="tool-label">HTML</label>' +
    '    <textarea id="hp-html" class="tool-textarea" placeholder="输入 HTML" style="min-height:280px;font-family:monospace;font-size:13px"></textarea>' +
    '  </div>' +
    '  <div>' +
    '    <label class="tool-label">CSS</label>' +
    '    <textarea id="hp-css" class="tool-textarea" placeholder="输入 CSS（可选）" style="min-height:280px;font-family:monospace;font-size:13px"></textarea>' +
    '  </div>' +
    "</div>" +
    '<label class="tool-label" style="margin-top:8px">预览结果</label>' +
    '<iframe id="hp-iframe" style="width:100%;height:300px;background:white;border:1px solid var(--border);border-radius:6px"></iframe>'
  var page = createToolPage("HTML 在线预览", "实时预览 HTML + CSS 渲染效果，适合调试页面布局和样式", html)
  container.appendChild(page)
}

export function setup() {
  var htmlInput = document.getElementById("hp-html")
  var cssInput = document.getElementById("hp-css")
  var iframe = document.getElementById("hp-iframe")

  function render() {
    var doc = iframe.contentDocument || iframe.contentWindow.document
    doc.open()
    doc.write("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><style>" + (cssInput.value || "") + "</style></head><body>" + (htmlInput.value || "") + "</body></html>")
    doc.close()
  }

  document.getElementById("hp-preview").addEventListener("click", render)
  document.getElementById("hp-clear").addEventListener("click", function() { htmlInput.value = ""; cssInput.value = ""; render() })
  render()
}
