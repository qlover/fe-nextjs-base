import appConfig from '@/config/appConfig';
import { createContainer, useContainer } from 'unstated-next';

type ContainerType = {
  getPageProps: () => LocalApp.PageProps;
};

const defaultPageProps = () =>
  ({
    __lang: appConfig.lang,
    __namespaces: {},
  } as LocalApp.PageProps);

function useCounter(
  initstate: ContainerType = {
    getPageProps: defaultPageProps,
  }
) {
  return {
    pageProps: initstate.getPageProps,
  };
}

/**
 * appProps 容器，专门用来获取 _app.tsx props
 *
 * 页面数据, 包括用户信息，配置信息
 *
 *
 * #tag3:
 * FIXE: !!! md 页面, 不会收到 pageProps
 * 并且改属性只会传递一次,第二次不会传递，
 * 比如: 第一次访问 md 页面没有 pageProps, 第二次返回另一个页面，就会为空 pageProps, 如果此时对 pageProps 有依赖就会出错
 * 暂时解决方案: app 提供一个 getPageProps 方法随时获取最新 pageProps
 *
 * @tartget #tag3
 */
const AppPropsContainer = createContainer(useCounter);

export function useAppProps() {
  const appProps = useContainer(AppPropsContainer);

  return { getPageProps: appProps.pageProps };
}

export default AppPropsContainer;
