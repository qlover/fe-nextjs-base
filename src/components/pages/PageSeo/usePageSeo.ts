import type { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { PageSeoProps } from '.'
import useBaseSeo from './useBaseSeo'

/**
 * 获取页面 seo 信息
 *
 * @param props
 * @returns
 */
export default function usePageSeo(props?: PageSeoProps) {
  const { keywords, isCanonical = true, ...nextSeoProps } = props || {}

  const { additionalLinkTags, additionalMetaTags } = nextSeoProps

  const { asPath } = useRouter()

  const baseSeo = useBaseSeo(props)

  // link tag ======================
  const LinkTags = useMemo(() => {
    const result = additionalLinkTags ? [...additionalLinkTags] : []

    // link
    if (isCanonical) {
      result.push({
        rel: 'canonical',
        href: asPath
      })
    }

    return result
  }, [isCanonical, additionalLinkTags, asPath])

  // meta tag ===========================
  const MetaTags = useMemo(() => {
    const result = additionalMetaTags ? [...additionalMetaTags] : []

    // keywords meta
    if (keywords) {
      result.push({
        name: 'keywords',
        content: keywords
      })
    }

    return result
  }, [keywords, additionalMetaTags])

  return {
    ...nextSeoProps,
    title: baseSeo.title,
    description: baseSeo.description,
    additionalLinkTags: LinkTags,
    additionalMetaTags: MetaTags,
    noindex: isCanonical ? true : nextSeoProps.noindex,
    nofollow: isCanonical ? true : nextSeoProps.nofollow
  } as NextSeoProps
}
