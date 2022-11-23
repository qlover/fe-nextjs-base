import dynamic, { DynamicOptions, Loader } from 'next/dynamic';

/**
 * 快捷动态导入方法
 *
 * 比如：
 * ```js
 * const SwiperPostsList = dynamicImport(import('./SwiperPostsList'));
 * ```
 *
 * ```js
 * const SwiperPostsList = dynamicImport(() => import('./SwiperPostsList'))
 * ```
 *
 * 目前未发现第二种写法和第一种写法区别，建议用第二种,
 *
 * @see https://nextjs.org/docs/advanced-features/dynamic-import
 * @param dynamicOptions
 * @param options
 * @returns
 */
export default function dynamicImport<P>(
  dynamicOptions: Loader<P>,
  options?: DynamicOptions<P>
) {
  return dynamic(dynamicOptions, options);
}

export function DynamicLoading() {
  return (
    <div className="h-14 flex items-center justify-center">loading...</div>
  );
}
