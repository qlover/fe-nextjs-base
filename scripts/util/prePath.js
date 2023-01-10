const { existsSync } = require('fs')
const { typingsRootPath, localeRootPath } = require('../config/path.config')
const { mkdirsSync } = require('./files')

function prePath(path) {
  if (!existsSync(path)) {
    mkdirsSync(path)
  }

  return path
}

/**
 * 获取 typings 目录，如果不存在则创建
 */
function preTypingsRootPath() {
  return prePath(typingsRootPath)
}

/**
 * 获取 locales 目录，如果不存在则创建
 */
function preLocalesRootPath() {
  return prePath(localeRootPath)
}

module.exports = { prePath, preTypingsRootPath, preLocalesRootPath }
