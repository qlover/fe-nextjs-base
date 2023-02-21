// 生成所有非动态路由 pathname
const {
  readdirSync,
  statSync,
  writeFileSync,
  readFileSync,
  existsSync
} = require('fs')
const { isPlainObject } = require('lodash')
const { firstCaseUpper } = require('maroonlis-utils')
const { join } = require('path')
const { srcRootPath } = require('../config/path.config')
const {
  prePagesRootPath,
  preTypingsRootPath,
  arrayToTypes,
  prePath,
  isFileAsync
} = require('../util')
const {
  replacePlainObject,
  replaceJSExpressionsPlainObject
} = require('../util/replacer')

const exts = ['jsx', 'tsx', 'md', 'mdx'].join('|')
const pageReg = new RegExp(`\.(${exts})$`)

const whiteList = /(_app|_document|api)/

const dynPage = /(\[.+\])/

function typedFile(types, stypes) {
  return `declare namespace PageRoute {
  type Path = ${types}

  type PathStatic = ${stypes}
}  
`
}

/**
 * 生成 pages 路由类型 PageRoute.d.ts
 */
function genPageRoute() {
  const pagesRootPath = prePagesRootPath()

  const result = []
  fileDisplaySync(pagesRootPath, result)

  const subPages = result
    .filter((path) => {
      if (pageReg.test(path) && !whiteList.test(path)) {
        return true
      }

      return false
    })
    .map((path) => {
      const newPath = path
        .split('pages')
        .pop()
        .replace(/\\/g, '/')
        .split('.')
        .shift()
        .replace('/index', '')
      if (newPath === '') {
        return '/'
      }
      return newPath
    })

  const staticPagePath = subPages.filter((path) => !dynPage.test(path))

  // 生成 PageRoute 类型
  let filePath = join(preTypingsRootPath(), 'PageRoute.d.ts')
  writeFileSync(
    filePath,
    typedFile(arrayToTypes(subPages), arrayToTypes(staticPagePath))
  )
  console.log('[PageRoute.d.ts success]', filePath)

  // 生成 PageRoute 配置
  const pathnames = toPathObject(subPages)
  const pathnamesContent = JSON.stringify(pathnames, null, 2)

  filePath = join(prePath(join(srcRootPath, 'config')), 'PageRoute.ts')
  let lastContent
  if (existsSync(filePath)) {
    lastContent = readFileSync(filePath, 'utf-8')
  }

  writeFileSync(
    filePath,
    lastContent
      ? replaceJSExpressionsPlainObject(lastContent, 'PageRoute', pathnames)
      : `\nexport const PageRoute = ${pathnamesContent}\n`
  )

  console.log('[PageRoute.ts success]', filePath)
}

function toPathObject(routes) {
  const result = {}
  routes.forEach((route) => {
    result[routeToName(route)] = route
  })
  return result
}

function routeToName(route) {
  if (route === '/') {
    return 'root'
  }
  return route
    .split('/')
    .filter(Boolean)
    .map((slug, index) => {
      return index > 0 ? firstCaseUpper(slug) : slug
    })
    .join('')
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplaySync(filePath, result = []) {
  const files = readdirSync(filePath)

  files.forEach(function (filename) {
    //获取当前文件的绝对路径
    const filedir = join(filePath, filename)
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = statSync(filedir)

    if (stats.isFile()) {
      result.push(filedir)
    }
    if (stats.isDirectory()) {
      fileDisplaySync(filedir, result) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}

module.exports = { genPageRoute }
