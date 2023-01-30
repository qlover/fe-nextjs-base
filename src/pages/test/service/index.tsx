import { RootLayout } from '@/components/layout'
import useStrictEffect from '@/hooks/common/useStrictEffect'
import { fetchIpInfo } from '@/services/local'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import { useState } from 'react'

type ServicePageProps = {}

export const getStaticProps = ServerRenderer.ssg<ServicePageProps>({
  async handler(context) {
    return {}
  }
})

const ServicePage: Page.Component<ServicePageProps> = (props) => {
  const [refreshFetch, setRefreshFetch] = useState(0)

  useStrictEffect(() => {
    fetchIpInfo().then(({ data }) => {
      console.log(data.data)
    })

    return () => {
      console.log('unmounted')
    }
  }, [refreshFetch])

  return (
    <div>
      <h1>Service page</h1>
      <button
        onClick={() => {
          setRefreshFetch(refreshFetch + 1)
        }}
      >
        setRefreshFetch
      </button>
    </div>
  )
}

ServicePage.Layout = RootLayout

export default ServicePage
