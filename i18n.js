module.exports = {
  /** @type Array<LocalApp.Lang> */
  locales: ['en'],
  defaultLocale: 'en',

  /** @type LocalApp.i18nPage */
  pages: {
    '*': ['common'],
    '/': ['index'],
    '/400': ['404'],
    '/500': ['500'],
  },
};
