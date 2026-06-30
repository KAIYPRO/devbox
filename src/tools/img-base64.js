/**
 * Image to Base64 Converter
 */
import { createToolPage, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    '<div class="input-group">' +
      '<label class="tool-label">选择图片</label>' +
      '<input type="file" id="img-input" accept="image/*" class="tool-input" style="padding:8px">' +
    "</div>" +
    '<div class="btn-group" style="margin:8px 0">' +
      '<button class="btn btn-primary" id="img-clear">清空</button>' +
    "</div>" +
    '<div id="img-preview" style="max-width:200px;margin-bottom:8px;display:none"></div>' +
    '<div class="input-group">' +
      '<label class="tool-label">图片信息</label>' +
      '<div id="img-info" style="font-size:13px;color:var(--text-secondary);padding:8px;background:var(--bg-tertiary);border-radius:6px"></div>' +
    "</div>" +
    createOutputGroup("Base64 数据", "img-output")
  var page = createToolPage("图片转 Base64", "将图片转换为 Base64 编码，支持 PNG、JPG、GIF、WebP 等格式", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("img-input")
  var output = document.getElementById("img-output")
  var preview = document.getElementById("img-preview")
  var info = document.getElementById("img-info")

  input.addEventListener("change", function() {
    var file = input.files[0]
    if (!file) return
    var reader = new FileReader()
    reader.onload = function(e) {
      var data = e.target.result
      output.value = data
      preview.innerHTML = '<img src="' + data + '" style="max-width:100%;border-radius:6px">'
      preview.style.display = "block"
      info.innerHTML = "<strong>文件名:</strong> " + file.name + "<br><strong>大小:</strong> " + (file.size / 1024).toFixed(1) + " KB<br><strong>类型:</strong> " + file.type
    }
    reader.readAsDataURL(file)
  })
  document.getElementById("img-clear").addEventListener("click", function() {
    input.value = ""; output.value = ""; preview.innerHTML = ""; preview.style.display = "none"; info.innerHTML = ""
  })
  setupCopyButtons(document.getElementById("content"))
}
