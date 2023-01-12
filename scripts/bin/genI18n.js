const { writeFileSync, existsSync } = require('fs')
const { join } = require('path')
const i18n = require('../../i18n')
const { arrayToTypes } = require('../util/typed')
const { mkdirsSync } = require('../util/files')
const { preTypingsRootPath, preLocalesRootPath } = require('../util/prepath')
const seoConfig = require('../../src/config/seoConfig.json')

function genTpl(locales, pathname, nss) {
  return `// 对应 i18n.js 配置类型
declare namespace I18n {
  type Locale = ${locales};

  type LocalesType = Array<Locale>;

  type Pathname = ${pathname};

  type I18nNS = ${nss}

  type PagesType = Record<Pathname, Array<I18nNS>>;
}`
}

function genLocaleFile(locale, ns) {
  return `{
  "${seoConfig.localeSeoTitleKey}": "${locale}:${ns} SEO Title",
  "${seoConfig.localeSeoDescKey}": "${locale}:${ns} SEO desc",
  "${seoConfig.localeSeoKeywordKey}": "${locale}:${ns} SEO keywords"
}`
}

async function main() {
  const routers = Object.keys(i18n.pages)
    .filter((page) => {
      return page !== '*'
    })
    .map((page) => {
      return page.replace('rgx:^', '')
    })
    .sort()

  const nss = Object.values(i18n.pages).flat().sort()

  // 生成 类型
  const i18ndtsPath = join(preTypingsRootPath(), 'I18n.d.ts')
  writeFileSync(
    i18ndtsPath,
    genTpl(arrayToTypes(i18n.locales), arrayToTypes(routers), arrayToTypes(nss))
  )
  console.log('[success]', i18ndtsPath)

  const localeRootPath = preLocalesRootPath()

  // 生成 目录和文件
  i18n.locales.forEach((locale) => {
    const localePath = join(localeRootPath, locale)

    mkdirsSync(localePath)

    nss.forEach((i18ns) => {
      const filePath = join(localePath, `${i18ns}.json`)
      if (!existsSync(filePath)) {
        writeFileSync(filePath, genLocaleFile(locale, i18ns))
      }
    })
  })
  console.log('[success]', localeRootPath)
}

main()
