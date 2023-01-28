import { Drawer as AndDrawer, DrawerProps as AntdDrawerProps } from 'antd'
import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import IconFont from '../IconFont'
import css from './index.module.less'

type DrawerProps = AntdDrawerProps & {
  onChangeOpen?: (open: boolean) => void
}

/**
 *
 * 抽屉组件
 *
 * @override `antd/drawer`
 * @param param0
 * @returns
 */
const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  onChangeOpen,
  children,
  title,
  ...AntProps
}) => {
  const _onClose = () => {
    onChangeOpen?.(false)
  }

  return (
    <AndDrawer
      open={AntProps.open}
      onClose={_onClose}
      afterOpenChange={onChangeOpen}
      placement="right"
      closable={false}
      width="inherit"
      title={
        <div className="drawer-head">
          <div>{title}</div>

          <IconFont
            className="text-2xl text-[#ccc]"
            type="icon-close"
            onClick={_onClose}
          />
        </div>
      }
      {...AntProps}
      rootClassName={classNames('drawer-root', AntProps.rootClassName)}
      className={classNames(css['drawer'], AntProps.className)}
    >
      <div className={classNames('drawer-main')}>{children}</div>
    </AndDrawer>
  )
}

export default Drawer
