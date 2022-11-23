import PageRoot from '@/container/PageRoot';
import BasicLayout from '@/layout/BasicLayout';
import RenderDispatch from '@/utils/next-utils/RenderDispatch';
const IndexPage = PageRoot(() => {
  const { t } = PageRoot.useContainer();
  return (
    <BasicLayout
      seoProps={{
        keywords: t('seo_keywords'),
        title: t('seo_title'),
        description: t('seo_desc'),
      }}
    >
      <h1>index page</h1>
    </BasicLayout>
  );
});

export const getStaticProps = RenderDispatch.ssg({
  async handler() {
    return {};
  },
});

export default IndexPage;
