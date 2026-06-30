/**
 * CSS Gradient Generator
 */
import { createToolPage, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">' +
      '<div><label class="tool-label">颜色 1</label><input type="color" id="gg-color1" class="tool-input" value="#6366f1" style="height:40px;padding:2px"></div>' +
      '<div><label class="tool-label">颜色 2</label><input type="color" id="gg-color2" class="tool-input" value="#ec4899" style="height:40px;padding:2px"></div>' +
    "</div>" +
    '<div class="input-group">' +
      '<label class="tool-label">方向</label>' +
      '<select id="gg-direction" class="tool-select">' +
        '<option value="to right">→ 从左到右</option>' +
        '<option value="to bottom">↓ 从上到下</option>' +
        '<option value="to bottom right">↘ 左上到右下</option>' +
        '<option value="to top right">↗ 左下到右上</option>' +
        '<option value="45deg">45°</option>' +
        '<option value="135deg">135°</option>' +
        '<option value="circle">圆形渐变</option>' +
      "</select>" +
    "</div>" +
    '<div id="gg-preview" style="height:120px;border-radius:8px;margin:8px 0;border:1px solid var(--border)"></div>' +
    createOutputGroup("CSS 代码", "gg-output")
  var page = createToolPage("CSS 渐变生成器", "可视化生成 CSS linear-gradient 和 radial-gradient，支持多种方向和颜色", html)
  container.appendChild(page)
}

export function setup() {
  var c1 = document.getElementById("gg-color1")
  var c2 = document.getElementById("gg-color2")
  var dir = document.getElementById("gg-direction")
  var prev = document.getElementById("gg-preview")
  var output = document.getElementById("gg-output")

  function update() {
    var d = dir.value
    var css = d === "circle"
      ? "radial-gradient(circle, " + c1.value + ", " + c2.value + ")"
      : "linear-gradient(" + d + ", " + c1.value + ", " + c2.value + ")"
    prev.style.background = css
    output.value = "background: " + css + ";"
  }

  c1.addEventListener("input", update)
  c2.addEventListener("input", update)
  dir.addEventListener("change", update)
  update()
  setupCopyButtons(document.getElementById("content"))
}
