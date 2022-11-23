import { isFunction, isString } from 'lodash';
import Link, { LinkProps } from 'next/link';
import {
  AnchorHTMLAttributes,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
export type AProps = BaseComponent.UI &
  Omit<LinkProps, 'href'> & {
    href?: RenderValue.HrefType;
  } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * 1. 主要解决 next link 组件 className 不生效问题
 * 2. 解决 link 组件事件问题
 *
 * 如果有多个节点 `Link` 组件会存在问题 `https://nextjs.org/docs/messages/link-multiple-children`
 *
 * TIP: 因为部分链接可以动态生成, 所以将 href 指定为 `HrefType`, 但是一定小心使用方式, 组件内部应该分开处理
 *
 * TODO: 支持全路径，以及 url 语言替换
 *
 * @param param0
 * @returns
 */
const A: FC<PropsWithChildren<AProps>> = ({
  children,
  // link 属性
  as,
  replace,
  // soft,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  legacyBehavior,
  onMouseEnter,
  href,

  // 原生 a 标签属性
  ...aProps
}) => {
  const LinkProps = {
    as,
    replace,
    // soft,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    legacyBehavior,
    onMouseEnter,
  };

  // 为了解决 client 可动态更新 href,从外部传入 href每一次都更新
  // #tag2: FIXME: 其他办法解决 client 动态更新 href
  const [_href, set_href] = useState<RenderValue.Href>(() => {
    // 如果需要动态创建，则需要交给 useEffect 生成
    if (!href || isFunction(href)) {
      return '#';
    }

    return href;
  });
  useEffect(() => {
    if (isFunction(href)) {
      set_href(href || '#');
    }
    // 动态改变的链接
    else if (href && isString(href)) {
      set_href(href);
    }
  }, [href]);

  return (
    <Link {...LinkProps} {...aProps} href={_href}>
      {children}
    </Link>
  );
};

export default A;
