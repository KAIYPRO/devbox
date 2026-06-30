import { createToolPage, createInputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"
import { diffLines } from "diff"

export function render(container) {
  var html =
    '<div class="diff-container">' +
      createInputGroup("原始文本", "diff-old", { placeholder: "输入原始文本..." }) +
      createInputGroup("新文本", "diff-new", { placeholder: "输入新文本..." }) +
    "</div>" +
    '<div class="btn-group" style="margin: 8px 0">' +
      '<button class="btn btn-primary" id="diff-compare">比较差异</button>' +
      '<button class="btn btn-secondary" id="diff-clear">清空</button>' +
    "</div>" +
    '<div class="output-group">' +
      '<label class="tool-label">差异结果</label>' +
      '<div class="diff-result" id="diff-output" style="min-height:100px;white-space:pre-wrap">点击"比较差异"查看结果</div>' +
    "</div>"
  var page = createToolPage("文本差异对比", "对比两段文本的差异（行级 diff）", html)
  container.appendChild(page)
}

export function setup() {
  document.getElementById("diff-compare").addEventListener("click", function() {
    var oldText = document.getElementById("diff-old").value
    var newText = document.getElementById("diff-new").value
    var output = document.getElementById("diff-output")
    var changes = diffLines(oldText, newText)
    var html = ""
    changes.forEach(function(part) {
      var cls = part.added ? "diff-line-add" : part.removed ? "diff-line-remove" : ""
      var prefix = part.added ? "+ " : part.removed ? "- " : "  "
      var text = part.value.replace(/\n$/, "").split("\n")
      text.forEach(function(line) {
        if (cls) {
          html += "<div class=\"" + cls + "\">" + escapeHtml(prefix + line) + "</div>"
        } else {
          html += "<div>" + escapeHtml(prefix + line) + "</div>"
        }
      })
    })
    output.innerHTML = html || "<div style=\"color:var(--text-muted)\">两段文本完全相同</div>"
  })

  document.getElementById("diff-clear").addEventListener("click", function() {
    document.getElementById("diff-old").value = ""
    document.getElementById("diff-new").value = ""
    document.getElementById("diff-output").innerHTML = '点击"比较差异"查看结果'
  })

  setupCopyButtons(document.getElementById("content"))
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
