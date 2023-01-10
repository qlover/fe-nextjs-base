import seoConfig from '@/config/seoConfig.json'
import { useMemo } from 'react'
import useI18n from './useI18n'

import type { UseI18nProps } from './useI18n'

const {
  localeSeoDescKey,
  localeSeoTitleKey,
  localeSeoKeywordKey,
  title,
  description,
  keywords
} = seoConfig

/**
 * 获取页面 seo 信息
 *
 * @param props
 * @returns
 */
export default function usePageSeo(props?: UseI18nProps) {
  const { t, locale } = useI18n(props)

  const seoResult = useMemo(() => {
    return {
      title: t(localeSeoTitleKey) || title,
      description: t(localeSeoDescKey) || description,
      keywords: t(localeSeoKeywordKey) || keywords
    }
  }, [locale])

  return seoResult
}
