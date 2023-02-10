const nextPkg = require('next/package.json')
const { watchLocales } = require('../scripts/watch/watchLocales')

watchLocales()

console.log('[node version]', process.version)
console.log('[next version]', nextPkg.version)
