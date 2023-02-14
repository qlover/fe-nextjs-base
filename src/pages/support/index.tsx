import { A } from '@/components/common'
import { PageRoot } from '@/components/layout'
import { mapChildren } from '@/utils/client'
import { ServerRenderer } from '@/utils/server/ServerRenderer'
import mdJson from 'work/sources/mdJson/support.json'
type Props = {
  artList: any[]
}
export const getStaticProps = ServerRenderer.ssg<Props>({
  async handler({ params, locale }) {
    const artList = mdJson
    return {
      props: {
        artList
      }
    }
  }
})

export default PageRoot<Props>(({ artList }) => {
  console.log('artList', artList)

  return (
    <div>
      <div className="my-5 max-w-5xl mx-auto">
        <div className="flex gap-5 flex-wrap">
          {mapChildren(artList, ({ key, item }) => (
            <A
              className="hover:underline hover:text-blue-400"
              key={key}
              href={'/support/' + item.data.slug}
            >
              {item.data.title}
            </A>
          ))}
        </div>
      </div>
    </div>
  )
})
