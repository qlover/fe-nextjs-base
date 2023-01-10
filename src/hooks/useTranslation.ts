import useNextTranslation from "next-translate/useTranslation";

/**
 * 替换 next-translate/useTranslation, 为了 typescript 提示😄
 * @overried
 * @param defaultNS
 * @returns
 */
export default function useTranslation(defaultNS?: I18n.I18nNS) {
  const i18n = useNextTranslation(defaultNS);

  return {
    ...i18n,
    lang: i18n.lang as I18n.Locale,
  };
}
