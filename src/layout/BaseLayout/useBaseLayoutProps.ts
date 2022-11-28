/* eslint-disable react-hooks/exhaustive-deps */
import useTranslationRouter from '@/hooks/useTranslationRouter';
import { BaseLayoutProps } from '.';

export default function useBasicLayoutProps(props: BaseLayoutProps) {
  const { t, i18Ns } = useTranslationRouter(props.defaultNS);

  const seoProps = {
    title: t('seo_title', null, { default: '' }),
    description: t('seo_desc', null, { default: '' }),
    keywords: t('seo_keywords', null, { default: '' }),
  };

  const BasicProps = {
    ...props,
    seoProps: {
      ...seoProps,
      ...props.seoProps,
    },
  };
  return BasicProps as BaseLayoutProps;
}
