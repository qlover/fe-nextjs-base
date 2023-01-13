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

module.exports = RewritesRedirects
