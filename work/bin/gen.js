const {
  genI18n,
  genPageRoute,
  genUITheme,
  genSvgIconComponent,
  genI18nTransType
} = require('../scripts')
const { genIconFontType } = require('../scripts/genIconFontType')
const { generatorJSON } = require('../lib/markdown/generator')
const { workRootPath } = require('../config/path.config')
const { join } = require('path')
const { prePath } = require('../util')

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()

  genI18nTransType()

  genSvgIconComponent()

  genIconFontType()

  // md to json
  const contentRoot = prePath(join(workRootPath, 'sources/doc/markdown'))
  const outputRoot = prePath(join(workRootPath, 'sources/mdJson'))
  generatorJSON(contentRoot, outputRoot)
}

main()
