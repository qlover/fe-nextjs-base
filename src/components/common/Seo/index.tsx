import { NextSeo, NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { FC } from 'react'

export type SeoProps = NextSeoProps & {
  /**
   * 快捷 生成 meta keywords
   */
  keywords?: string

  /**
   * 是否增加 `<link rel="canonical" href=""/>`
   *
   * true 时页面的 robots 默认为 noindex,nofllow
   *
   * 默认 true
   */
  isCanonical?: boolean
}

const Seo: FC<SeoProps> = ({
  keywords,
  isCanonical = true,
  ...nextSeoProps
}) => {
  const { asPath } = useRouter()

  const { additionalLinkTags = [], additionalMetaTags = [] } = nextSeoProps
  const _LinkTags = [...additionalLinkTags]
  const _MetaTags = [...additionalMetaTags]

  // link rel="canonical
  // TODO: canonical url
  if (isCanonical) {
    _LinkTags.push({
      rel: 'canonical',
      href: asPath
    })
  }

  // keywords meta
  if (keywords) {
    _MetaTags.push({
      name: 'keywords',
      content: keywords
    })
  }

  return (
    <NextSeo
      noindex={!isCanonical}
      nofollow={!isCanonical}
      {...nextSeoProps}
      additionalLinkTags={_LinkTags}
      additionalMetaTags={_MetaTags}
    />
  )
}

export default Seo
