import type { NextSeoProps } from 'next-seo'
import { FC } from 'react'

export type PageSeoProps = NextSeoProps & {
  i18nNS?: I18n.I18nNS
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

const PageSeo: FC<PageSeoProps> = () => {
  return <div className="PageSeo-wrapper"></div>
}

export default PageSeo
