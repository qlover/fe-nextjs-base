const { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const i18n = require('../../i18n')
const { preLocalesRootPath, arrayToTypes, preTypingsRootPath } = require('../util')

function genI18nTransType() {
  const locales = preLocalesRootPath()

  const targetLocalesPath = join(locales, i18n.defaultLocale)

  let LocalesTypeString = ""

  if (existsSync(targetLocalesPath)) {
    const files = readdirSync(targetLocalesPath)

    files.forEach((filename) => {
      const locale = filename.split('.json').shift()
      if (locale) {
        const localesFile = require(join(targetLocalesPath, filename))
        LocalesTypeString += `    ${locale}: ${arrayToTypes(Object.keys(localesFile))}\n`
      }
    })
  }

  const i18ndtsPath = join(preTypingsRootPath(), 'I18n.d.ts')

  let filecontent = readFileSync(i18ndtsPath, 'utf-8')

  filecontent = filecontent.replace('\n}', '')


  filecontent += `\n\n  type LocalesTranMap = {
${LocalesTypeString}
  }
}`

  writeFileSync(i18ndtsPath, filecontent)

  console.log('[genI18nTransType success]', i18ndtsPath)
}

module.exports = { genI18nTransType }