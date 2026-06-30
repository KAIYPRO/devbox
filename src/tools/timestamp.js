import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

export function render(container) {
  const html =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
      '<div><label class="tool-label">当前时间</label><button class="btn btn-secondary" id="ts-now">获取当前时间戳</button></div>' +
      '<div><label class="tool-label">快速转换</label><button class="btn btn-secondary" id="ts-now-human">获取当前日期时间</button></div>' +
    "</div>" +
    createInputGroup("时间戳 (秒)", "ts-input", { type: "number", placeholder: "例如: 1719734400" }) +
    '<div class="btn-group">' +
      '<button class="btn btn-primary" id="ts-to-date">转为日期</button>' +
    "</div>" +
    createOutputGroup("日期时间", "ts-date-output") +
    '<hr style="border-color:var(--border);margin:16px 0">' +
    createInputGroup("日期时间", "ts-date-input", { placeholder: "例如: 2024-06-30 12:00:00" }) +
    '<div class="btn-group">' +
      '<button class="btn btn-primary" id="ts-to-timestamp">转为时间戳</button>' +
    "</div>" +
    createOutputGroup("时间戳 (秒)", "ts-output")
  const page = createToolPage("时间戳转换", "Unix 时间戳与日期时间相互转换", html)
  container.appendChild(page)
}

export function setup() {
  document.getElementById("ts-now").addEventListener("click", function() {
    document.getElementById("ts-input").value = Math.floor(Date.now() / 1000)
  })
  document.getElementById("ts-now-human").addEventListener("click", function() {
    document.getElementById("ts-date-input").value = new Date().toISOString().slice(0, 19).replace("T", " ")
  })
  document.getElementById("ts-to-date").addEventListener("click", function() {
    var val = document.getElementById("ts-input").value
    if (!val) return
    var d = new Date(parseInt(val) * 1000)
    document.getElementById("ts-date-output").value = d.toISOString().slice(0, 19).replace("T", " ") + "\n" +
      "本地: " + d.toLocaleString("zh-CN") + "\n" +
      "UTC: " + d.toUTCString()
  })
  document.getElementById("ts-to-timestamp").addEventListener("click", function() {
    var val = document.getElementById("ts-date-input").value
    if (!val) return
    var ts = Math.floor(new Date(val.replace(" ", "T")).getTime() / 1000)
    document.getElementById("ts-output").value = isNaN(ts) ? "日期格式无效" : ts.toString()
  })
  setupCopyButtons(document.getElementById("content"))
}
