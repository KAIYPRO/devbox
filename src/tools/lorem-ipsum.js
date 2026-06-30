/**
 * Lorem Ipsum Generator
 */
import { createToolPage, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

var WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","ut","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat","duis","aute","irure","dolor","in","reprehenderit","in","voluptate","velit","esse","cillum","dolore","eu","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","in","culpa","qui","officia","deserunt","mollis","anim","id","est","laborum"]

function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)] }

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function sentence() {
  var len = 5 + Math.floor(Math.random() * 10)
  var words = []
  for (var i = 0; i < len; i++) words.push(randomWord())
  return capitalize(words.join(" ")) + "."
}

function paragraph() {
  var len = 3 + Math.floor(Math.random() * 5)
  var sents = []
  for (var i = 0; i < len; i++) sents.push(sentence())
  return sents.join(" ")
}

export function render(container) {
  var html =
    '<div class="input-group">' +
      '<label class="tool-label">段落数</label>' +
      '<input type="number" id="li-paras" class="tool-input" value="3" min="1" max="50" style="width:70px">' +
    "</div>" +
    '<div class="btn-group" style="margin:8px 0">' +
      '<button class="btn btn-primary" id="li-generate">生成</button>' +
      '<button class="btn" id="li-clear">清空</button>' +
    "</div>" +
    createOutputGroup("Lorem Ipsum 文本", "li-output")
  var page = createToolPage("Lorem Ipsum 生成器", "生成 Lorem Ipsum 假文，用于排版和设计稿填充", html)
  container.appendChild(page)
}

export function setup() {
  var output = document.getElementById("li-output")
  var parasInput = document.getElementById("li-paras")

  document.getElementById("li-generate").addEventListener("click", function() {
    var count = parseInt(parasInput.value) || 3
    var paras = []
    for (var i = 0; i < count; i++) paras.push(paragraph())
    output.value = paras.join("\n\n")
  })
  document.getElementById("li-clear").addEventListener("click", function() { output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
