module.exports = {
  /** @type I18n.LocalesType */
  locales: ['en', 'zh'],

  /** @type I18n.Locale */
  defaultLocale: 'en',

  // 禁止本地检测
  localeDetection: false,

  /**
   * 原则上是一个页面路由对应单独 locale 文件
   *
   * @type I18n.PagesType
   */
  pages: {
    /**
     * common 公共 i18n
     *
     * _rvdata 本地使用通用数据，比如header,footer
     */
    '*': ['common', '_rvdata'],

    // 单独页面
    '/': ['index']
  }
}
