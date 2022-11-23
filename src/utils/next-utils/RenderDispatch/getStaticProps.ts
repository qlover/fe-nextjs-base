import appConfig from '@/config/appConfig';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next/types';
import RenderDispatch, { BaseConfigType, ErrorHandler } from '.';
import { prepareForSerializatoin } from '../prepareForSerializatoin';

type HandlerType<Props> = (
  context: GetStaticPropsContext
) => Promise<GetStaticPropsResult<Props> | void | Props>;

/**
 * 是否是一个 ssr 返回结果
 * @param val
 * @returns
 */
function isNextResult<P>(val: any): val is GetStaticPropsResult<P> {
  return val.props || val.redirect || val.notFound !== void 0;
}

async function wrapperHandler<P extends PlainObject>(
  context: GetStaticPropsContext,
  config: BaseConfigType<HandlerType<P>>
) {
  const {
    jsonTransform = appConfig.appEnv !== 'master',
    // routerFilter = appConfig.appEnv !== 'local',
  } = config;

  let result = { props: { empty: true } as P | PlainObject };

  // TODO: router filter
  // routerFilter && plugRouterFilter(resolvedUrl, locale);

  if (config?.handler) {
    const props = await config.handler(context);
    if (props && isNextResult<P>(props)) {
      return jsonTransform ? prepareForSerializatoin(props) : props;
    }

    result.props = { ...result.props, ...props };
  }

  if (jsonTransform) {
    return prepareForSerializatoin(result);
  }

  return result;
}

/**
 * GetStaticProps 包裹
 *
 * `handler`
 *    - 可以随意返回一个对象，会当作 props
 *    - 可以按规则返回会被 next 直接使用
 *    - 还可以什么都不返回，为了开发方便, 默认 返回 `props:{ empty:true }`
 *    - 可手动抛出 `AppServerError` 由 `ErrorHandler` 处理
 *
 * @param config
 * @returns
 */
export default function getStaticProps<P extends PlainObject>(
  config: BaseConfigType<HandlerType<P>> = {}
) {
  const { catchError = appConfig.appEnv !== 'local' } = config;

  return async function getStaticProps(context: GetStaticPropsContext) {
    try {
      const { locale } = context;

      // 更新 server state
      RenderDispatch.state = {
        // @ts-expect-error
        query: context.params,
        client: {
          locale: (locale as LocalApp.Lang) || appConfig.lang,
        },
      };

      return await wrapperHandler<P>(context, config);
    } catch (e) {
      if (catchError) {
        return ErrorHandler(e as Error);
      }
    } finally {
      RenderDispatch.clearState();
    }
  };
}
