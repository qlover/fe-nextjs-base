import getServerSideProps from './getServerSideProps'
import getStaticPaths from './getStaticPaths'
import getStaticProps from './getStaticProps'

export * from '../ServerRendererError'

export type BaseConfigType<H> = {
  /**
   * 因为 接口数据可能返回 json 时, 值为 undefined, 而 next 在序列化数据时如果值为有 undefined 则会报 `SerializableError`
   *
   * 该参数用于转换 undefined 为 null
   *
   * 但是该问题目前发现 prod 环境不受影响
   *
   * @target #tag5
   */
  jsonTransform?: boolean

  /**
   * 是否捕获错误
   */
  catchError?: boolean

  handler?: H
}

/**
 * 服务端统一渲染器，包含
 *
 *
 * @todo 渲染使用设计模式，可组合其他逻辑
 *
 */
export const ServerRenderer = {
  getServerSideProps,
  getStaticPaths,
  getStaticProps,

  ssr: getServerSideProps,
  path: getStaticPaths,
  ssg: getStaticProps
}
