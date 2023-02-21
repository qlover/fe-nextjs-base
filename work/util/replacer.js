const PLAINOBJECT_REG = /([a-zA-Z0-1]+\s*=\s*)(\{[\s\S]+})/
function replacePlainObject(content, replacer) {
  if (PLAINOBJECT_REG.test(content)) {
    return content.replace(PLAINOBJECT_REG, replacer)
  }
  return content + '\n' + replacer
}

/**
 * 替换 js 内容中的 varname 指定的普通对象内容
 *
 * 如果没有找到则追加到内容末尾
 *
 * @param {*} varname
 * @param {*} value
 * @returns
 */
function replaceJSExpressionsPlainObject(content, varname, value) {
  const reg = new RegExp(`((${varname})\\s*=\\s*)(\{[\\s\\S]+\})`)
  const target = JSON.stringify(value, null, 2)
  const expressions = `${varname} = ${target}`
  if (reg.test(content)) {
    return content.replace(reg, expressions)
  }
  return content + '\n' + expressions
}

module.exports = {
  replacePlainObject,
  replaceJSExpressionsPlainObject
}
