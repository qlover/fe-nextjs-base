const { RewritesRedirects } = require('./RewritesRedirects')

/** @type {import('next').NextConfig} */
const serverNextConfig = {
  reactStrictMode: true,

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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  async redirects() {
    return RewritesRedirects
  }
}

module.exports = {
  serverNextConfig
}
