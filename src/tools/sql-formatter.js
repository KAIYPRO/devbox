/**
 * SQL Formatter - basic SQL keyword-based beautifier
 */
import { createToolPage, createInputGroup, createOutputGroup } from "./helpers.js"
import { setupCopyButtons } from "../router.js"

var KEYWORDS = ["SELECT","FROM","WHERE","AND","OR","NOT","IN","LIKE","BETWEEN","IS","NULL",
  "INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","ALTER","DROP","INDEX",
  "JOIN","LEFT","RIGHT","INNER","OUTER","FULL","ON","AS","ORDER","BY","GROUP","HAVING",
  "LIMIT","OFFSET","UNION","ALL","DISTINCT","CASE","WHEN","THEN","ELSE","END","EXISTS",
  "COUNT","SUM","AVG","MIN","MAX","BETWEEN","EXISTS","UNIQUE","PRIMARY","KEY","FOREIGN",
  "REFERENCES","CASCADE","CONSTRAINT","DEFAULT","CHECK","VIEW","PROCEDURE","FUNCTION",
  "TRIGGER","IF","ELSE","BEGIN","END","WHILE","BREAK","CONTINUE","RETURN","SYS"]

function format(sql) {
  var s = sql
    .replace(/\s+/g, " ")
    .replace(/,\s*/g, ", ")
    .trim()
  // Add newlines before major keywords
  var kw = ["SELECT","FROM","WHERE","AND","OR","ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET",
    "INSERT INTO","VALUES","UPDATE SET","DELETE FROM","JOIN","LEFT JOIN","RIGHT JOIN",
    "INNER JOIN","OUTER JOIN","FULL JOIN","ON","UNION","CREATE TABLE","ALTER TABLE",
    "DROP TABLE","SET","INTO"]
  for (var i = 0; i < kw.length; i++) {
    var re = new RegExp("\\b" + kw[i] + "\\b", "gi")
    s = s.replace(re, "\n" + kw[i])
  }
  // Indent after SELECT fields
  var lines = s.split("\n").map(function(l) { return l.trim() }).filter(function(l) { return l })
  var result = []
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    var upper = line.toUpperCase()
    if (upper === "SELECT" || upper.startsWith("SELECT ")) {
      result.push(line)
      // Indent columns
    } else if (/^(FROM|WHERE|ORDER|GROUP|HAVING|LIMIT|OFFSET|JOIN|ON|UNION|VALUES|SET|INTO)/i.test(line)) {
      result.push(line)
    } else {
      result.push("  " + line)
    }
  }
  return result.join("\n")
}

export function render(container) {
  var html =
    createInputGroup("SQL 语句", "sql-input", { placeholder: "粘贴 SQL 语句，如: SELECT id,name FROM users WHERE age>18 ORDER BY id" }) +
    '<div class="btn-group" style="margin:8px 0">' +
      '<button class="btn btn-primary" id="sql-format">格式化</button>' +
      '<button class="btn" id="sql-clear">清空</button>' +
    "</div>" +
    createOutputGroup("格式化结果", "sql-output")
  var page = createToolPage("SQL 格式化", "美化 SQL 语句排版，支持 SELECT、JOIN、WHERE 等关键字的换行和缩进", html)
  container.appendChild(page)
}

export function setup() {
  var input = document.getElementById("sql-input")
  var output = document.getElementById("sql-output")

  document.getElementById("sql-format").addEventListener("click", function() {
    if (!input.value) { output.value = ""; return }
    try { output.value = format(input.value) }
    catch (e) { output.value = "格式化错误: " + e.message }
  })
  document.getElementById("sql-clear").addEventListener("click", function() { input.value = ""; output.value = "" })
  setupCopyButtons(document.getElementById("content"))
}
