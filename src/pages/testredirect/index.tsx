import { FC } from 'react'

type TestRedirectPageProps = {}
const TestRedirectPage: FC<TestRedirectPageProps> = () => {
  return (
    <div className="TestRedirectPage-wrapper">
      <h1>重定向页面</h1>

      <p>有关重定向页面</p>

      <p>如果是 ssr 页面, 可直接控制</p>
      <p>
        如果是 ssg 页面, 建议不在 ssg 中控制，会导致 build
        失败，特别是有国际化的情况
      </p>

      <p>
        如果有国际化，并且是 ssg ，建议做好两点，1. next.config.js 重写
        redirects 2. 客户端组件根据重定向规则设置跳转
      </p>
      <p>
        如果客户不根据规则设置跳转，因为客户端跳转是不受服务端跳转控制的，也就是
        next.config 服务端渲染不能重定向客户端， 所有需要客户端和服务端统一,
        当然如果是 ssr 另当别论可直接控制
      </p>
    </div>
  )
}

export default TestRedirectPage
