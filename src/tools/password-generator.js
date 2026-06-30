/**
 * Password Generator
 */
import { createToolPage, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var LOWER = "abcdefghijklmnopqrstuvwxyz"
var DIGITS = "0123456789"
var SYMBOLS = "!@#\$%^&*()_+-=[]{}|;':\",./<>?"

function generate(len, useUpper, useLower, useDigits, useSymbols) {
  var chars = ""
  if (useUpper) chars += UPPER
  if (useLower) chars += LOWER
  if (useDigits) chars += DIGITS
  if (useSymbols) chars += SYMBOLS
  if (!chars) chars = LOWER + DIGITS
  var result = ""
  for (var i = 0; i < len; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export function render(container) {
  var html =
    '<div class="input-group">' +
      '<label class="tool-label">密码长度</label>' +
      '<input type="range" id="pw-length" min="4" max="64" value="16" style="width:200px;vertical-align:middle">' +
      ' <span id="pw-length-val">16</span>' +
    "</div>" +
    '<div class="checkbox-group" style="margin:8px 0">' +
      '<label><input type="checkbox" id="pw-upper" checked> 大写 (A-Z)</label>&nbsp;' +
      '<label><input type="checkbox" id="pw-lower" checked> 小写 (a-z)</label>&nbsp;' +
      '<label><input type="checkbox" id="pw-digits" checked> 数字 (0-9)</label>&nbsp;' +
      '<label><input type="checkbox" id="pw-symbols"> 符号 (!@#\$)</label>' +
    "</div>" +
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="pw-generate">生成密码</button>' +
      '<button class="btn" id="pw-clear">清空</button>' +
    "</div>" +
    createOutputGroup("密码", "pw-output")
  var page = createToolPage("密码生成器", "生成高强度随机密码，可自定义字符集", html)
  container.appendChild(page)
}

export function setup() {
  var output = document.getElementById("pw-output")
  var lenSlider = document.getElementById("pw-length")
  var lenVal = document.getElementById("pw-length-val")

  lenSlider.addEventListener("input", function() { lenVal.textContent = lenSlider.value })

  document.getElementById("pw-generate").addEventListener("click", function() {
    output.value = generate(
      parseInt(lenSlider.value),
      document.getElementById("pw-upper").checked,
      document.getElementById("pw-lower").checked,
      document.getElementById("pw-digits").checked,
      document.getElementById("pw-symbols").checked
    )
  })
  document.getElementById("pw-clear").addEventListener("click", function() { output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
