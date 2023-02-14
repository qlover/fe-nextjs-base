const { readdirSync, statSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const { readMDFileSync } = require('./_util')

/**
 * md 内容生成 json 内容
 *
 * @param {*} contentRoot
 * @param {*} outputRoot
 */
function generatorJSON(contentRoot, outputRoot) {
  const files = readdirSync(contentRoot)

  files.forEach((filename) => {
    const filePath = resolve(join(contentRoot, filename))

    if (statSync(filePath).isDirectory()) {
      const subFiles = readdirSync(filePath)
      const mdResults = subFiles.map((filename) => {
        const mdFilePath = resolve(join(filePath, filename))
        return readMDFileSync(mdFilePath)
      })

      const writePath = resolve(join(outputRoot, filename + '.json'))
      writeFileSync(writePath, JSON.stringify(mdResults), 'utf-8')
      console.log(`success: ${writePath}`)
    } else {
      if (filename.split('.').pop() === 'md') {
        const mdresult = readMDFileSync(filePath)
        const writePath = resolve(
          join(outputRoot, filename.split('.').shift() + '.json')
        )
        writeFileSync(writePath, JSON.stringify(mdresult), 'utf-8')
        console.log(`success: ${writePath}`)
      }
    }
  })
}

module.exports = { generatorJSON }
