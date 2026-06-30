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
import * as uuidGenerator from "./tools/uuid-generator.js"
import * as passwordGenerator from "./tools/password-generator.js"
import * as hashGenerator from "./tools/hash-generator.js"
import * as htmlEntity from "./tools/html-entity.js"
import * as numberBase from "./tools/number-base.js"
import * as stringCase from "./tools/string-case.js"
import * as jwtDecoder from "./tools/jwt-decoder.js"
import * as loremIpsum from "./tools/lorem-ipsum.js"
import * as imgBase64 from "./tools/img-base64.js"
import * as slugGenerator from "./tools/slug-generator.js"
import * as csvJson from "./tools/csv-json.js"
import * as uaParser from "./tools/ua-parser.js"
import * as textCounter from "./tools/text-counter.js"
import * as cssMinifier from "./tools/css-minifier.js"

renderHeader()
renderSidebar()
renderFooter()

var router = new Router()

router
  .register("json-formatter", jsonFormatter)
  .register("timestamp", timestamp)
  .register("base64", base64)
  .register("url-encoder", urlEncoder)
  .register("regex-tester", regexTester)
  .register("text-diff", textDiff)
  .register("color-converter", colorConverter)
  .register("uuid-generator", uuidGenerator)
  .register("password-generator", passwordGenerator)
  .register("hash-generator", hashGenerator)
  .register("html-entity", htmlEntity)
  .register("number-base", numberBase)
  .register("string-case", stringCase)
  .register("jwt-decoder", jwtDecoder)
  .register("lorem-ipsum", loremIpsum)
  .register("img-base64", imgBase64)
  .register("slug-generator", slugGenerator)
  .register("csv-json", csvJson)
  .register("ua-parser", uaParser)
  .register("text-counter", textCounter)
  .register("css-minifier", cssMinifier)

setupHeader(router)
router.start()
