import useNextTranslation from 'next-translate/useTranslation';

/**
 * 替换 next-translate/useTranslation, 为了 typescript 提示😄
 * @overried
 * @param defaultNS
 * @returns
 */
export default function useTranslation(defaultNS?: LocalApp.Locales) {
  const i18n = useNextTranslation(defaultNS);
  return i18n;
}
