/**
 * Hash Generator (MD5/SHA1/SHA256/SHA512)
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

async function hash(algo, text) {
  var enc = new TextEncoder()
  var buf = await crypto.subtle.digest(algo, enc.encode(text))
  var hex = Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2, "0") }).join("")
  return hex
}

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="hash-md5">MD5</button>' +
      '<button class="btn" id="hash-sha1">SHA-1</button>' +
      '<button class="btn" id="hash-sha256">SHA-256</button>' +
      '<button class="btn" id="hash-sha512">SHA-512</button>' +
    "</div>" +
    createInputGroup("输入文本", "hash-input", { placeholder: "输入要哈希的文本" }) +
    createOutputGroup("哈希值 (Hex)", "hash-output")
  var page = createToolPage("哈希生成器", "计算 MD5 / SHA-1 / SHA-256 / SHA-512 哈希值", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("hash-input")
  var output = document.getElementById("hash-output")

  async function compute(algo) {
    if (!input.value) { output.value = ""; return }
    try {
      var display = { "MD5": "MD5", "SHA-1": "SHA-1", "SHA-256": "SHA-256", "SHA-512": "SHA-512" }
      var result = await hash(algo, input.value)
      output.value = result
    } catch (e) { output.value = "错误: " + e.message }
  }

  document.getElementById("hash-md5").addEventListener("click", function() { compute("MD5") })
  document.getElementById("hash-sha1").addEventListener("click", function() { compute("SHA-1") })
  document.getElementById("hash-sha256").addEventListener("click", function() { compute("SHA-256") })
  document.getElementById("hash-sha512").addEventListener("click", function() { compute("SHA-512") })
  setupCopyButtons(document.getElementById("content"))
}
