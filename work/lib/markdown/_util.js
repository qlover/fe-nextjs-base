const { readFileSync } = require('fs')
const matter = require('gray-matter')
const { join } = require('path')

/**
 * 读取 md 文件
 * @param {*} path
 * @returns
 */
const readMDFileSync = (path) => {
  const mdFile = readFileSync(path, 'utf-8')
  const { content, data } = matter(mdFile)

  return { content, data }
}

module.exports = {
  readMDFileSync
}
