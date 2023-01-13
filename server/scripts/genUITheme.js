const { join } = require('path')
const { preTypingsRootPath, arrayToTypes } = require('../util')
const { UIThemeMode } = require('../config')
const { writeFileSync } = require('fs')

function typedFile(types) {
  return `declare namespace UITheme {
  type ThemeMode = ${types}
}  
`
}

/**
 * 生成主题类型 UITheme.d.ts
 */
function genUITheme() {
  const filePath = join(preTypingsRootPath(), 'UITheme.d.ts')
  writeFileSync(filePath, typedFile(arrayToTypes(UIThemeMode)))

  console.log('[UITheme.d.ts success]', filePath)
}

module.exports = { genUITheme }
