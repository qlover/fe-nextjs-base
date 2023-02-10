import { renderWithFuncNode } from '@/utils/client/nodeChild'
import {
  Dropdown as AntdDropdown,
  DropDownProps as AntDropDownProps
} from 'antd'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import IconFont from '../IconFont'
import css from './index.module.less'

type OmitAntDropsProps = Omit<
  AntDropDownProps,
  'visible' | 'onVisibleChange' | 'overlay' | 'children'
>

export type DropdownProps = Component.UI<
  OmitAntDropsProps & {
    children?: Component.WithFuncNode

    /**
     * 下拉层
     */
    overlay: Component.WithFuncNode

    showArrow?: boolean
  }
>

/**
 * 下拉菜单基于 antd Dropdown
 *
 * @param param0
 * @returns
 */
const Dropdown: FC<DropdownProps> = ({
  children,
  overlay,
  showArrow,
  trigger = ['hover'],
  className,
  open,
  onOpenChange,
  overlayClassName,
  style,
  ...antProps
}) => {
  const [innerOpen, setInnerOpen] = useState(open)

  useEffect(() => {
    setInnerOpen(open)
  }, [open])

  return (
    <AntdDropdown
      trigger={trigger}
      {...antProps}
      open={innerOpen}
      onOpenChange={(open) => {
        if (onOpenChange) {
          onOpenChange?.(open)
        } else {
          setInnerOpen(open)
        }
      }}
      dropdownRender={() => (
        <div className={classNames(css['dropdown-overly'], overlayClassName)}>
          {renderWithFuncNode(overlay)}
        </div>
      )}
    >
      <div
        className={classNames(css['dropdown-trigger'], className)}
        style={style}
      >
        {renderWithFuncNode(children)}
        {showArrow ? (
          <IconFont
            type="icon-expand"
            className={classNames(
              'inline-block ml-1 group-hover:text-gray-500 text-[0.8rem] transition-transform scale-150',
              { '-scale-y-100': innerOpen }
            )}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </AntdDropdown>
  )
}

export default Dropdown
