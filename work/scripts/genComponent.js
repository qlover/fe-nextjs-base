const { writeFileSync } = require('fs')
const { join } = require('path')
const { componentRoot } = require('../config/path.config')
const { prePath, readFileWithString } = require('../util')

const TSXJson = require('../vscode/snitppets/tsx.json')
const hookComponentTpl = TSXJson.lis_hookcom.body

async function genComponent(path, name) {
  const targetComponentPath = prePath(join(componentRoot, path))

  const parentComponentIndex = join(targetComponentPath, 'index.ts')
  const parentComponentIndexContent = readFileWithString(parentComponentIndex)
  const newComponentImport = `\nexport { default as ${name} } from './${name}'`
  const targetComponentIndexPath = prePath(join(targetComponentPath, name))

  const targetComponentIndexFilePath = join(
    targetComponentIndexPath,
    'index.tsx'
  )
  const targetComponentIndexFileConent = hookComponentTpl
    .join('\n')
    .replace(/(\$1)/g, name)

  writeFileSync(targetComponentIndexFilePath, targetComponentIndexFileConent)
  console.log(`[component ${name} success]`, targetComponentIndexFilePath)

  if (!parentComponentIndexContent.includes(newComponentImport)) {
    const newParentComponentIndexContent =
      parentComponentIndexContent + newComponentImport
    writeFileSync(parentComponentIndex, newParentComponentIndexContent)
    console.log(`[component ${name} parentIndex success]`, parentComponentIndex)
  }
}

module.exports = { genComponent }
