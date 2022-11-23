declare namespace CMS {
  type Common = {
    id: SameString;
    /**
     * 创建时间
     */
    createdAt: string;

    /**
     * 更新时间
     */
    updatedAt: string;

    /**
     * 发布时间
     */
    publishedAt?: string;
  };

  type BaseModel<M> = Common & M;

  type BaseSeo = {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
  };

  /**
   * 文本类型
   */
  type Text = string;

  /**
   * 富文本类型
   */
  type RichText = string;

  /**
   * 唯一的路由ID
   */
  type SlugId = string;

  namespace Media {
    type BaseImage = {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: any;
      size: number;
      url: string;
      width: number;
    };
    type Image = BaseImage & {
      id: SameString;
      alternativeText: string;
      caption: string;
      previewUrl?: any;
      provider?: 'local' | string;
      provider_metadata?: any;

      formats: {
        thumbnail?: BaseImage;
        small?: BaseImage;
        medium?: BaseImage;
      };
    };
  }

  namespace Response {
    type PageInfo = {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };

    type DataType = {
      data: any;
      error?: {
        status: number;
        name: string;
        message: string;
        details: any;
      };
      meta?: {
        pagination: PageInfo;
      };
    };
  }
}
