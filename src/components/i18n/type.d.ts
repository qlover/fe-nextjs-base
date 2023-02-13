/**
 * 根据 /locales 内容动态渲染组件类型
 */
declare namespace I18nComponent {
  interface ContainerProps {
    functionalExtra?: Component.WithFuncNode
    bannerFooter?: Component.WithFuncNode
  }

  interface Base<P = LocalesComponentInterface> {
    /**
     * 必填
     *
     * 组件名， displayName
     */
    type: ComponentNameType

    /**
     * 唯一标识
     */
    key: React.Key

    /**
     * 排序
     */
    sort?: number

    /**
     * 组件传递的属性
     */
    props?: P
  }

  type LocalesOptionType = {
    key?: string

    /**
     * @type i18n string
     */
    title?: string

    description?: string

    imgProps?: import('@/components/common/Img').ImgProps

    [key: string]: any
  }

  interface LocalesComponentInterface<T = LocalesOptionType>
    extends Component.UI {
    options?: T[]
    title?: React.ReactNode
    subTitle?: string
    description?: React.ReactNode
    imgProps?: import('@/components/common/Img').ImgProps
  }

  type ComponentNameType =
    keyof typeof import('./config/consts').DynamicComponentsMap

  type DynamicComponentsMapType =
    typeof import('./config/consts').DynamicComponentsMap
}
