import { Drawer } from '@/components/common'
import A from '@/components/common/A'
import IconFont from '@/components/common/IconFont'
import useI18nCommon from '@/hooks/useI18nCommon'
import { HeadNavOptions } from '@/sources/locales/common'
import { mapChildren } from '@/utils/client'
import { Collapse } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { PageHeaderContainer } from '../container'
import css from './index.module.less'

const { Panel } = Collapse

type MobileDrawerProps = {}

const MobileDrawer: FC<MobileDrawerProps> = () => {
  const { commonT } = useI18nCommon()

  const { openDrawer, onChangeOpenDrawer } = PageHeaderContainer.useContainer()

  return (
    <Drawer
      width="80%"
      className={css['mobileDrawer']}
      open={openDrawer}
      onChangeOpen={onChangeOpenDrawer}
      footer={
        <div className="MobileDrawer-footer">
          <div className="space-y-4"></div>
        </div>
      }
    >
      <div className="drawer-inner">
        <Collapse
          expandIcon={({ isActive }) => {
            return (
              <IconFont
                type="icon-expand"
                className={classNames(
                  'fill-current transition-transform duration-300',
                  isActive ? 'rotate-0' : '-rotate-90'
                )}
              />
            )
          }}
        >
          {mapChildren(HeadNavOptions, ({ key, item }) => (
            <Panel
              className="nav-menu"
              showArrow={false}
              key={key}
              header={
                <A
                  className="menu-Item"
                  href={item.href}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {commonT(item.title)}
                </A>
              }
            ></Panel>
          ))}
        </Collapse>
      </div>
    </Drawer>
  )
}

export default MobileDrawer
