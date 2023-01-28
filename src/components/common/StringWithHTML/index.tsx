import { domDataCompoent } from '@/utils/client'
import classNames from 'classnames'
import { isHTMLString } from 'maroonlis-utils'
import { createElement, ReactNode } from 'react'

type StringWithHtmlProps = { value?: ReactNode } & Component.UI & Component.AS

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
  style
}: StringWithHtmlProps): JSX.Element {
  if (value && isHTMLString(value)) {
    return createElement(as, {
      className: classNames('isHtml', className),
      style: style,
      dangerouslySetInnerHTML: { __html: value },
      ...domDataCompoent('StringWithHTML')
    })
  }

  return createElement(
    as,
    {
      className: className,
      style: style,
      ...domDataCompoent('StringWithHTML')
    },
    value
  )
}
