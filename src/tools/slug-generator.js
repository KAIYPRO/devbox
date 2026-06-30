/**
 * URL Slug Generator
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function slugify(text, opts) {
  opts = opts || {}
  var s = text.toLowerCase().trim()
  s = s.replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
       .replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n")
       .replace(/[^a-z0-9\s-]/g, "")
  if (opts.underscore) return s.replace(/\s+/g, "_").replace(/-+/g, "_").replace(/^_+|_+$/g, "")
  return s.replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "")
}

export function render(container) {
  var html =
    createInputGroup("输入文本", "slug-input", { placeholder: "输入标题或文本，如: Hello World! 你好" }) +
    '<div style="margin:6px 0">' +
      '<label><input type="checkbox" id="slug-underscore"> 使用下划线代替连字符</label>' +
    "</div>" +
    '<div class="btn-group" style="margin:8px 0">' +
      '<button class="btn btn-primary" id="slug-gen">生成 Slug</button>' +
      '<button class="btn" id="slug-clear">清空</button>' +
    "</div>" +
    createOutputGroup("URL Slug", "slug-output")
  var page = createToolPage("URL Slug 生成器", "将标题或文本转换为 URL 友好的 slug（支持中文转拼音和特殊字符过滤）", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("slug-input")
  var output = document.getElementById("slug-output")
  var underscore = document.getElementById("slug-underscore")

  document.getElementById("slug-gen").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    output.value = slugify(input.value, { underscore: underscore.checked })
  })
  document.getElementById("slug-clear").addEventListener("click", function() { output.value = "" })
  input.addEventListener("keydown", function(e) { if (e.key === "Enter") document.getElementById("slug-gen").click() })
  setupCopyButtons(document.getElementById("content"))
}
