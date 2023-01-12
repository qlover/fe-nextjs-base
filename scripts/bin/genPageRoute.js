// 生成所有非动态路由 pathname
const { readdirSync, statSync, writeFileSync } = require('fs')
const { join } = require('path')
const { prePagesRootPath, preTypingsRootPath } = require('../util/prepath')
const { arrayToTypes } = require('../util/typed')

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

function main() {
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
  const filePath = join(preTypingsRootPath(), 'PageRoute.d.ts')
  writeFileSync(
    filePath,
    typedFile(arrayToTypes(subPages), arrayToTypes(staticPagePath))
  )

  console.log('[created success]', filePath)
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

main()
