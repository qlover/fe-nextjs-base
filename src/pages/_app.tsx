import AppPropsContainer from '@/container/AppProps';
import '@/styles/css/index.css';
import '@/styles/less/index.less';
import type { AppProps } from 'next/app';
import { useCallback } from 'react';

function APP(props: AppProps) {
  const { Component, pageProps } = props;
  const getPageProps = useCallback(() => pageProps, [pageProps]);

  return (
    <AppPropsContainer.Provider initialState={{ getPageProps }}>
      <Component {...pageProps} />
    </AppPropsContainer.Provider>
  );
}

export default APP;
