type CommonI18Type = I18n.LocalesTranMap['common']

export const HeadNavOptions = [
  { key: 'nav1', title: 'header_nav1' as CommonI18Type, href: '' },
  { key: 'nav2', title: 'header_nav2' as CommonI18Type, href: '' },
  { key: 'nav3', title: 'header_nav3' as CommonI18Type, href: '' },
  { key: 'nav4', title: 'header_nav4' as CommonI18Type, href: '' },
  { key: 'nav5', title: 'header_nav5' as CommonI18Type, href: '' }
]

export const HeadActionOptions = [
  { key: 'action1', title: 'header_action1' as CommonI18Type, href: '' },
  { key: 'action2', title: 'header_action2' as CommonI18Type, href: '' },
  { key: 'action3', title: 'header_action3' as CommonI18Type, href: '' }
]

export const FooterNavOptions = [
  {
    key: 'footer_nav1',
    title: 'footer_nav1_title' as CommonI18Type,
    children: [
      {
        key: 'nav1_sub1',
        title: 'footer_nav1_sub1' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav1_sub2',
        title: 'footer_nav1_sub2' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav1_sub3',
        title: 'footer_nav1_sub3' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav1_sub4',
        title: 'footer_nav1_sub4' as CommonI18Type,
        href: ''
      },
      { key: 'nav1_sub5', title: 'footer_nav1_sub5' as CommonI18Type, href: '' }
    ]
  },
  {
    key: 'footer_nav2',
    title: 'footer_nav2_title' as CommonI18Type,
    children: [
      {
        key: 'nav2_sub1',
        title: 'footer_nav2_sub1' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav2_sub2',
        title: 'footer_nav2_sub2' as CommonI18Type,
        href: ''
      },
      { key: 'nav2_sub3', title: 'footer_nav2_sub3' as CommonI18Type, href: '' }
    ]
  },
  {
    key: 'footer_nav3',
    title: 'footer_nav3_title' as CommonI18Type,
    children: [
      {
        key: 'nav3_sub1',
        title: 'footer_nav3_sub1' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav3_sub2',
        title: 'footer_nav3_sub2' as CommonI18Type,
        href: ''
      },
      { key: 'nav3_sub3', title: 'footer_nav3_sub3' as CommonI18Type, href: '' }
    ]
  },
  {
    key: 'footer_nav4',
    title: 'footer_nav4_title' as CommonI18Type,
    children: [
      {
        key: 'nav4_sub1',
        title: 'footer_nav4_sub1' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav4_sub2',
        title: 'footer_nav4_sub2' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav4_sub3',
        title: 'footer_nav4_sub3' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav4_sub4',
        title: 'footer_nav4_sub4' as CommonI18Type,
        href: ''
      },
      {
        key: 'nav4_sub5',
        title: 'footer_nav4_sub5' as CommonI18Type,
        href: ''
      },
      { key: 'nav4_sub6', title: 'footer_nav4_sub6' as CommonI18Type, href: '' }
    ]
  }
]
