const {
  genI18n,
  genPageRoute,
  genUITheme,
  genSvgIconComponent,
  genI18nTransType
} = require('../scripts')
const { genIconFontType } = require('../scripts/genIconFontType')

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()

  genI18nTransType()

  genSvgIconComponent()

  genIconFontType()
}

main()
