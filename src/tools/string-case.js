/**
 * String Case Converter (camelCase, snake_case, kebab-case, etc.)
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function toWords(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

var converters = {
  camel: function(s) { return toWords(s).replace(/ (.)/g, function(_, c) { return c.toUpperCase() }) },
  pascal: function(s) { var w = toWords(s); return w.charAt(0).toUpperCase() + w.slice(1).replace(/ (.)/g, function(_, c) { return c.toUpperCase() }) },
  snake: function(s) { return toWords(s).replace(/ /g, "_") },
  kebab: function(s) { return toWords(s).replace(/ /g, "-") },
  upper: function(s) { return toWords(s).replace(/ /g, "_").toUpperCase() },
  lower: function(s) { return toWords(s).replace(/ /g, "") },
  title: function(s) { return toWords(s).replace(/\b(.)/g, function(_, c) { return c.toUpperCase() }) },
}

export function render(container) {
  var html =
    createInputGroup("输入字符串", "sc-input", { placeholder: "如: hello_world / helloWorld / HelloWorld" }) +
    '<div class="btn-group" style="margin:8px 0;flex-wrap:wrap">' +
      '<button class="btn btn-primary" data-case="camel">camelCase</button>' +
      '<button class="btn" data-case="pascal">PascalCase</button>' +
      '<button class="btn" data-case="snake">snake_case</button>' +
      '<button class="btn" data-case="kebab">kebab-case</button>' +
      '<button class="btn" data-case="upper">UPPER_CASE</button>' +
      '<button class="btn" data-case="lower"> lowercase</button>' +
      '<button class="btn" data-case="title">Title Case</button>' +
    "</div>" +
    createOutputGroup("转换结果", "sc-output")
  var page = createToolPage("字符串格式转换", "在 camelCase、PascalCase、snake_case、kebab-case 等格式之间转换", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("sc-input")
  var output = document.getElementById("sc-output")

  document.querySelectorAll("[data-case]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      if (!input.value) { output.value = ""; return }
      output.value = converters[btn.dataset.case](input.value)
    })
  })
  setupCopyButtons(document.getElementById("content"))
}
