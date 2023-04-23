const { readdirSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const { readMDFileSync } = require('./_util')

/**
 * 生成一组
 * @param {*} contentRoot
 * @param {*} outputRoot
 */
function generatorGroup(contentRoot, outputRoot) {
  console.log('generatorGroup', contentRoot, outputRoot)
  const subFiles = readdirSync(contentRoot)
  const mdResults = subFiles.filter(isMDXExt).map((filename) => {
    const mdFilePath = resolve(join(contentRoot, filename))
    try {
      return readMDFileSync(mdFilePath)
    } catch (e) {
      console.log(`[error] ${mdFilePath}`)
      return {
        errorKey: filename,
        e
      }
    }
  })

  writeFileSync(outputRoot, JSON.stringify(mdResults), 'utf-8')
  console.log(`[success] ${outputRoot}`)
}

/**
 * 生成单个json
 * @param {*} contentRoot
 * @param {*} outputRoot
 */
function generatorEvery(contentRoot, outputRoot) {
  const files = readdirSync(contentRoot)

  files.filter(isMDXExt).forEach((filename) => {
    const filePath = resolve(join(contentRoot, filename))
    const mdresult = readMDFileSync(filePath)
    const writePath = resolve(
      join(outputRoot, filename.split('.').shift() + '.json')
    )

    try {
      writeFileSync(writePath, JSON.stringify(mdresult), 'utf-8')
      console.log(`[success] ${writePath}`)
    } catch (e) {
      console.log(`[error] ${writePath}`)
      return {
        errorKey: filename,
        e
      }
    }
  })
}

function isMDXExt(name) {
  const extname = name.split('.').pop()
  return extname === 'md' || extname === 'mdx'
}

module.exports = { generatorEvery, generatorGroup }
