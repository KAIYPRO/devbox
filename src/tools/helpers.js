/**
 * Shared helpers for building tool UI
 */
import { setupCopyButtons, showToast } from "../router.js"

export function createToolPage(title, description, bodyHTML) {
  const div = document.createElement("div")
  div.className = "tool-page"
  div.innerHTML = [
    "<div class=\"tool-header\">",
    "  <h1 class=\"tool-title\">" + title + "</h1>",
    "  <p class=\"tool-desc\">" + description + "</p>",
    "</div>",
    "<div class=\"tool-body\">",
    bodyHTML,
    "</div>"
  ].join("\n")
  return div
}

export function createInputGroup(label, id, opts) {
  opts = opts || {}
  const isTextarea = (opts.type || "textarea") === "textarea"
  const tag = isTextarea ? "textarea" : "input"
  const cls = isTextarea ? "tool-textarea" : "tool-input"
  const extraAttrs = isTextarea ? "" : "type=\"" + (opts.type || "text") + "\""
  const placeholder = opts.placeholder || ""
  return [
    "<div class=\"input-group\">",
    "  <label class=\"tool-label\" for=\"" + id + "\">" + label + "</label>",
    "  <" + tag + " id=\"" + id + "\" class=\"" + cls + "\" placeholder=\"" + placeholder + "\" " + extraAttrs + "></" + tag + ">",
    "</div>"
  ].join("\n")
}

export function createOutputGroup(label, id) {
  return [
    "<div class=\"output-group\">",
    "  <label class=\"tool-label\" for=\"" + id + "\">" + label + "</label>",
    "  <div class=\"output-wrapper\">",
    "    <textarea id=\"" + id + "\" class=\"tool-textarea output\" readonly></textarea>",
    "    <button class=\"copy-btn\" data-target=\"" + id + "\">复制</button>",
    "  </div>",
    "</div>"
  ].join("\n")
}

export function setupLiveTransform(inputId, outputId, transformFn) {
  const input = document.getElementById(inputId)
  const output = document.getElementById(outputId)
  if (!input || !output) return
  const handler = function() {
    try {
      output.value = transformFn(input.value)
    } catch (e) {
      output.value = "错误: " + e.message
    }
  }
  input.addEventListener("input", handler)
  handler()
  return function() { input.removeEventListener("input", handler) }
}
