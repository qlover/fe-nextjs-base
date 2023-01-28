const nextPkg = require('next/package.json')
const { watchLocales } = require('../scripts/watch/watchLocales')

watchLocales()

console.log('[next version]', nextPkg.version)
