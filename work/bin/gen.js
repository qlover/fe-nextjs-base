const {
  genI18n,
  genPageRoute,
  genUITheme,
  genSvgIconComponent,
  genI18nTransType
} = require('../scripts')
const { genIconFontType } = require('../scripts/genIconFontType')
const { generatorEvery, generatorGroup } = require('../lib/markdown/generator')
const { workRootPath } = require('../config/path.config')
const { join } = require('path')
const { prePath } = require('../util')
const { mdContentRoot, jsonOutputRoot } = require('../lib/markdown/config')

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()

  genI18nTransType()

  genSvgIconComponent()

  genIconFontType()

  // md to json
  generatorEvery(prePath(mdContentRoot), prePath(jsonOutputRoot))

  generatorGroup(
    join(mdContentRoot, 'posts'),
    join(jsonOutputRoot, 'posts.json')
  )

  // supportmd to json
  generatorGroup(
    prePath(join(mdContentRoot, 'support')),
    join(jsonOutputRoot, 'support.json')
  )
}

main()
