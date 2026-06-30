import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="b64-encode">编码 &rarr;</button>' +
      '<button class="btn btn-secondary" id="b64-decode">解码 &larr;</button>' +
      '<select class="tool-select" id="b64-encoding" style="width:auto;min-width:100px">' +
        "<option value=\"utf8\">UTF-8</option>" +
        "<option value=\"hex\">Hex</option>" +
      "</select>" +
    "</div>" +
    createInputGroup("输入", "b64-input", { placeholder: "输入文本或 Base64" }) +
    createOutputGroup("输出", "b64-output")
  var page = createToolPage("Base64 编解码", "Base64 编码与解码，支持 UTF-8 和 Hex", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("b64-input")
  var output = document.getElementById("b64-output")
  var encoding = document.getElementById("b64-encoding")

  document.getElementById("b64-encode").addEventListener("click", function() {
    try {
      var text = input.value
      if (encoding.value === "hex") {
        var hex = ""
        for (var i = 0; i < text.length; i++) {
          hex += text.charCodeAt(i).toString(16).padStart(2, "0")
        }
        output.value = btoa(hex)
      } else {
        output.value = btoa(unescape(encodeURIComponent(text)))
      }
    } catch (e) { output.value = "编码错误: " + e.message }
  })

  document.getElementById("b64-decode").addEventListener("click", function() {
    try {
      var decoded = atob(input.value)
      if (encoding.value === "hex") {
        var str = ""
        for (var i = 0; i < decoded.length; i += 2) {
          str += String.fromCharCode(parseInt(decoded.substr(i, 2), 16))
        }
        output.value = str
      } else {
        output.value = decodeURIComponent(escape(decoded))
      }
    } catch (e) { output.value = "解码错误: " + e.message }
  })

  setupCopyButtons(document.getElementById("content"))
}
