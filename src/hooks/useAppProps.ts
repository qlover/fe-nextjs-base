import { getDefaultLocale } from '@/utils/common/i18n'
import { useCallback } from 'react'

export type UseAppPropsType = {
  pageProps: Page.BaseProps
}

export default function useAppProps(initstate?: UseAppPropsType) {
  const pageProps = useCallback(() => {
    if (!initstate || !initstate.pageProps) {
      return {
        __lang: getDefaultLocale(),
        __namespaces: {}
      } as UseAppPropsType['pageProps']
    }
    return initstate.pageProps
  }, [initstate?.pageProps])

  return {
    pageProps
  }
}
