import { isFunction } from 'lodash';
/**
 * 向组件注入 data-component 属性，为了方便使用属性选择器控制 css
 * @param name
 * @returns
 */
export function compoent(name: Function | string) {
  return { 'data-component': isFunction(name) ? name.name : name };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  compoent,
};
