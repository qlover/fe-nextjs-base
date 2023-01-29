import { RootLayout } from '@/components/layout'
import useCacheState from '@/hooks/common/useCacheState'
import useStores from '@/hooks/useStores'
import { selectAuthState, setAuthState } from '@/stores/slice/authSlice'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

type SotrePageProps = {}

export const getStaticProps = ServerRenderer.ssg<SotrePageProps>({
  async handler(context) {
    return {}
  }
})

const SotrePage: Page.Component<SotrePageProps> = (props) => {
  const [innerState, setInnerState, stateRef] = useCacheState({
    download: 66,
    follow: 88,
    comment: 55
  })
  const { dispatch, state } = useStores(selectAuthState)
  console.log(state)

  return (
    <div>
      <h1 className="my-4">Store page</h1>

      <button
        onClick={() => {
          dispatch(setAuthState(!state))
        }}
      >
        store auth
      </button>
    </div>
  )
}

SotrePage.Layout = RootLayout

export default SotrePage
