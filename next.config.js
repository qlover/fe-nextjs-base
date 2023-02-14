require('./work/bin/initProject')
const nextTranslate = require('next-translate')
const withLess = require('next-with-less')
const { serverNextConfig } = require('./work/config/next')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/
})

module.exports = nextTranslate(
  withBundleAnalyzer(withLess(withMDX(serverNextConfig)))
)
