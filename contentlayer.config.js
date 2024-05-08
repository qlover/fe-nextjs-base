import { FileMetaParser } from './packages/contentlayer/src/make/FileMetaParser';
import { MdxMaker } from './packages/contentlayer/src/make/MdxMaker';
import { MdxPrase } from './packages/contentlayer/src/make/MdxPrase';
import i18nConfig from './config/i18n.config';
const commonFields = {
  sidebarIconFont: {
    type: 'string',
    default: 'icon-expand'
  },
  excerpt: {
    type: 'string'
  },
  label: {
    type: 'string'
  },
  show_child_cards: {
    type: 'string'
  },
  nav_title: {
    type: 'string'
  },
  date: {
    type: 'string'
  }
};

FileMetaParser.locales = i18nConfig.locales;
FileMetaParser.defaultLocale = i18nConfig.defaultLocale;

const mdxMaker = new MdxMaker('./resources/markdowns');

export default mdxMaker
  .addType(
    new MdxPrase('Docs').extendsCommonFields(commonFields).toDocumentType()
  )
  .toSource();
