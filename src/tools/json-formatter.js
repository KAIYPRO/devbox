import { createToolPage, createInputGroup, createOutputGroup, setupLiveTransform } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  const html = createInputGroup("输入 JSON", "json-input", { placeholder: "粘贴 JSON 字符串..." }) +
    '<div class="btn-group" style="margin: 8px 0">' +
      '<button class="btn btn-primary" id="json-format">格式化</button>' +
      '<button class="btn btn-secondary" id="json-minify">压缩</button>' +
      '<button class="btn btn-secondary" id="json-validate">验证</button>' +
    "</div>" +
    '<div id="json-status" class="status-msg"></div>' +
    createOutputGroup("输出", "json-output")
  const page = createToolPage("JSON 格式化", "格式化、压缩、验证 JSON 数据", html)
  container.appendChild(page)
}

export function setup() {
  const input = document.getElementById("json-input")
  const output = document.getElementById("json-output")
  const status = document.getElementById("json-status")
  if (!input || !output) return

  function format() {
    try {
      const parsed = JSON.parse(input.value)
      output.value = JSON.stringify(parsed, null, 2)
      status.className = "status-msg show success"
      status.textContent = "JSON 格式有效 ✓"
    } catch (e) {
      output.value = ""
      status.className = "status-msg show error"
      status.textContent = "JSON 格式无效: " + e.message
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input.value)
      output.value = JSON.stringify(parsed)
      status.className = "status-msg show success"
      status.textContent = "压缩成功 ✓"
    } catch (e) {
      status.className = "status-msg show error"
      status.textContent = "JSON 无效: " + e.message
    }
  }

  function validate() {
    try {
      JSON.parse(input.value)
      status.className = "status-msg show success"
      status.textContent = "✓ JSON 格式有效"
    } catch (e) {
      status.className = "status-msg show error"
      status.textContent = "✗ JSON 无效: " + e.message
    }
  }

  document.getElementById("json-format").addEventListener("click", format)
  document.getElementById("json-minify").addEventListener("click", minify)
  document.getElementById("json-validate").addEventListener("click", validate)
  setupCopyButtons(document.getElementById("content"))
}
