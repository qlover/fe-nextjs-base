import { isFunction, omit } from 'lodash'
import { createElement, ElementType, forwardRef, Fragment, Ref } from 'react'
import { DEFAULT_CHILD_TAG } from './conts'

// const Tmp = (props: { name1: string; name2: string; ref: any; as: number }) => (
//   <span></span>
// )

// type Tag = typeof Tmp
// type TC = AS.OmitReactTagProps<Tag>
// // => {
// //     name1: string;
// //     name2: string;
// //     ref: any;
// // }
// type TC1 = AS.OmitReactTagProps<Tag, 'name1'>
// // {
// //   name2: string;
// //   ref: any;
// // }
// type TP = AS.OurProps<Tag, {}>
// // {
// //   as?: ((props: {
// //       name1: string;
// //       name2: string;
// //       ref: any;
// //       as: number;
// //   }) => JSX.Element) | undefined;
// //   children?: any;
// // }
// type TCP = TC & TP
// // Omit<{
// //   name1: string;
// //   name2: string;
// //   ref: any;
// //   as: number;
// // }, AS.PropsWeControl> & TP
// type AST = TCP['as']
// // ((props: {
// //   name1: string;
// //   name2: string;
// //   ref: any;
// //   as: number;
// // }) => JSX.Element) | undefined

/**
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */
export function forwardRefWithAs<
  T extends { name: string; displayName?: string }
>(component: T): T & { displayName: string } {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name
  })
}

function render<TTag extends ElementType, TSlot>(
  props: AS.Props<TTag>,
  slot: TSlot,
  tag: ElementType,
  name: string
) {
  const { as: Component = tag, children, refName = 'ref', ...rest } = props

  const refRelatedProps =
    props.ref !== undefined ? { [refName]: props.ref } : {}

  const resolvedChildren = isFunction(children)
    ? children(slot || {})
    : children

  const dataAttributes: Record<string, string> = {}

  return createElement(
    Component,
    Object.assign(
      {},
      omit(rest, ['ref']),
      Component !== Fragment && refRelatedProps,
      Component !== Fragment && dataAttributes
    ),
    resolvedChildren
  )
}

function AS<TTag extends ElementType = AS.DefaultTag>(
  props: AS.Props<TTag>,
  ref: Ref<HTMLElement>
) {
  const renderProps = { ...props, ref }
  return render(renderProps, {}, DEFAULT_CHILD_TAG, 'AS')
}

/**
 * 替换包裹组件
 * @returns
 */
const ASWrapper = forwardRefWithAs(AS)

export default ASWrapper
