import { ConfigProvider } from 'antd';
import { NextPage } from 'next';
import useContainer from './container';

export type BaesPageRootProps = LocalApp.PageProps;

export type PageRootComponentProps<P> = P & BaesPageRootProps;

export type PageRootComponent<P = {}> = NextPage<PageRootComponentProps<P>>;

function copyNextPageAttr<P>(
  targetCom: PageRootComponent<P>,
  sourceCom: PageRootComponent<P>
) {
  targetCom.propTypes = sourceCom.propTypes;
  targetCom.contextTypes = sourceCom.contextTypes;
  targetCom.defaultProps = sourceCom.defaultProps;
  targetCom.displayName = sourceCom.displayName || sourceCom.name;
  targetCom.getInitialProps = sourceCom.getInitialProps;

  return targetCom;
}

/**
 *
 * NextPage 组件容器，为了内部逻辑统一
 *
 * 被包裹 NextPage 可使用以下：
 *
 * 1. AppContainer
 * 2. AppScripts
 *
 * 如果不需要任何有关容器组件 API，可省略该组件，比如 404 目前不需要容器 API，可以直接导出组件
 *
 * @param Component
 * @returns
 */
export default function PageRoot<P extends PlainObject>(
  Component: PageRootComponent<P>
) {
  const Page: PageRootComponent<P> = (props) => {
    return (
      <ConfigProvider>
        <Component {...props} />
      </ConfigProvider>
    );
  };

  // 复制 attr
  copyNextPageAttr<P>(Page, Component);

  return Page;
}

PageRoot.useContainer = useContainer;
