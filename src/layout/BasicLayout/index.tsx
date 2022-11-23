import Seo, { SeoProps } from '@/components/common/Seo';
import PageFooter, { PageFooterProps } from '@/components/pages/PageFooter';
import PageHeader, { PageHeaderProps } from '@/components/pages/PageHeader';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import css from './index.module.less';

export type BasicLayoutProps = PropsWithChildren<{
  /**
   * seo 属性, `Seo` 组件属性
   */
  seoProps?: SeoProps;
  /**
   * 根节点 className
   */
  className?: string;

  /**
   * 主体内容 className
   */
  mainClassName?: string;

  /**
   * flase 不显示
   */
  footerProps?: false | PageFooterProps;

  /**
   * falase 不显示
   */
  headerProps?: false | PageHeaderProps;
}>;

const BasicLayout: FC<BasicLayoutProps> = ({
  seoProps,
  className,
  children,
  mainClassName,
  footerProps,
  headerProps,
}) => {
  return (
    <div className={classNames(css['BasicLayout-wrapper'], className)}>
      <Seo {...seoProps} />

      {headerProps === false ? null : <PageHeader {...headerProps} />}

      <main className={mainClassName}>{children}</main>

      {footerProps === false ? null : <PageFooter {...footerProps} />}
    </div>
  );
};

export default BasicLayout;
