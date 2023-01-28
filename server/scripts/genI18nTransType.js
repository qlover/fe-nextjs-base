const { execFileSync } = require('child_process')
const { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const i18n = require('../../i18n')
const { preLocalesRootPath, arrayToTypes, preTypingsRootPath, getJsonFile } = require('../util')

const LocalesTranReg = /type\s*LocalesTranMap\s*=\s*\{/

function genI18nTransType() {
  const locales = preLocalesRootPath()

  const targetLocalesPath = join(locales, i18n.defaultLocale)

  let LocalesTypeString = ""

  if (existsSync(targetLocalesPath)) {
    const files = readdirSync(targetLocalesPath)

    files.forEach((filename) => {
      const locale = filename.split('.json').shift()
      if (locale) {
        const localesFile = getJsonFile(join(targetLocalesPath, filename))
        LocalesTypeString += `    ${locale}: ${arrayToTypes(Object.keys(localesFile))}\n`
      }
    })
  }

  const i18ndtsPath = join(preTypingsRootPath(), 'I18n.d.ts')

  if (existsSync(i18ndtsPath)) {

    let filecontent = readFileSync(i18ndtsPath, 'utf-8')

    let contentWithEnter = filecontent.split('\n')
    let targetIndex = contentWithEnter.findIndex(ele => LocalesTranReg.test(ele))
    // const lastIndex = contentWithEnter.findIndex(ele => ele === '}')
    let firstAdd = targetIndex < 0
    if (firstAdd) {
      targetIndex = contentWithEnter.length - 1
    }

    contentWithEnter.splice(targetIndex)
    contentWithEnter.push(`${firstAdd ? '\n' : ''}  type LocalesTranMap = { \n${LocalesTypeString}  }`)

    contentWithEnter.push('  type TransKeys = ValueOf<LocalesTranMap>\n')

    contentWithEnter.push('}\n')

    writeFileSync(i18ndtsPath, contentWithEnter.join('\n'))

    console.log('[genI18nTransType success]', i18ndtsPath)
  }

}

module.exports = { genI18nTransType }