const fs = require('fs')
const { join } = require('path')
const { firstCaseUpper } = require('../util/tools')
const { mkdirsSync, isDir, fillFileName, delDir } = require('../util/files')
const {
  svgAssetsPath,
  svgIconOutputPath,
  svgAssetsSrcPath
} = require('../config/path.config')

const componentRoot = svgIconOutputPath

function createComName(name) {
  return `IconSvg${name}`
}

function genSvgIconTpl(componentName, fileName, comName) {
  return `import ${comName} from '@${svgAssetsSrcPath}/${fileName}.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const ${componentName} = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={${comName}} />
);

${componentName}.displayName = '${componentName}';

export default ${componentName};
`
}

let componentList = []

function genSvgIconIndexTpl() {
  const comps = componentList.map(
    ([comName, fileName]) =>
      `export { default as ${comName} } from './${fileName}'`
  )

  return `import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export type IconSvgBaseProps = Omit<IconComponentProps, 'component' | 'ref'>;

${comps.join('\n')}
`
}

function createIconSvgFile(filename) {
  const fileName = filename.replace('.svg', '')
  const componentName = firstCaseUpper(fileName)
  const componentFileName = fillFileName(componentName, '.tsx')
  const componentPath = join(componentRoot, componentFileName)
  const expComponentName = createComName(componentName)

  if (fs.existsSync(componentPath)) {
    console.log('[exists]', componentPath)
  } else {
    const filecontent = genSvgIconTpl(expComponentName, fileName, componentName)
    fs.writeFileSync(componentPath, filecontent)
    console.log('[creted]', componentPath)
  }

  componentList.push([expComponentName, componentName])
}

async function genSvgIconComponent() {
  await isDir(svgAssetsPath)

  if (fs.existsSync(componentRoot)) {
    delDir(componentRoot)
  }
  mkdirsSync(componentRoot)

  const files = fs.readdirSync(svgAssetsPath)

  files.forEach((filename) => {
    try {
      createIconSvgFile(filename)
    } catch (e) {
      console.log(`genSvgComponent ${filename} Error`, e)
    }
  })

  // 创建 index.tsx
  // TODO: 导出文件
  const filePath = join(componentRoot, 'index.tsx')

  fs.writeFileSync(filePath, genSvgIconIndexTpl())

  console.log('[svgIcon success]', filePath)
}
module.exports = { genSvgIconComponent }
