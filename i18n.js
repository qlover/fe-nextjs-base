const { appConfig } = require('./server/config')

module.exports = {

  ...appConfig.i18n,

  /**
   * 原则上是一个页面路由对应单独 locale 文件
   *
   * @type I18n.PagesType
   */
  pages: {
    /**
     * common 公共 i18n
     *
     */
    '*': ['common'],

    // 单独页面
    '/': ['index'],

    '/test': ['test']
  }
}
