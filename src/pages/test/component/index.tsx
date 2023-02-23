import { A, As } from '@/components/common'
import { PageRoot } from '@/components/layout'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import { useRef } from 'react'

type TestEmptyPageProps = {}

export const getStaticProps = ServerRenderer.ssg<TestEmptyPageProps>({
  async handler(context) {
    return {}
  }
})

export default PageRoot(() => {
  const aref = useRef<HTMLAnchorElement>(null)
  return (
    <div>
      <As as={A} ref={aref}>
        as h2
      </As>
    </div>
  )
})
