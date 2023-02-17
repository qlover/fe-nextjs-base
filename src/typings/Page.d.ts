declare namespace Page {
  type I18nNamespaceType = Record<
    I18n.I18nNS,
    Record<I18n.LocalesTranMap[I18n.I18nNS], any> | undefined
  >

  /**
   * next page local props
   */
  type BaseProps<Route = '*'> = {
    /**
     * 语言环境
     */
    __lang: I18n.Locale

    /**
     * 本地数据因为从 i18n.json 过来，next 会将数据从 __namespace 带过来
     */
    __namespaces: I18nNamespaceType

    // // 扩展类型
    // [key: string]: any
  }

  type ComponentProps<P> = P & BaseProps

  type Component<P = {}> = import('next').NextPage<ComponentProps<P>> & {
    /**
     * 用于 _app.tsx 渲染布局
     */
    Layout?: React.FC<Component.WithChildren<any>>

    /**
     * 用于获取布局数据，暂未使用
     *
     * @deprecated
     * @returns
     */
    getLayoutProps?: () => any
  }

  type MarkdownBaseProps = {
    markdown: {
      uid: string
      /**
       * 用于 MDXRemote 组件
       */
      mdxContext: any

      /**
       * md 字符串
       */
      content: string

      /**
       * md 元数据
       */
      meta: {
        description: string
        title: string
        [key: string]: any
      }
    }
  }
}
