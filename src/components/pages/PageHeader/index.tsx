import classNames from 'classnames'
import { FC } from 'react'
import { PageHeaderContainer } from './container'
import HeaderLogo from './HeaderLogo'
import HeaderNav from './HeaderNav'
import css from './index.module.less'
import MobileDrawer from './MobileDrawer'

export type PageHeaderProps = {}

const PageHeader: FC<PageHeaderProps> = () => {
  const { headerRef, scrolled, currentNavKey, openDrawer, onChangeOpenDrawer } =
    PageHeaderContainer.useContainer()
  return (
    <header
      ref={headerRef}
      className={classNames(css['page-haeder'], {
        [css['scrolled']]: scrolled
      })}
    >
      <div className={css['header-container']}>
        <div className={css['header-inner']}>
          <HeaderLogo />

          <HeaderNav />
        </div>
      </div>

      <MobileDrawer />
    </header>
  )
}

const PageHeaderWrapper = (props: PageHeaderProps) => (
  <PageHeaderContainer.Provider>
    <PageHeader {...props} />
  </PageHeaderContainer.Provider>
)

export default PageHeaderWrapper
