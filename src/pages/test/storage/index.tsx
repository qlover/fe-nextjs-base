import { A } from '@/components/common'
import useStores from '@/hooks/useStores'
import { selectAuthUser, setAuthUser } from '@/stores/slice'
import { serialize } from '@/utils/common/serialize'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import { Input } from 'antd'

type StoragePageProps = {}

export const getStaticProps = ServerRenderer.ssg<StoragePageProps>({
  async handler(context) {
    return {}
  }
})

const StoragePage: Page.Component<StoragePageProps> = (props) => {
  const [state, dispatch] = useStores(selectAuthUser)

  return (
    <div>
      <h1>Storage Page</h1>
      <div>{serialize(state)}</div>
      <div>{state?.name}</div>

      <Input
        value={state?.name}
        onChange={(e) => {
          dispatch(setAuthUser({ name: e.target.value }))
        }}
      />

      <button
        onClick={() => {
          dispatch(setAuthUser({ name: 'qrj', id: 88, money: 888 }))
        }}
      >
        set localname
      </button>

      <div>
        <A
          path="/"
          className="text-blue-400 hover:underline hover:text-blue-500"
        >
          to /
        </A>
      </div>
    </div>
  )
}

export default StoragePage
