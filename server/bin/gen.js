const { genI18n, genPageRoute, genUITheme, genI18nTransType } = require('../scripts')

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()

  genI18nTransType()
}

main()
