import useTranslation from './useTranslation'

/**
 * 使用 common 通用 tans
 * @returns
 */
export default function useI18nCommon() {
  const trans = useTranslation('common')

  return {
    commonT: trans.t,
    lang: trans.lang
  }
}
