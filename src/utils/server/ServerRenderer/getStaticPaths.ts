import i18n from 'i18n'
import { has, isArray } from 'lodash'
import { GetStaticPathsContext, GetStaticPathsResult } from 'next/types'
import { ParsedUrlQuery } from 'querystring'
import type { BaseConfigType } from '.'
import { prepareForSerializatoin } from '../prepareForSerializatoin'

type StaticConfigType<P extends ParsedUrlQuery> = BaseConfigType<
  HandlerType<P>
> & {
  /**
   * 静态生成是否包含国际化路由
   *
   * true 表示所有多语言环境
   *
   * 还可以指定 一组语言
   *
   * @default false
   */
  locales?: boolean | I18n.LocalesType
}

type HandlerType<Props extends ParsedUrlQuery = ParsedUrlQuery> = (
  context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<Props> | void | Props>

/**
 * 是否是一个 GetStaticPropsResult 返回结果
 * @param val
 * @returns
 */
function isNextResult<P extends ParsedUrlQuery = ParsedUrlQuery>(
  val: any
): val is GetStaticPathsResult<P> {
  return has(val, 'paths') && has(val, 'fallback')
}

async function wrapperHandler<P extends PlainObject>(
  context: GetStaticPathsContext,
  config: StaticConfigType<P>
) {
  let result = {
    paths: [],
    fallback: false
  } as GetStaticPathsResult<P>
  if (config?.handler) {
    const props = await config.handler(context)
    if (props && isNextResult<P>(props)) {
      result = prepareForSerializatoin(props)
    }
  }

  const { locales } = config
  if (locales) {
    let innerlocales
    if (isArray(locales)) {
      innerlocales = locales
    } else {
      innerlocales = context.locales || i18n.locales
    }

    const newPaths = innerlocales
      .map((locale) => {
        return result.paths.map((resPath) => {
          return {
            params: (resPath as any).params,
            locale
          }
        })
      })
      .flat()

    result.paths = newPaths
  }

  return result
}

export default function getStaticPaths<
  P extends ParsedUrlQuery = ParsedUrlQuery
>(config: StaticConfigType<P> = {}) {
  return async function getStaticPaths(context: GetStaticPathsContext) {
    try {
      const result = await wrapperHandler<P>(context, config)
      return result
    } catch (e) {
      console.log('[RenderDispatch getStaticPaths error]', e)
      throw e
    }
  }
}
