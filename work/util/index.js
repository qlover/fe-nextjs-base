const filesUtil = require('./files')
const toolsUtil = require('./tools')
const prePathUtil = require('./prePath')
const typedUtil = require('./typed')

module.exports = {
  ...filesUtil,
  ...toolsUtil,
  ...prePathUtil,
  ...typedUtil
}
