import { RootLayout } from '@/components/layout'
import useCacheState from '@/hooks/common/useCacheState'
import ServerRenderer from '@/utils/server/ServerRenderer'
import { useEffect, useRef } from 'react'

type TestCacheStateProps = {}

export const getStaticProps = ServerRenderer.ssg<TestCacheStateProps>({
  async handler(context) {
    return {}
  }
})

const TestCacheState: Page.Component<TestCacheStateProps> = (props) => {
  const [innerState, setInnerState, stateRef] = useCacheState({
    download: 66,
    follow: 88,
    comment: 55
  })
  console.log(innerState)

  const ref1 = useRef<HTMLButtonElement>(null)

  const init1 = () => {
    setInnerState({ comment: 899 })
    console.log('staged', stateRef.current)
  }

  useEffect(() => {
    ref1.current?.addEventListener('click', init1)
  }, [])
  return (
    <div>
      <h1 className="text-3xl">Test Page</h1>

      <div className="my-3 space-x-4">
        <button ref={ref1}>init1</button>
      </div>
    </div>
  )
}

TestCacheState.Layout = RootLayout

export default TestCacheState
