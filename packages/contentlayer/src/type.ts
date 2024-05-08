export type MetaDataResult = {
  order: number;
  locale: string;
  slug: string;
  pathsSlugs: string[];
  fullHref: string;
  name: string;
  replaceName: string;
  parent?: MetaDataResult;
};

export type ParseCommonFieldsType = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ParseFiledsType = ParseCommonFieldsType & {
  _fileMetaData: MetaDataResult;
  [key: string]: any;
};
