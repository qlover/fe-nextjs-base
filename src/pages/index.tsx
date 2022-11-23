import PageRoot from '@/container/PageRoot';
import BasicLayout from '@/layout/BasicLayout';
import { getIndexPictures } from '@/service/basic/picture';
import RenderDispatch from '@/utils/next-utils/RenderDispatch';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
const IndexPage = PageRoot<{ pictures?: any[] }>(({ pictures }) => {
  const { t } = useTranslation('index');

  const [pictureOptions, setPictureOptions] = useState(pictures || []);
  console.log('pictureOptions', pictureOptions);

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

export const getServerSideProps = RenderDispatch.getServerSideProps({
  async handler(context) {
    const picturesRes = await getIndexPictures({
      search: RenderDispatch.state?.query?.search,
    });

    return {
      props: {
        pictures: picturesRes.data.data,
      },
    };
  },
});

export default IndexPage;
