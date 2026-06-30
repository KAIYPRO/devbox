/**
 * Text Counter - character/word/line/sentence statistics
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    createInputGroup("CSS 代码", "css-input", { placeholder: "粘贴 CSS 代码..." }) +
    '<div class="btn-group" style="margin:8px 0">' +
      '<button class="btn btn-primary" id="css-minify">压缩</button>' +
      '<button class="btn" id="css-clear">清空</button>' +
    "</div>" +
    '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">原始: <span id="css-before">0</span> 字节 &rarr; 压缩后: <span id="css-after">0</span> 字节 (<span id="css-ratio">0</span>%)</div>' +
    createOutputGroup("压缩结果", "css-output")
  var page = createToolPage("CSS 压缩", "移除 CSS 中的空格、注释和换行，减小文件体积", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("css-input")
  var output = document.getElementById("css-output")

  document.getElementById("css-minify").addEventListener("click", function() {
    var css = input.value
    if (!css) { output.value = ""; return }
    var before = css.length
    var min = css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s*([{}:;,])\s*/g, "")
      .replace(/;\s*}/g, "}")
      .replace(/\/\//g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
    output.value = min
    document.getElementById("css-before").textContent = before
    document.getElementById("css-after").textContent = min.length
    document.getElementById("css-ratio").textContent = before > 0 ? ((1 - min.length / before) * 100).toFixed(1) : "0"
  })
  document.getElementById("css-clear").addEventListener("click", function() {
    input.value = ""; output.value = ""
    document.getElementById("css-before").textContent = "0"
    document.getElementById("css-after").textContent = "0"
    document.getElementById("css-ratio").textContent = "0"
  })
  setupCopyButtons(document.getElementById("content"))
}
