import { AppPropsContainer } from '@/components/container'
import { getI18nComponents } from '@/components/i18n/utils'
import { useMemo } from 'react'
import useI18n from './useI18n'

type UseI18nComponentProps = {
  dataSources?: Page.BaseProps['__namespaces']
  i18nNS?: I18n.I18nNS
}

/**
 * 获取 locales 中 i18n 对象组件类型 其类型为 `I18nComponent.Base`
 *
 * @param param0
 * @returns
 */
export default function useI18nComponents({
  i18nNS,
  dataSources
}: UseI18nComponentProps = {}) {
  const i18n = useI18n(i18nNS)

  const { i18Ns, lang, router } = i18n
  const { pageProps } = AppPropsContainer.useContainer()

  const components = useMemo(() => {
    const sources = dataSources || pageProps().__namespaces || {}
    const values = sources[i18Ns]
    return getI18nComponents(lang, i18Ns, values)
  }, [lang, i18Ns, router.pathname])

  return { components, ...i18n }
}
