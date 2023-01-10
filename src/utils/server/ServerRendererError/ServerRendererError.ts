import type { Redirect } from 'next/types'

type ErrorConfig = {
  code: 404 | 500 | 302
  message?: string
}

const CodeMap: any = {
  404: { notFound: true },
  500: {
    redirect: {
      destination: '/500',
      permanent: false
    }
  }
}

export default class ServerRendererError extends Error {
  _app_config: ErrorConfig = {
    code: 500
  }
  constructor(config: ErrorConfig) {
    super(
      config.message
        ? 'ServerRendererError:' + config.message
        : 'ServerRendererError'
    )

    this._app_config = config
  }

  /**
   * getServerSideProps 和 getStaticProps 都包含 redirect 或 notFound
   *
   * ServerRendererError 所以默认支持 ssr 返回结果, 后期改变可重写
   *
   */
  redirect():
    | { redirect: Redirect; revalidate?: number | boolean }
    | { notFound: true; revalidate?: number | boolean } {
    return CodeMap[this._app_config.code] || CodeMap['404']
  }
}
