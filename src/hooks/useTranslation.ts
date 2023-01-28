import useNextTranslation from 'next-translate/useTranslation'

type TranslationResult<NS extends I18n.I18nNS> = {
  t: I18n.ExtendTranslate<
    string,
    // 指定 ns 则只有该指定 ns 下的键名, 如果不指定则为所有可用键名
    NS extends I18n.I18nNS ? I18n.LocalesTranMap[NS] : I18n.LocalesType
  >
  lang: I18n.Locale
}

/**
 * 替换 next-translate/useTranslation, 为了 typescript 提示😄
 * @overried
 * @param defaultNS
 * @returns
 */
export default function useTranslation<NS extends I18n.I18nNS>(defaultNS?: NS) {
  const i18n = useNextTranslation(defaultNS)

  return {
    t: i18n.t,
    lang: i18n.lang
  } as TranslationResult<NS>
}
