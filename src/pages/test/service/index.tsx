import { RootLayout } from '@/components/layout'
import { fetchIpInfo } from '@/services/local'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import { useEffect } from 'react'

type ServicePageProps = {}

export const getStaticProps = ServerRenderer.ssg<ServicePageProps>({
  async handler(context) {
    return {}
  }
})

const ServicePage: Page.Component<ServicePageProps> = (props) => {
  useEffect(() => {
    fetchIpInfo().then(({ data }) => {
      console.log(data.data)
    })
  }, [])
  return (
    <div>
      <h1>Service page</h1>
    </div>
  )
}

ServicePage.Layout = RootLayout

export default ServicePage
