import { has } from 'lodash';
import { GetStaticPathsContext, GetStaticPathsResult } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { BaseConfigType } from '.';

type HandlerType<Props extends ParsedUrlQuery> = (
  context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<Props> | void | Props>;

/**
 * 是否是一个 GetStaticPropsResult 返回结果
 * @param val
 * @returns
 */
function isNextResult<P extends ParsedUrlQuery>(
  val: any
): val is GetStaticPathsResult<P> {
  return has(val, 'paths') && has(val, 'fallback');
}

async function runnerHandler<P extends ParsedUrlQuery>(
  handler: HandlerType<P> | undefined,
  context: GetStaticPathsContext
) {
  let result = {
    paths: [],
    fallback: false,
  };
  if (handler) {
    const props = await handler(context);
    if (props && isNextResult<P>(props)) {
      return props;
    }
  }
  return result;
}

export default function getStaticPaths<P extends ParsedUrlQuery>(
  config?: BaseConfigType<HandlerType<P>>
) {
  return async function getStaticPaths(context: GetStaticPathsContext) {
    try {
      // const { resolvedUrl, locale } = context;

      // // TODO: router filter
      // plugRouterFilter(resolvedUrl, locale);

      // running
      return await runnerHandler<P>(config?.handler, context);
    } catch (e) {
      // return ErrorHandler(e as Error);
      console.log('e', e);
    }
  };
}
