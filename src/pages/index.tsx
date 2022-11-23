import PageRoot from '@/container/PageRoot';
import BasicLayout from '@/layout/BasicLayout';
import RenderDispatch from '@/utils/next-utils/RenderDispatch';
const IndexPage = PageRoot(() => {
  const { t, renderValue } = PageRoot.useContainer();
  const { section1, section2 } = renderValue;
  console.log(section1, section2);

  return (
    <BasicLayout
      seoProps={{
        keywords: t('seo_keywords'),
        title: t('seo_title'),
        description: t('seo_desc'),
      }}
    >
      <section className="w-80">
        <h1>{t('banner_title')}</h1>
        <h2>{t('banner_subtitle')}</h2>
      </section>
    </BasicLayout>
  );
});

export const getStaticProps = RenderDispatch.ssg({
  async handler() {
    return {};
  },
});

export default IndexPage;
