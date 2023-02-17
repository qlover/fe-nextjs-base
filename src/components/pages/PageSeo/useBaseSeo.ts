import useI18n from '@/hooks/useI18n'
import { useMemo } from 'react'
import seoConfig from 'work/config/seoConfig.json'

import type { PageSeoProps } from '.'

const { localeSeoDescKey, localeSeoTitleKey, localeSeoKeywordKey } = seoConfig

export default function useBaseSeo(props?: PageSeoProps) {
  const { i18nNS, title, description, keywords } = props || {}
  const { t, locale } = useI18n(i18nNS)

  const seoResult = useMemo(() => {
    return {
      title: title || t(localeSeoTitleKey as any) || seoConfig.title,
      description:
        description || t(localeSeoDescKey as any) || seoConfig.description,
      keywords: keywords || t(localeSeoKeywordKey as any) || seoConfig.keywords
    }
  }, [locale, title, description, keywords])

  return seoResult
}
