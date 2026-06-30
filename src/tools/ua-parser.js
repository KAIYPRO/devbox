/**
 * User-Agent Parser
 */
import { createToolPage } from "./helpers.js"

export function render(container) {
  var html =
    '<div class="btn-group" style="margin-bottom:8px">' +
      '<button class="btn btn-primary" id="ua-detect">检测当前浏览器</button>' +
      '<button class="btn" id="ua-parse">手动解析</button>' +
    "</div>" +
    '<div class="input-group">' +
      '<label class="tool-label">User-Agent 字符串</label>' +
      '<textarea id="ua-input" class="tool-textarea" placeholder="留空则解析当前浏览器，或粘贴任意 UA 字符串" rows="3"></textarea>' +
    "</div>" +
    '<div class="output-group">' +
      '<div class="tool-label">解析结果</div>' +
      '<pre id="ua-result" class="tool-pre" style="background:var(--bg-tertiary);border:1px solid var(--border);border-radius:6px;padding:12px;overflow:auto;white-space:pre-wrap;min-height:80px;font-size:13px"></pre>' +
    "</div>"
  var page = createToolPage("User-Agent 解析器", "解析浏览器 User-Agent 字符串，识别浏览器、操作系统、设备类型等信息", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("ua-input")
  var result = document.getElementById("ua-result")

  function parse(ua) {
    var info = {}
    info["User-Agent"] = ua
    if (/Chrome\/(\S+)/.test(ua)) { info["浏览器"] = "Chrome " + ua.match(/Chrome\/(\S+)/)[1] }
    else if (/Firefox\/(\S+)/.test(ua)) { info["浏览器"] = "Firefox " + ua.match(/Firefox\/(\S+)/)[1] }
    else if (/Safari/.test(ua)) { info["浏览器"] = "Safari" }
    else { info["浏览器"] = "未知" }

    if (/Windows NT (\S+)/.test(ua)) { info["操作系统"] = "Windows " + { "10.0":"10/11", "6.3":"8.1", "6.2":"8", "6.1":"7" }[ua.match(/Windows NT (\S+)/)[1]] || ua.match(/Windows NT (\S+)/)[1] }
    else if (/Mac OS X (\S+)/.test(ua)) { info["操作系统"] = "macOS " + ua.match(/Mac OS X (\S+)/)[1].replace(/_/g,".") }
    else if (/Android (\S+)/.test(ua)) { info["操作系统"] = "Android " + ua.match(/Android (\S+)/)[1] }
    else if (/iPhone/.test(ua) || /iPad/.test(ua)) { info["操作系统"] = "iOS" }
    else if (/Linux/.test(ua)) { info["操作系统"] = "Linux" }
    else { info["操作系统"] = "未知" }

    if (/Mobile|Android|iPhone|iPad/.test(ua)) { info["设备类型"] = "移动端" }
    else if (/Tablet/.test(ua)) { info["设备类型"] = "平板" }
    else { info["设备类型"] = "桌面端" }

    if (/Chrome\/(\S+)/.test(ua)) info["渲染引擎"] = "Blink"
    else if (/Firefox\/(\S+)/.test(ua)) info["渲染引擎"] = "Gecko"
    else if (/Safari/.test(ua)) info["渲染引擎"] = "WebKit"

    info["语言"] = navigator.language
    info["屏幕分辨率"] = screen.width + "x" + screen.height
    info["已启用 Cookie"] = navigator.cookieEnabled ? "是" : "否"

    var out = []
    for (var k in info) out.push(k + ": " + info[k])
    return out.join("\n")
  }

  document.getElementById("ua-detect").addEventListener("click", function() {
    var ua = navigator.userAgent
    input.value = ua
    result.textContent = parse(ua)
  })
  document.getElementById("ua-parse").addEventListener("click", function() {
    var ua = input.value.trim() || navigator.userAgent
    result.textContent = parse(ua)
  })
}
