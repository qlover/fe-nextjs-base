import { AppPropsContainer } from '@/components/container'
import { isArray, pick } from 'lodash'
import { useMemo } from 'react'
import useI18n from './useI18n'

/**
 * 获取 i18n 对应的 json 源内容
 *
 * 因为 nextjs 是通过 props 将 __namespace 传递给 i18n, 只建议用于获取对象形式的数据
 *
 * @returns
 */
export default function useI18nNamespace(ns?: I18n.I18nNS | I18n.I18nNS[]) {
  const { pageProps } = AppPropsContainer.useContainer()
  const { locale } = useI18n()

  // const [Nss, setNss] = useState<Page.I18nNamespaceType>({} as unknown as any)

  // useStrictEffect(() => {
  //   const nss = pageProps().__namespaces
  //   setNss(ns ? pick(nss, isArray(ns) ? ns : [ns]) : nss)
  // }, [locale])

  const Nss = useMemo(() => {
    const nss = pageProps().__namespaces
    return ns ? pick(nss, isArray(ns) ? ns : [ns]) : nss
  }, [locale])

  return Nss
}
