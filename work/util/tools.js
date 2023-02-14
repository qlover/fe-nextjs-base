const { isString } = require('lodash')

function firstCaseUpper(title) {
  if (isString(title) && title.length > 0) {
    return title.slice(0, 1).toUpperCase() + title.slice(1)
  }
  return title
}

/**
 * 对象按键值对排序显示
 * @param {*} obj 
 * @returns 
 */
function sortPlainObject(obj, compareFn) {
  const result = {}
  Object.keys(obj).sort(compareFn).forEach((key) => {
    result[key] = obj[key]
  })
  return result
}

module.exports = { firstCaseUpper, sortPlainObject }
