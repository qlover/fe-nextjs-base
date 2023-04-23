const { join } = require('path')

/**
 * 项目根路径
 */
const rootPath = join(__dirname, '../../')

/**
 * work 根目录
 */
const workRootPath = join(rootPath, 'work')

/**
 * src 根目录
 */
const srcRootPath = join(rootPath, 'src')

/**
 * 组件根路径
 */
const componentRoot = join(rootPath, 'src/components')

/**
 * 类型文件根路径
 */
const typingsRootPath = join(srcRootPath, 'typings')

/**
 * svg 资源相对 src 相对路径
 */
const svgAssetsSrcPath = '/assets/svgIcon'

/**
 * svg 图标 资产目录
 */
const svgAssetsPath = join(rootPath, 'src', svgAssetsSrcPath)

/**
 * svg 图标输出目录
 */
const svgIconOutputPath = join(rootPath, 'src/components/common/SvgIcon')

/**
 * img icon 资源 src 相对路径
 */
const imgIconAssetsSrcPath = '/assets/imgIcon'

/**
 * img 图标资产目录
 */
const imgIconAssetsPath = join(rootPath, 'src', imgIconAssetsSrcPath)

/**
 * img 图标输出目录
 */
const imgIconAssetsOutputPath = join(rootPath, 'components/common/ImgIcon')

/**
 * 国际化根路径
 */
const localeRootPath = join(rootPath, 'locales')

/**
 * 页面组件根路径
 */
const pageRootPath = join(srcRootPath, 'pages')

/**
 * !!! 相对根目录的 md 页面存放位置，主要用于 nextjs page 生成 md 使用
 */
const markdownSourcePath = 'work/sources/markdown'

module.exports = {
  rootPath,
  workRootPath,
  srcRootPath,
  componentRoot,
  typingsRootPath,
  svgAssetsSrcPath,
  svgAssetsPath,
  svgIconOutputPath,
  imgIconAssetsSrcPath,
  imgIconAssetsPath,
  imgIconAssetsOutputPath,
  localeRootPath,
  pageRootPath,
  markdownSourcePath
}
