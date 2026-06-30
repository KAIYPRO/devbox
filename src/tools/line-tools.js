/**
 * Line Tools - sort, deduplicate, reverse, shuffle lines
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  var html =
    createInputGroup("输入文本", "lt-input", { placeholder: "粘贴多行文本..." }) +
    '<div class="btn-group" style="margin:8px 0;flex-wrap:wrap">' +
      '<button class="btn btn-primary" id="lt-sort-asc">升序排序 A-Z</button>' +
      '<button class="btn btn-secondary" id="lt-sort-desc">降序排序 Z-A</button>' +
      '<button class="btn" id="lt-dedup">去重</button>' +
      '<button class="btn" id="lt-reverse">反转</button>' +
      '<button class="btn" id="lt-shuffle">打乱</button>' +
      '<button class="btn" id="lt-trim">去除首尾空格</button>' +
      '<button class="btn" id="lt-clear" style="float:right">清空</button>' +
    "</div>" +
    '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">行数: <span id="lt-count">0</span></div>' +
    createOutputGroup("处理结果", "lt-output")
  var page = createToolPage("行处理工具", "对多行文本进行排序、去重、反转、打乱等操作", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("lt-input")
  var output = document.getElementById("lt-output")
  var count = document.getElementById("lt-count")

  function getLines() { return input.value.split("\n") }
  function setResult(lines) { output.value = lines.join("\n"); count.textContent = lines.length }

  document.getElementById("lt-sort-asc").addEventListener("click", function() { var l = getLines(); if (l.length === 1 && l[0] === "") return; setResult(l.sort()) })
  document.getElementById("lt-sort-desc").addEventListener("click", function() { var l = getLines(); if (l.length === 1 && l[0] === "") return; setResult(l.sort().reverse()) })
  document.getElementById("lt-dedup").addEventListener("click", function() { var l = getLines(); setResult(l.filter(function(v,i,a) { return a.indexOf(v) === i })) })
  document.getElementById("lt-reverse").addEventListener("click", function() { var l = getLines(); setResult(l.reverse()) })
  document.getElementById("lt-shuffle").addEventListener("click", function() { var l = getLines(); for (var i = l.length-1; i > 0; i--) { var j = Math.floor(Math.random() * (i+1)); var t = l[i]; l[i] = l[j]; l[j] = t }; setResult(l) })
  document.getElementById("lt-trim").addEventListener("click", function() { setResult(getLines().map(function(l) { return l.trim() })) })
  document.getElementById("lt-clear").addEventListener("click", function() { input.value = ""; output.value = ""; count.textContent = "0" })
  setResult(getLines())
  setupCopyButtons(document.getElementById("content"))
}
