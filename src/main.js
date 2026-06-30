/**
 * DevBox - Main Entry Point
 */
import { Router } from "./router.js"
import { renderHeader, setupHeader } from "./components/header.js"
import { renderSidebar } from "./components/sidebar.js"
import { renderFooter } from "./components/footer.js"

import * as jsonFormatter from "./tools/json-formatter.js"
import * as timestamp from "./tools/timestamp.js"
import * as base64 from "./tools/base64.js"
import * as urlEncoder from "./tools/url-encoder.js"
import * as regexTester from "./tools/regex-tester.js"
import * as textDiff from "./tools/text-diff.js"
import * as colorConverter from "./tools/color-converter.js"

// Render layout
renderHeader()
renderSidebar()
renderFooter()

// Setup router
var router = new Router()

router
  .register("json-formatter", jsonFormatter)
  .register("timestamp", timestamp)
  .register("base64", base64)
  .register("url-encoder", urlEncoder)
  .register("regex-tester", regexTester)
  .register("text-diff", textDiff)
  .register("color-converter", colorConverter)

setupHeader(router)
router.start()
