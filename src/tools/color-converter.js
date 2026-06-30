import { createToolPage } from "./helpers.js"
import { showToast } from "../router.js"

export function render(container) {
  var html =
    '<div class="color-preview" id="color-preview" style="background:#6366f1"></div>' +
    '<div style="margin-bottom:12px">' +
      '<label class="tool-label">选择颜色</label>' +
      '<input type="color" id="color-picker" value="#6366f1" style="width:100%;height:40px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-secondary);cursor:pointer">' +
    "</div>" +
    '<div class="color-formats" id="color-formats"></div>'
  var page = createToolPage("颜色转换", "HEX、RGB、HSL 颜色格式互转，可点击复制", html)
  container.appendChild(page)
}

export function setup() {
  var picker = document.getElementById("color-picker")
  var preview = document.getElementById("color-preview")
  var formats = document.getElementById("color-formats")

  function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16)
    var g = parseInt(hex.slice(3, 5), 16)
    var b = parseInt(hex.slice(5, 7), 16)
    return { r: r, g: g, b: b }
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255
    var max = Math.max(r, g, b), min = Math.min(r, g, b)
    var h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      var d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  function update(hex) {
    preview.style.background = hex
    var rgb = hexToRgb(hex)
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    var items = [
      { label: "HEX", value: hex.toUpperCase() },
      { label: "RGB", value: "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")" },
      { label: "HSL", value: "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)" },
      { label: "RGBA", value: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 1)" },
    ]
    formats.innerHTML = items.map(function(item) {
      return "<div class=\"color-format-item\" data-value=\"" + item.value + "\">" +
        "<div class=\"color-format-label\">" + item.label + "</div>" +
        "<div class=\"color-format-value\">" + item.value + "</div>" +
      "</div>"
    }).join("")

    formats.querySelectorAll(".color-format-item").forEach(function(el) {
      el.addEventListener("click", function() {
        navigator.clipboard.writeText(el.dataset.value).then(function() {
          showToast("已复制: " + el.dataset.value, "success")
        })
      })
    })
  }

  picker.addEventListener("input", function() { update(picker.value) })
  update(picker.value)
}
