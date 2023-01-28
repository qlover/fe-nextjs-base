// 对应 i18n.js 配置类型
declare namespace I18n {
  type Locale = 'en' | 'zh';

  type LocalesType = Array<Locale>;

  type Pathname = '/' | '/test';

  type I18nNS = 'common' | 'index' | 'test'

  type PagesType = Record<Pathname, Array<I18nNS>>;

  type ExtendTranslate<T = string, TKeys = string> = (
    i18nKey: TKeys,
    query?: import('next-translate').TranslationQuery | null,
    options?: {
      returnObjects?: boolean
      fallback?: string | string[]
      default?: string
      ns?: string
    }
  ) => T
  

  type LocalesTranMap = { 
    common: '$seo_desc' | '$seo_keywords' | '$seo_title' | 'err_404_desc' | 'err_404_title' | 'err_500_desc' | 'err_500_title' | 'footer_nav1' | 'footer_nav1_sub1' | 'footer_nav1_sub2' | 'footer_nav1_sub3' | 'footer_nav1_sub4' | 'footer_nav1_sub5' | 'footer_nav1_title' | 'footer_nav2' | 'footer_nav2_sub1' | 'footer_nav2_sub2' | 'footer_nav2_sub3' | 'footer_nav2_title' | 'footer_nav3' | 'footer_nav3_sub1' | 'footer_nav3_sub2' | 'footer_nav3_sub3' | 'footer_nav3_title' | 'footer_nav4' | 'footer_nav4_sub1' | 'footer_nav4_sub2' | 'footer_nav4_sub3' | 'footer_nav4_sub4' | 'footer_nav4_sub5' | 'footer_nav4_sub6' | 'footer_nav4_title' | 'go_back' | 'header_action1' | 'header_action2' | 'header_action3' | 'header_nav1' | 'header_nav2' | 'header_nav3' | 'header_nav4' | 'header_nav5'
    index: '$seo_desc' | '$seo_keywords' | '$seo_title'
    test: '$seo_desc' | '$seo_keywords' | '$seo_title' | 'test_pagetitle'
  }
  type TransKeys = ValueOf<LocalesTranMap>

}
