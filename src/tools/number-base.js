/**
 * Number Base Converter (bin/oct/dec/hex)
 */
import { createToolPage, createInputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function detectBase(s) {
  s = s.trim().toLowerCase()
  if (/^[01\s]+$/.test(s)) return 2
  if (/^[0-7\s]+$/.test(s)) return 8
  if (/^-?\d+$/.test(s)) return 10
  if (/^[0-9a-f\s]+$/i.test(s)) return 16
  return 10
}

export function render(container) {
  var html =
    '<div class="input-group">' +
      '<label class="tool-label">输入值</label>' +
      '<input type="text" id="nb-input" class="tool-input" placeholder="输入数字（如 255, FF, 11111111）">' +
    "</div>" +
    '<div class="input-group">' +
      '<label class="tool-label">输入进制</label>' +
      '<select id="nb-from" class="tool-select"><option value="auto">自动检测</option><option value="2">二进制</option><option value="8">八进制</option><option value="10">十进制</option><option value="16">十六进制</option></select>' +
    "</div>" +
    '<div class="btn-group" style="margin:8px 0"><button class="btn btn-primary" id="nb-convert">转换</button></div>' +
    '<div class="output-group">' +
      '<div class="tool-label">转换结果</div>' +
      '<table class="nb-table" style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;width:80px;font-weight:600">二进制</td><td id="nb-bin" style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-family:monospace"></td></tr>' +
        '<tr><td style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-weight:600">八进制</td><td id="nb-oct" style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-family:monospace"></td></tr>' +
        '<tr><td style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-weight:600">十进制</td><td id="nb-dec" style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-family:monospace"></td></tr>' +
        '<tr><td style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-weight:600">十六进制</td><td id="nb-hex" style="padding:6px 8px;background:#1e1e2e;border:1px solid #313244;font-family:monospace"></td></tr>' +
      "</table>" +
    "</div>"
  var page = createToolPage("进制转换", "在二进制、八进制、十进制、十六进制之间相互转换", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("nb-input")
  var fromSelect = document.getElementById("nb-from")

  function convert() {
    var val = input.value.trim()
    if (!val) { ["nb-bin","nb-oct","nb-dec","nb-hex"].forEach(function(id) { document.getElementById(id).textContent = "" }); return }
    var from = fromSelect.value === "auto" ? detectBase(val) : parseInt(fromSelect.value)
    var raw = val.replace(/\s/g, "")
    var num = parseInt(raw, from)
    if (isNaN(num)) { ["nb-bin","nb-oct","nb-dec","nb-hex"].forEach(function(id) { document.getElementById(id).textContent = "无效输入" }); return }
    document.getElementById("nb-bin").textContent = num.toString(2)
    document.getElementById("nb-oct").textContent = num.toString(8)
    document.getElementById("nb-dec").textContent = num.toString(10)
    document.getElementById("nb-hex").textContent = num.toString(16).toUpperCase()
  }

  document.getElementById("nb-convert").addEventListener("click", convert)
  input.addEventListener("keydown", function(e) { if (e.key === "Enter") convert() })
}
