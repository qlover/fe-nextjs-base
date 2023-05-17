const {
  statSync,
  stat,
  mkdirSync,
  existsSync,
  readdirSync,
  unlinkSync,
  rmdirSync,
  writeFileSync,
  readFileSync
} = require('fs')
const { isPlainObject } = require('lodash')

const { dirname, join } = require('path')
const { sortPlainObject } = require('./tools')

function fillFileName(filename, ext) {
  return filename + ext
}
function isDir(path) {
  return new Promise((reslove, reject) => {
    stat(path, function (err, stats) {
      if (err) {
        reject(err)
        return
      }

      if (stats.isDirectory()) {
        reslove(stats)
        return
      }
      reject()
    })
  })
}

function isDirAsync(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    return stat
  }
}

function isFile(path) {
  return new Promise((reslove, reject) => {
    stat(path, function (err, stats) {
      if (err) {
        reject(err)
        return
      }

      if (stats.isFile()) {
        reslove(stats)
        return
      }
      reject()
    })
  })
}

function isFileAsync(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    return stat
  }
}

// 递归创建目录 同步方法
function mkdirsSync(dir) {
  if (existsSync(dir)) {
    return true
  } else {
    if (mkdirsSync(dirname(dir))) {
      mkdirSync(dir)
      return true
    }
  }
}

/**
 * 删除目录
 * @param {*} path
 */
function delDir(path) {
  let files = []
  if (existsSync(path)) {
    files = readdirSync(path)
    files.forEach((file, index) => {
      let curPath = join(path, file)
      if (statSync(curPath).isDirectory()) {
        delDir(curPath) //递归删除文件夹
      } else {
        unlinkSync(curPath) //删除文件
      }
    })
    rmdirSync(path)
  }
}

/**
 * 排序 json 文件内容
 * @param {*} path
 * @param {*} compareFn
 */
function sortJsonFile(path, compareFn) {
  const localeJson = getJsonFile(path)
  const result = sortPlainObject(localeJson, compareFn)
  writeFileSync(path, JSON.stringify(result, null, 2) + '\n')
}

/**
 * 获取 json 文件内容
 * @param {*} path
 * @returns
 */
function getJsonFile(path) {
  try {
    let result = readFileSync(path).toString()
    result = JSON.parse(result)
    return isPlainObject(result) ? result : {}
  } catch {
    // Unexpected end of JSON input
    return {}
  }
}

/**
 * 读取文件内容为字符串
 * @param {*} path
 * @returns
 */
function readFileWithString(path) {
  return readFileSync(path, 'utf-8').toString()
}

module.exports = {
  fillFileName,
  isDir,
  isDirAsync,
  isFile,
  isFileAsync,
  mkdirsSync,
  delDir,
  sortJsonFile,
  getJsonFile,
  readFileWithString
}
