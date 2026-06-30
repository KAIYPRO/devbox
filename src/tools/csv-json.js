/**
 * CSV to JSON / JSON to CSV Converter
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

function csvToJson(csv) {
  var lines = csv.trim().split("\n")
  if (lines.length < 2) throw new Error("CSV 至少需要标题行和一行数据")
  var headers = lines[0].split(",").map(function(h) { return h.trim().replace(/^"|"$/g, "") })
  var result = []
  for (var i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    var vals = lines[i].split(",").map(function(v) { return v.trim().replace(/^"|"$/g, "") })
    var row = {}
    for (var j = 0; j < headers.length; j++) row[headers[j]] = vals[j] || ""
    result.push(row)
  }
  return JSON.stringify(result, null, 2)
}

function jsonToCsv(jsonStr) {
  var data = JSON.parse(jsonStr)
  if (!Array.isArray(data)) throw new Error("JSON 必须是一个数组")
  if (data.length === 0) throw new Error("数组不能为空")
  var headers = Object.keys(data[0])
  var lines = [headers.map(function(h) { return '"' + h + '"' }).join(",")]
  for (var i = 0; i < data.length; i++) {
    var row = headers.map(function(h) { var v = data[i][h]; return v === undefined || v === null ? "" : '"' + String(v).replace(/"/g, '""') + '"' })
    lines.push(row.join(","))
  }
  return lines.join("\n")
}

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="csv2json">CSV &rarr; JSON</button>' +
      '<button class="btn btn-secondary" id="json2csv">JSON &rarr; CSV</button>' +
      '<button class="btn" id="csv-clear" style="float:right">清空</button>' +
    "</div>" +
    createInputGroup("输入 (CSV 或 JSON)", "csv-input", { placeholder: "输入 CSV 或 JSON 数据" }) +
    createOutputGroup("输出", "csv-output")
  var page = createToolPage("CSV / JSON 互转", "在 CSV 和 JSON 格式之间相互转换，支持自定义字段", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("csv-input")
  var output = document.getElementById("csv-output")

  document.getElementById("csv2json").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    try { output.value = csvToJson(input.value) }
    catch (e) { output.value = "错误: " + e.message }
  })
  document.getElementById("json2csv").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    try { output.value = jsonToCsv(input.value) }
    catch (e) { output.value = "错误: " + e.message }
  })
  document.getElementById("csv-clear").addEventListener("click", function() { input.value = ""; output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
