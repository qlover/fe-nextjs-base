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
      title: t(localeSeoTitleKey as any) || title || seoConfig.title,
      description:
        t(localeSeoDescKey as any) || description || seoConfig.description,
      keywords: t(localeSeoKeywordKey as any) || keywords || seoConfig.keywords
    }
  }, [locale])

  return seoResult
}
