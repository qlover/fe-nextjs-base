/**
 * pages 路由类型包裹
 * @param path
 * @returns
 */
export function pagePath(path: PageRoute.Path) {
  return path
}

/**
 * pages 路由类型包裹, 去掉动态路由 path
 * @param path
 * @returns
 */
export function pagePathStatic(path: PageRoute.PathStatic) {
  return path
}
