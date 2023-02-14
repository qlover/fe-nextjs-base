const appConfig = require('../app.config')

/**
 * nextjs 自定义路由重定向路由表
 *
 * @type { import('next/dist/lib/load-custom-routes').Redirect[]}
 */
const RewritesRedirects = [
  /**
   * @target static:redirect
   */
  {
    locale: false,
    source: '/zh/test/dynamic/:slug*',
    destination: '/test/dynamic/:slug*',
    permanent: true
  }
]

if (appConfig.redirectDefaultLocales) {
  RewritesRedirects.push({
    /**
     * 默认语言重定向当前语言去掉语言前缀
     */
    source: `/${appConfig.i18n.defaultLocale}/:path*`,
    destination: '/:path*',
    permanent: false
  })
}

module.exports = { RewritesRedirects }
