import { domDataCompoent, mapChildren } from '@/utils/client'
import classNames from 'classnames'
import { isEmptyPropsValue } from 'maroonlis-utils'
import { createElement, CSSProperties } from 'react'
import css from './index.module.less'

type CellProps = Component.UIChildren<
  Component.AS & {
    order?: number
  }
>
type ArrangeProps<T> = Component.WithChildren<
  Component.ListComponet<T> &
    Component.AS & {
      /**
       * 小尺寸占一列默认 false
       */
      miniSingle?: boolean

      getCellProps?: (props: {
        item: T
        index: number
        key: string
        defaultNode?: React.ReactNode
      }) => CellProps

      style?: {
        '--space-x'?: CSSProperties['marginLeft']
        '--space-y'?: CSSProperties['marginLeft']
        '--space'?: CSSProperties['marginLeft']
        '--column'?: CSSProperties['order']
        '--cell-width'?: CSSProperties['width']
      } & CSSProperties
    }
>

/**
 * 通用核心组件, 用来排列布局
 *
 * 原型 FlexList 组件
 *
 * --space-x: 1rem;
 * --space-y: 1rem;
 *
 * --space:1.6rem;
 * --column: 1;
 * --cell-width: 100%;
 *
 *
 *
 * ```
 * <Arrange>
 *
 * </Arrange>
 * ```
 * @returns
 *
 */
function Arrange<T>({
  options,
  children,
  renderCell,
  className,
  miniSingle,
  style,
  as = 'div',
  getCellProps,
  ...restProps
}: ArrangeProps<T>) {
  return createElement(
    as,
    {
      ...domDataCompoent('Arrange'),
      className: classNames(
        css['Arrange'],
        {
          [css['single']]: miniSingle
        },
        className
      ),
      style: style,
      ...restProps
    },

    children ||
      mapChildren(options, (props) => {
        const cellProps = getCellProps?.(props)
        return (
          <ArrangeCell key={props.key} {...cellProps}>
            {renderCell?.(props)}
          </ArrangeCell>
        )
      })
  )
}

function ArrangeCell({ children, as = 'div', order, ...rprops }: CellProps) {
  const props = {
    ...domDataCompoent('ArrangeCell'),
    ...rprops,
    style: isEmptyPropsValue(order) ? rprops.style : { order, ...rprops.style }
  }
  return createElement(as, props, children)
}

Arrange.Cell = ArrangeCell

export default Arrange
