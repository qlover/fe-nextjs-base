require('./scripts/initProject')
const nextTranslate = require('next-translate')
const withLess = require('next-with-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/
})

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: false,

  /**
   * 可将 /next/static 配置到 cdn
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
   */
  // assetPrefix: 'https://cdn.xxxx.com',

  webpack(config) {
    // 增加 svg 加载
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config
  },

  // 支持 mdx
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
}

module.exports = nextTranslate(
  withBundleAnalyzer(withLess(withMDX(nextConfig)))
)
