const { writeFileSync } = require('fs');
const { isUndefined } = require('lodash');
const { join } = require('path');
const i18n = require('../../i18n');
const { preLocalesRootPath, getJsonFile, sortPlainObject } = require('../util')

const nss = Object.values(i18n.pages).flat().sort()

function getLocaleJson(locale) {
  const localeRootPath = preLocalesRootPath()
  const targetLocalePath = join(localeRootPath, locale)

  const pages = {}
  nss.forEach((i18ns) => {
    const filePath = join(targetLocalePath, `${i18ns}.json`)
    const localeJson = getJsonFile(filePath)

    pages[i18ns] = JSON.parse(JSON.stringify(localeJson))
  })

  return pages
}

/**
 * 复制源对象中有的键
 * @param {*} source 
 * @param {*} target 
 * @param {*} keep 是否删除目标对象中额外键值(不包含在 source 中的值)
 * @returns 
 */
function assignLocales(source, target, keep) {
  if (keep) {
    return { ...source, ...target }
  }

  const result = {}
  Object.keys(source).forEach((key) => {
    result[key] = isUndefined(target[key]) ? source[key] : target[key]
  })
  return result
}


function fixI18n(targetLocale, keep = false, sort = false) {

  if (!targetLocale) {
    throw new Error('not i18n.locales')
  }

  const localeRootPath = preLocalesRootPath()
  const targetJsonMap = getLocaleJson(targetLocale)

  i18n.locales.forEach((locale) => {
    const currentLocalesPath = join(localeRootPath, locale)
    nss.forEach((i18ns) => {
      const filePath = join(currentLocalesPath, `${i18ns}.json`)
      const localeJson = getJsonFile(filePath)
      let newCotent = assignLocales(targetJsonMap[i18ns], localeJson, keep)

      if (sort) {
        newCotent = sortPlainObject(newCotent)
      }

      writeFileSync(filePath, JSON.stringify(newCotent, null, 2) + '\n')

      console.log(`${filePath} 共 ${Object.keys(newCotent).length} 个键`);
    })
  })
}

module.exports = { fixI18n }