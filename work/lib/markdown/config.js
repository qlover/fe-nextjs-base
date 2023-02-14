const { join } = require('path')
const { workRootPath } = require('../../config/path.config')

module.exports = {
  mdContentRoot: join(workRootPath, 'sources/doc/markdown'),
  jsonOutputRoot: join(workRootPath, 'sources/mdJson')
}
