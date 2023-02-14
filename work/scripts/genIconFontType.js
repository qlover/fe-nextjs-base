const { default: axios } = require('axios')
const { writeFileSync } = require('fs')
const { join } = require('path')
const { rootPath } = require('../config/path.config')
const { prePath } = require('../util/prePath')
const classNamesReg = /(\.?([a-zA-Z0-9-])+(:before))/g
const iconFontJson = require('../config/iconFont.json')

function createIconFont(types) {
  const iconFontPath = prePath(join(rootPath, 'src/components/common/IconFont'))
  const indexPath = join(iconFontPath, 'index.tsx')
  writeFileSync(
    indexPath,
    `import iconFontJson from 'work/config/iconFont.json';
import { createFromIconfontCN } from '@ant-design/icons';

export type IconFontType = ${types};

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const IconFont = createFromIconfontCN<IconFontType>({
  scriptUrl: iconFontJson.js,
});

export default IconFont;
`
  )

  return indexPath
}

function genIconFontType(params) {
  axios(iconFontJson.css).then((cssText) => {
    const cssTextStr = cssText.data
    if (typeof cssTextStr === 'string') {
      const iconTypes = cssTextStr
        .match(classNamesReg)
        .map((className) => {
          return "'" + className.replace('.', '').replace(':before', '') + "'"
        })
        .join(' | ')
      const indexPath = createIconFont(iconTypes)

      console.log('[genIconFontType] success', indexPath)
    }
  })
}

module.exports = { genIconFontType }
