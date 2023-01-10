import setLang from 'next-translate/setLanguage'
import { useCallback } from 'react'
import usePageRouter from './usePageRouter'
import useTranslation from './useTranslation'

export type UseI18nProps = {
  /**
   * 默认更据当前 路由对应 i18n.pages 中获取
   */
  i18nNS?: I18n.I18nNS
}

/**
 *
 * `useTranslation` 扩展
 *
 * 1. 包含路由信息 router
 * 2. 扩展类型
 * 3. 默认页面 locale
 *
 * ```
 * useI18n();
 * ```
 *
 * @param props
 *
 */
export default function useI18n(props?: UseI18nProps) {
  const { router, pageLocale } = usePageRouter()

  const trans = useTranslation(props?.i18nNS || pageLocale)
  const lang = trans.lang as I18n.Locale

  /**
   * 更新系统语言 快捷方法
   */
  const setLocale = useCallback((locale: I18n.Locale, reload = false) => {
    return setLang(locale).then(() => {
      // 增加切换 Locales 刷新页面
      if (reload) {
        window.location.reload()
      }
    })
  }, [])

  return {
    t: trans.t,
    router,
    i18Ns: pageLocale,
    lang,
    locale: lang,
    setLocale
  }
}
