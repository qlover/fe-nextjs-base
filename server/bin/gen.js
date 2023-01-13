const { genI18n, genPageRoute, genUITheme } = require('../scripts')

async function main() {
  await genI18n()

  genPageRoute()

  genUITheme()
}

main()
