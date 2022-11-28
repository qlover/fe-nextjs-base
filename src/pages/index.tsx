import PageRoot from '@/container/PageRoot';
import BaseLayout from '@/layout/BaseLayout';
import RenderDispatch from '@/utils/next-utils/RenderDispatch';
import { WindowIcon } from '@heroicons/react/24/outline';
const IndexPage = PageRoot(() => {
  const { t, renderValue } = PageRoot.useContainer();
  const { section1, section2 } = renderValue;
  console.log(section1, section2);

  return (
    <BaseLayout>
      <section className="w-80 min-h-[40rem]">
        <h1 className="text-2xl">
          <WindowIcon />
          {t('banner_title')}
        </h1>
        <h2>{t('banner_subtitle')}</h2>
      </section>
    </BaseLayout>
  );
});

export const getStaticProps = RenderDispatch.ssg();

export default IndexPage;
