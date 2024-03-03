const localesMaps = Object.freeze({
  en: "en",
  zh: "zh",
});

const locales = Object.values(localesMaps);

const localUrlReg = new RegExp(`\\.(${locales.join("|")})`);

const i18nLocaleOptions = [
  {
    key: localesMaps.zh,
    label: "中文",
    value: localesMaps.zh,
    iconFont: "icon-zhongwen",
  },
  {
    key: localesMaps.en,
    label: "English",
    value: localesMaps.en,
    iconFont: "icon-meiguoguoqi-",
  },
];

const i18nConfig = {
  localesMaps: localesMaps,

  locales: locales,

  /**
   * 默认语言
   */
  defaultLocale: locales[0],

  localUrlReg,

  options: i18nLocaleOptions,
};

module.exports = i18nConfig;
