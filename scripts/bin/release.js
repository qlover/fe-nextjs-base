const { exec } = require('child_process')
const { join } = require('path')
const { rootPath } = require('../config/path.config')

function main() {
  exec('node ' + join(rootPath, 'node_modules/release-it/bin/release-it'))
}

main()
