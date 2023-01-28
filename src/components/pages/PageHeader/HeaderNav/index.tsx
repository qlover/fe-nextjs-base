import A from '@/components/common/A'
import IconFont from '@/components/common/IconFont'
import useI18nCommon from '@/hooks/useI18nCommon'
import { HeadNavOptions } from '@/sources/locales/common'
import { domDataLanguage, mapChildren } from '@/utils/client'
import { FC } from 'react'
import { PageHeaderContainer } from '../container'

import css from './index.module.less'

type HeaderNavProps = {}

function NavItem({ value, active }: { active: boolean; value: any }) {
  const { commonT } = useI18nCommon()
  const trigger = (stop = false) => {
    return (
      <A
        href={value.href}
        onClick={(e) => {
          stop && e.preventDefault()
        }}
        className={active ? 'active' : ''}
      >
        {commonT(value.title)}
      </A>
    )
  }

  return trigger()
}

const HeaderNav: FC<HeaderNavProps> = () => {
  const { lang } = useI18nCommon()

  const { currentNavKey, onChangeOpenDrawer } =
    PageHeaderContainer.useContainer()

  return (
    <div className={css['HeaderNav']}>
      <nav className="header-nav" {...domDataLanguage(lang)}>
        {mapChildren(HeadNavOptions, ({ item, key }) => (
          <NavItem key={key} value={item} active={item.key === currentNavKey} />
        ))}
      </nav>

      <div className="header-actions hidden xl:flex lg:items-center space-x-2">
        <span>action 1</span>
        <span>action 2</span>
        <span>action 3</span>
      </div>

      <div className="mobile-actions">
        <span
          onClick={() => {
            onChangeOpenDrawer(true)
          }}
          className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <IconFont className="text-2xl" type="icon-menu" />
        </span>
      </div>
    </div>
  )
}

export default HeaderNav
