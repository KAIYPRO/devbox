/**
 * UUID/GUID Generator
 */
import { createToolPage, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function generateBulk(count) {
  var result = []
  for (var i = 0; i < count; i++) result.push(crypto.randomUUID())
  return result.join("\n")
}

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="uuid-v4">生成 UUID v4</button>' +
      '<button class="btn btn-secondary" id="uuid-v4-up">大写</button>' +
      '<button class="btn" id="uuid-bulk">批量 10 个</button>' +
      '<button class="btn" id="uuid-clear" style="float:right">清空</button>' +
    "</div>" +
    '<label class="tool-label">数量</label>' +
    '<input type="number" id="uuid-count" class="tool-input" value="1" min="1" max="100" style="width:70px;margin-bottom:8px">' +
    createOutputGroup("结果", "uuid-output")
  var page = createToolPage("UUID 生成器", "生成 UUID v4 / GUID，支持批量", html)
  container.appendChild(page)
}

export function setup() {
  var output = document.getElementById("uuid-output")
  var countInput = document.getElementById("uuid-count")

  document.getElementById("uuid-v4").addEventListener("click", function() {
    var c = parseInt(countInput.value) || 1
    output.value = c <= 1 ? crypto.randomUUID() : generateBulk(c)
  })
  document.getElementById("uuid-v4-up").addEventListener("click", function() {
    var c = parseInt(countInput.value) || 1
    output.value = c <= 1 ? crypto.randomUUID().toUpperCase() : generateBulk(c).toUpperCase()
  })
  document.getElementById("uuid-bulk").addEventListener("click", function() { output.value = generateBulk(10) })
  document.getElementById("uuid-clear").addEventListener("click", function() { output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
