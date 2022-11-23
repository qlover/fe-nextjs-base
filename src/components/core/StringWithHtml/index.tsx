import domData from '@/utils/client/domData';
import classNames from 'classnames';
import { isHTMLString } from 'maroonlis-utils';
import { createElement, ReactNode } from 'react';

type StringWithHTMLProps = { value?: ReactNode } & BaseComponent.UI &
  BaseComponent.AS;
/**
 *
 * TODO 抽离 as 渲染逻辑
 *
 * @param param0
 * @returns {JSX.Element}
 */
export default function StringWithHTML({
  as = 'div',
  value,
  className,
  style,
}: StringWithHTMLProps) {
  if (value && isHTMLString(value)) {
    return createElement(as, {
      className: classNames('string-with-html isHtml', className),
      style: style,
      dangerouslySetInnerHTML: { __html: value },
      ...domData.compoent('StringWithHTML'),
    });
  }

  return createElement(
    as,
    {
      className: classNames('string-with-html', className),
      style: style,
      ...domData.compoent('StringWithHTML'),
    },
    value
  );
}
