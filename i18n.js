module.exports = {
  /** @type I18n.LocalesType */
  locales: ['en', 'zh'],

  /** @type I18n.Locale */
  defaultLocale: 'en',

  // 禁止本地检测
  localeDetection: false,

  /** @type I18n.PagesType */
  pages: {
    /**
     * common 公共 i18n
     *
     * _rvdata 本地使用通用数据，比如header,footer
     */
    '*': ['common', '_rvdata'],

    // 单独页面
    '/': ['index']
    // "/vpn-ios": ["vpn-ios"],
    // "/vpn-android": ["vpn-android"],
    // "/vpn-windows": ["vpn-windows"],

    // "/pricing": ["pricing"],
    // "/xmas-sale": ["xmas-sale"],

    // // userAuth 为所有用户相关页面
    // "/login": ["userAuth"],
    // "/register": ["userAuth"],
    // "/register-result": ["register-result"],
    // "/forgot-password": ["userAuth"],
    // "/change-password": ["userAuth"],
    // "/reset-password": ["userAuth"],
    // // 博客页面
    // "rgx:^/blog": ["blog"],
    // // 用户管理页面
    // "rgx:^/account": ["account"],
    // // affiliate 页面
    // "/affiliate": ["affiliate"],
    // "/affiliate/register": ["affiliate-register"],
    // "/affiliate/account": ["affiliate-account"],
    // "/affiliate/account/transaction": ["affiliate-account"],
    // "/affiliate/account/withdrawal": ["affiliate-account"],

    // "/affiliate/login": ["affiliate-login"],
    // "/affiliate/agreement": ["affiliate-agreement"],
    // "/redeem": ["redeem"],
    // "/about-us": ["about-us"],
    // "/eula": ["eula"],
    // "/awards": ["awards"],
    // "/what-is-my-ip-address": ["what-is-my-ip-address"],
    // "/update": ["update"],
    // "/checkout": ["checkout"],
    // "/unavailable": ["unavailable"],
    // "/privacy": ["privacy"],
    // "/refund-policy": ["refund-policy"],
    // "/terms": ["terms"],
    // "/pay-success": ["pay-success"],
    // "/pay-fail": ["pay-fail"],

    // "rgx:^/support": ["support"],
    // // md 页面, 不会收到 pageProps
  }
}
