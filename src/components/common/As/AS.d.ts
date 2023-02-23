declare namespace AS {
  /**
   * 默认 tag 类型
   */
  type DefaultTag = typeof import('./conts').DEFAULT_CHILD_TAG

  /**
   * 默认占位符号类型, 用于 OmitReactTagProps 计算
   */
  type PropsSymbolType = typeof import('./conts').PROPS_SYMBOL

  /**
   * HTML 标签名类型
   */
  type JSXHTMLTagNamesType = keyof JSX.IntrinsicElements

  /**
   * 替换的 tag 类型, 包含 html 标签名, 和 React 组件类型
   */
  type ReactTag = JSXHTMLTagNamesType | React.JSXElementConstructor<any>

  /**
   * 得到一个 ReactTag 属性
   *
   * 如果是 `React.ElementType` 则获取他的 props
   *
   * 如果不是则为 `never` 任意子类型,这里不是能是 any, any 会覆盖 `React.ElementType` props 类型
   *
   */
  type ReactTagProps<TTag extends ReactTag> = TTag extends React.ElementType
    ? React.ComponentProps<TTag>
    : never

  /**
   * 用于 AS 组件基础属性名
   */
  type AsBasePropertyKeys = 'as' | 'children'

  /**
   * 用于 AS 组件基础属性
   */
  type AsBaseProps<TTag extends ReactTag, TSlot> = {
    as?: TTag
    children?: React.ReactNode | ((bag: TSlot) => React.ReactElement)
  }

  /**
   * 可选 ReactTagProps<TTag> 属性, TOmitableProps 用来去掉包含的属性
   */
  type OmitReactTagProps<
    TTag extends ReactTag,
    TOmitableProps extends PropertyKey = PropsSymbolType
  > = TOmitableProps extends PropsSymbolType
    ? Omit<ReactTagProps<TTag>, AsBasePropertyKeys>
    : Omit<ReactTagProps<TTag>, TOmitableProps | AsBasePropertyKeys>

  /**
   * AS 组件属性类型
   */
  type Props<
    TTag extends ReactTag,
    TSlot = {},
    TOmitableProps extends PropertyKey = PropsSymbolType
  > = OmitReactTagProps<TTag, TOmitableProps> & AsBaseProps<TTag, TSlot>
}
