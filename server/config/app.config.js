const appConfig = {
  /**
   * 是否重定向默认 locale
   *
   * @example `i18n.defaultLocale` is 'en'  `/en/test -> /test`
   */
  redirectDefaultLocales: true,

  /**
   * 国际化配置
   */
  i18n: {
    /** @type I18n.LocalesType */
    locales: ['en', 'zh'],

    /** @type I18n.Locale */
    defaultLocale: 'en',

    /**
     * 默认是否使用本地化语言
     */
    localeDetection: false,
  }
}

module.exports = { appConfig }
