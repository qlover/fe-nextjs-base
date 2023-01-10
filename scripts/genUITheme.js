const { writeFileSync, existsSync } = require('fs')
const { join } = require('path')
const { typingsRootPath } = require('./config/path.config')
const { UIThemeMode } = require('./config/ui.config')
const { arrayToTypes } = require('./util/typed')
const { mkdirsSync } = require('./util/files')
const { preTypingsRootPath } = require('./util/prepath')

function typedFile(types) {
  return `declare namespace UITheme {
  type ThemeMode = ${types}
}  
`
}

function genUITheme() {
  const filePath = join(preTypingsRootPath(), 'UITheme.d.ts')
  writeFileSync(filePath, typedFile(arrayToTypes(UIThemeMode)))

  console.log('[created success]', filePath)
}

genUITheme()
