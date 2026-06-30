/**
 * JWT Decoder (decode header + payload without verification)
 */
import { createToolPage, createInputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    createInputGroup("JWT Token", "jwt-input", { placeholder: "粘贴 JWT token，如: eyJhbGciOiJIUzI1NiIs..." }) +
    '<div class="btn-group" style="margin:8px 0"><button class="btn btn-primary" id="jwt-decode">解码</button><button class="btn" id="jwt-clear">清空</button></div>' +
    '<div class="output-group"><div class="tool-label">Header (头部)</div><pre id="jwt-header" class="tool-pre" style="background:#1e1e2e;border:1px solid #313244;border-radius:6px;padding:10px;overflow:auto;white-space:pre-wrap;min-height:40px"></pre></div>' +
    '<div class="output-group"><div class="tool-label">Payload (载荷)</div><pre id="jwt-payload" class="tool-pre" style="background:#1e1e2e;border:1px solid #313244;border-radius:6px;padding:10px;overflow:auto;white-space:pre-wrap;min-height:80px"></pre></div>' +
    '<div class="output-group"><div class="tool-label">签名 (Signature)</div><pre id="jwt-sig" class="tool-pre" style="background:#1e1e2e;border:1px solid #313244;border-radius:6px;padding:10px;overflow:auto;white-space:pre-wrap;min-height:30px;word-break:break-all"></pre></div>'
  var page = createToolPage("JWT 解码器", "解码 JWT Token 的 Header 和 Payload（不验证签名）", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("jwt-input")
  var headerEl = document.getElementById("jwt-header")
  var payloadEl = document.getElementById("jwt-payload")
  var sigEl = document.getElementById("jwt-sig")

  function decode() {
    var parts = input.value.trim().split(".")
    if (parts.length !== 3) {
      headerEl.textContent = payloadEl.textContent = sigEl.textContent = "无效 JWT（需要三部分）"
      return
    }
    try {
      var h = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")))
      var p = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")))
      headerEl.textContent = JSON.stringify(h, null, 2)
      payloadEl.textContent = JSON.stringify(p, null, 2)
      sigEl.textContent = parts[2]
    } catch (e) {
      headerEl.textContent = payloadEl.textContent = sigEl.textContent = "解码失败: " + e.message
    }
  }

  document.getElementById("jwt-decode").addEventListener("click", decode)
  document.getElementById("jwt-clear").addEventListener("click", function() {
    input.value = ""; headerEl.textContent = payloadEl.textContent = sigEl.textContent = ""
  })
}
