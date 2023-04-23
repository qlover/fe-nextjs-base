const { join } = require('path')
const { workRootPath } = require('../../config/path.config')

module.exports = {
  mdContentRoot: join(workRootPath, 'sources/markdown'),
  jsonOutputRoot: join(workRootPath, 'sources/mdJson')
}
