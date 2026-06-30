/**
 * HTTP Status Codes - quick reference
 */
import { createToolPage, createInputGroup } from "./helpers.js"

var CODES = {
  "100":"Continue","101":"Switching Protocols","102":"Processing",
  "200":"OK","201":"Created","202":"Accepted","204":"No Content",
  "301":"Moved Permanently","302":"Found","304":"Not Modified",
  "400":"Bad Request","401":"Unauthorized","403":"Forbidden","404":"Not Found",
  "405":"Method Not Allowed","408":"Request Timeout","409":"Conflict",
  "410":"Gone","413":"Payload Too Large","415":"Unsupported Media Type",
  "429":"Too Many Requests",
  "500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway",
  "503":"Service Unavailable","504":"Gateway Timeout"
}

export function render(container) {
  var html =
    '<div class="input-group">' +
      '<label class="tool-label">搜索状态码</label>' +
      '<input type="text" id="http-search" class="tool-input" placeholder="输入状态码或名称搜索，如 404 或 Not Found">' +
    "</div>" +
    '<div id="http-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;margin-top:8px"></div>'
  var page = createToolPage("HTTP 状态码查询", "快速查询 HTTP 状态码含义，支持按代码或名称搜索", html)
  container.appendChild(page)
}

export function setup() {
  var codes = Object.keys(CODES)
  var list = document.getElementById("http-list")
  var search = document.getElementById("http-search")

  function renderCodes(filter) {
    filter = (filter || "").toLowerCase()
    list.innerHTML = codes.filter(function(c) {
      if (!filter) return true
      return c.indexOf(filter) !== -1 || CODES[c].toLowerCase().indexOf(filter) !== -1
    }).map(function(c) {
      var cls = c >= "400" ? "http-err" : c >= "300" ? "http-redir" : "http-ok"
      return '<div class="http-item ' + cls + '" style="padding:8px 12px;border-radius:6px;background:var(--bg-tertiary);border-left:3px solid currentColor">' +
        '<strong>' + c + '</strong> <span style="font-size:13px;color:var(--text-secondary)">' + CODES[c] + '</span></div>'
    }).join("")
  }

  renderCodes("")
  search.addEventListener("input", function() { renderCodes(search.value) })
}
