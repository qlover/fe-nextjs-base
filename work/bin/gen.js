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

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()

  genI18nTransType()

  genSvgIconComponent()

  genIconFontType()

  // md to json
  generatorEvery(
    prePath(join(workRootPath, 'sources/doc/markdown')),
    prePath(join(workRootPath, 'sources/mdJson'))
  )

  generatorGroup(
    join(workRootPath, 'sources/doc/markdown/posts'),
    join(workRootPath, 'sources/mdJson/posts.json')
  )

  // supportmd to json
  generatorGroup(
    prePath(join(workRootPath, 'sources/doc/markdown/support')),
    join(workRootPath, 'sources/mdJson/support.json')
  )
}

main()
