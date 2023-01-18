// 对应 i18n.js 配置类型
declare namespace I18n {
  type Locale = 'en' | 'zh';

  type LocalesType = Array<Locale>;

  type Pathname = '/';

  type I18nNS = 'common' | 'index'

  type PagesType = Record<Pathname, Array<I18nNS>>;

  type LocalesTranMap = {
    common: '404_desc' | '404_title' | '500_desc' | '500_title' | 'go_back' | 'seo_desc' | 'seo_keywords' | 'seo_title'
    index: 'seo_desc' | 'seo_keywords' | 'seo_title'

  }
}