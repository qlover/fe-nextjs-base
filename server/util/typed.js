function toTsType(strs) {
  return strs.map((i) => "'" + i + "'").join(' | ')
}

function arrayToTypes(arr) {
  return arr
    .map((item) => {
      return `'${item}'`
    })
    .sort()
    .join(' | ')
}

module.exports = {
  toTsType,
  arrayToTypes
}
