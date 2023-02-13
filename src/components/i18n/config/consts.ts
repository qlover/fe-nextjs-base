import dynamic from 'next/dynamic'

/**
 * 动态 i18n 组件映射列表
 */
export const DynamicComponentsMap = {
  SectionFAQ: dynamic(() => import('../components/SectionFAQ'))
}

/**
 * i18n 组件类型
 *
 * `locales` 对应 `/components/i18n` 组件
 */
export const I18nComponentsNames = Object.keys(
  DynamicComponentsMap
) as unknown as I18nComponent.ComponentNameType

/**
 * locale 目录中 i18n 组件的 key 名字前缀
 */
export const LocalJsonComponentKey = 'i18n_component'
