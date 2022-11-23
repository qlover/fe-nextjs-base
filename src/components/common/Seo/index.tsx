import { fillHrefWithLocale } from '@/utils/client/host';
import { NextSeo, NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import { FC } from 'react';

export type SeoProps = NextSeoProps & {
  /**
   * 快捷 生成 meta keywords
   */
  keywords?: string;
  /**
   * 是否增加 `<link rel="canonical" href=""/>`
   *
   * true 时页面的 robots 默认为 noindex,nofllow
   *
   * 默认 true
   */
  isCanonical?: boolean;
};
const Seo: FC<SeoProps> = ({
  keywords,
  isCanonical = true,
  ...nextSeoProps
}) => {
  const { asPath, locale } = useRouter();

  const { additionalLinkTags = [], additionalMetaTags = [] } = nextSeoProps;
  const _LinkTags = [...additionalLinkTags];
  const _MetaTags = [...additionalMetaTags];

  // link rel="canonical
  if (isCanonical) {
    _LinkTags.push({
      rel: 'canonical',
      href: fillHrefWithLocale(asPath, locale as LocalApp.Lang),
    });
  }

  // keywords meta
  if (keywords) {
    _MetaTags.push({
      name: 'keywords',
      content: keywords,
    });
  }

  // 增加 测试环境 访问 https 拦截问题
  // if (appConfig.appEnv !== 'master') {
  //   _MetaTags.push({
  //     // @ts-ignore
  //     'http-equiv': 'Content-Security-Policy',
  //     content: 'upgrade-insecure-requests',
  //   });
  // }

  return (
    <NextSeo
      noindex={!isCanonical}
      nofollow={!isCanonical}
      title={'Sonics VPN'}
      {...nextSeoProps}
      additionalLinkTags={_LinkTags}
      additionalMetaTags={_MetaTags}
    />
  );
};

export default Seo;
