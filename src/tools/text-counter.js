/**
 * Text Counter - character/word/line/sentence statistics
 */
import { createToolPage, createInputGroup } from "./helpers.js"

export function render(container) {
  var html =
    createInputGroup("输入文本", "tc-input", { placeholder: "粘贴或输入任意文本..." }) +
    '<div id="tc-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin:12px 0">' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-chars">0</span><span class="tc-stat-lbl">字符 (含空格)</span></div>' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-chars-no">0</span><span class="tc-stat-lbl">字符 (不含空格)</span></div>' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-words">0</span><span class="tc-stat-lbl">单词</span></div>' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-lines">0</span><span class="tc-stat-lbl">行数</span></div>' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-sents">0</span><span class="tc-stat-lbl">句子</span></div>' +
      '<div class="tc-stat"><span class="tc-stat-val" id="tc-paras">0</span><span class="tc-stat-lbl">段落</span></div>' +
    "</div>"
  var page = createToolPage("文本统计计数器", "实时统计文本的字符数、单词数、行数、句子数、段落数等", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("tc-input")
  var display = ["chars","chars-no","words","lines","sents","paras"]

  function update() {
    var t = input.value
    var chars = t.length
    var charsNo = t.replace(/\s/g, "").length
    var words = t.trim() ? t.trim().split(/\s+/).length : 0
    var lines = t === "" ? 0 : t.split("\n").length
    var sents = t.split(/[.!?。！？]+/).length - 1
    var paras = t.trim() ? t.split(/\n\s*\n/).filter(function(p) { return p.trim() }).length : 0
    document.getElementById("tc-chars").textContent = chars
    document.getElementById("tc-chars-no").textContent = charsNo
    document.getElementById("tc-words").textContent = words
    document.getElementById("tc-lines").textContent = lines
    document.getElementById("tc-sents").textContent = sents
    document.getElementById("tc-paras").textContent = paras
  }

  input.addEventListener("input", update)
}
