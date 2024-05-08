import { FieldDefs } from 'contentlayer/source-files';

/**
 * mdx 元数据通用字段
 *
 * type 类型见: `ContentlayerBuilder.ParseCommonFieldsType`
 */
export const getCommonFields = (): FieldDefs => ({
  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string'
  },
  seoTitle: {
    type: 'string'
  },
  seoDescription: {
    type: 'string'
  }
});
