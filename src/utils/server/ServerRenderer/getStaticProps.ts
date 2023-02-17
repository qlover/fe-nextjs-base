import { logger } from '@/utils/common'
import { isNumber } from 'lodash'
import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult
} from 'next/types'
import { BaseConfigType, ServerRendererError } from '.'
import { prepareForSerializatoin } from '../prepareForSerializatoin'
import ServerRendererConfig from './config'

type StaticConfigType<P> = BaseConfigType<HandlerType<P>> & {
  /**
   * 预渲染后超时时间，默认 false
   *
   * 重新渲染时间，单位秒
   *
   * 可以被 handler 返回的 `revalidate` 覆盖
   *
   */
  revalidate?: number | boolean
}

/**
 * 10 分钟
 */
const DEFAULT_REVALIDATE = 600

type HandlerType<Props> = (
  context: GetStaticPropsContext
) => Promise<GetStaticPropsResult<Props> | void | Props>

/**
 * 是否是一个 ssr 返回结果
 * @param val
 * @returns
 */
function isNextResult<P>(val: any): val is GetStaticPropsResult<P> {
  return val.props || val.redirect || val.notFound !== void 0
}

// TODO ssg 类型问题，只能找到 props, 不能找到重定向
async function wrapperHandler<P extends PlainObject = PlainObject>(
  context: GetStaticPropsContext,
  config: StaticConfigType<P>
) {
  const { jsonTransform = true } = config

  let result = { props: {} } as GetStaticPropsResult<P>

  if (config?.handler) {
    // result.revalidate = isNumber(config.revalidate)
    //   ? config.revalidate
    //   : DEFAULT_REVALIDATE
    result.revalidate = isNumber(config.revalidate) ? config.revalidate : false

    const props = await config.handler(context)
    if (props && isNextResult<P>(props)) {
      result = props
    } else {
      // @ts-expect-error
      result.props = { ...result.props, ...props }
    }
  } else {
    result.revalidate = isNumber(config.revalidate) ? config.revalidate : false
  }

  if (jsonTransform) {
    return prepareForSerializatoin(result)
  }

  return result
}

/**
 * GetStaticProps 包裹
 *
 * `handler`
 *    - 可以随意返回一个对象，会当作 props
 *    - 可以按规则返回会被 next 直接使用
 *    - 还可以什么都不返回，为了开发方便, 默认 返回 `props:{ }`
 *
 * @param config
 * @returns
 */
export default function getStaticProps<P extends PlainObject = PlainObject>(
  config: StaticConfigType<P> = {}
) {
  const { catchError = ServerRendererConfig.catchError } = config

  const getStaticProps: GetStaticProps<P> = async (context) => {
    try {
      return await wrapperHandler<P>(context, config)
    } catch (e) {
      logger.error('[getStaticProps]', e)

      if (!catchError) {
        throw e
      }

      if (e instanceof ServerRendererError) {
        return e.redirect({ locale: context.locale as I18n.Locale })
      }

      return new ServerRendererError({
        locale: context.locale as I18n.Locale,
        pathname: '/500',
        message: String(e)
      }).redirect()
    }
  }

  return getStaticProps
}
