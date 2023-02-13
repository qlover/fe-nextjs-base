import { getI18nComponents } from '@/components/i18n/utils'
import { useMemo } from 'react'
import useI18n from './useI18n'
import useI18nNamespace from './useI18nNamespace'

type UseI18nComponentProps = {
  dataSources?: Page.I18nNamespaceType
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
  const { i18Ns, lang } = useI18n(i18nNS)
  const sources = useI18nNamespace(i18nNS ? [i18nNS] : i18nNS)

  const components = useMemo(() => {
    const values = (dataSources || sources)[i18Ns]
    return getI18nComponents(lang, i18Ns, values)
  }, [sources])

  return { components }
}
