import domData from '@/utils/client/domData';
import mapChildren from '@/utils/client/mapChildren';
import classNames from 'classnames';
import { isEmptyPropsValue } from 'maroonlis-utils';
import { createElement } from 'react';
import css from './index.module.less';

type ArrangeProps<T> = BaseComponent.WithChildren<
  BaseComponent.ListComponet<T> &
    BaseComponent.AS & {
      /**
       * 小尺寸占一列默认 false
       */
      miniSingle?: boolean;
    }
>;

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
  ...restProps
}: ArrangeProps<T>) {
  return createElement(
    as,
    {
      ...domData.compoent('Arrange'),
      className: classNames(
        css['Arrange'],
        {
          [css['single']]: miniSingle,
        },
        className
      ),
      style: style,
      ...restProps,
    },

    children ||
      mapChildren(options, (props) => {
        return <ArrangeCell key={props.key}>{renderCell?.(props)}</ArrangeCell>;
      })
  );
}

function ArrangeCell({
  children,
  as = 'div',
  order,
  ...rprops
}: BaseComponent.UIChildren<
  BaseComponent.AS & {
    order?: number;
  }
>) {
  const props = {
    ...domData.compoent('ArrangeCell'),
    ...rprops,
    style: isEmptyPropsValue(order) ? rprops.style : { order, ...rprops.style },
  };
  return createElement(as, props, children);
}

Arrange.Cell = ArrangeCell;

export default Arrange;
