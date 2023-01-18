import useNextTranslation from 'next-translate/useTranslation'

import type { TranslationQuery } from 'next-translate'

type ExtendTranslate<T = string, TKeys = string> = (
  i18nKey: TKeys,
  query?: TranslationQuery | null,
  options?: {
    returnObjects?: boolean
    fallback?: string | string[]
    default?: string
    ns?: string
  }
) => T

/**
 * 替换 next-translate/useTranslation, 为了 typescript 提示😄
 * @overried
 * @param defaultNS
 * @returns
 */
export default function useTranslation<NS extends I18n.I18nNS>(defaultNS?: NS) {
  const i18n = useNextTranslation(defaultNS)

  return {
    ...i18n,
    trans: i18n.t,
    t: i18n.t as ExtendTranslate<string, I18n.LocalesTranMap[NS]>,
    lang: i18n.lang as I18n.Locale
  }
}
