import I18nComponents from '@/components/i18n/components/I18nComponents'
import { PageRoot } from '@/components/layout'
import useI18nComponents from '@/hooks/useI18nComponents'
import { ServerRenderer } from '@/utils/server/ServerRenderer'

export const getStaticProps = ServerRenderer.ssg()

export default PageRoot(() => {
  const { components } = useI18nComponents()
  return (
    <div>
      <I18nComponents components={components} />
    </div>
  )
})
