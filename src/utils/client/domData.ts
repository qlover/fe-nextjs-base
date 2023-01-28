import { isFunction } from 'lodash'

/**
 * 向组件注入 data-component 属性，为了方便使用属性选择器控制 css
 * @param name
 * @returns
 */
export function domDataCompoent(name: Function | string) {
  return { 'data-component': isFunction(name) ? name.name : name }
}
/**
 * 用于标签区分语言环境
 * @param locale
 * @returns
 */
export function domDataLanguage(locale: string) {
  return { 'data-language': locale }
}
