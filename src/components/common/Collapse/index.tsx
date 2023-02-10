import { mapChildren } from '@/utils/client'
import {
  Collapse as AntdCollapse,
  CollapsePanelProps,
  CollapseProps as AntCollapseProps
} from 'antd'
import classNames from 'classnames'
import { IconSvgExpand } from '../SvgIcon'

const { Panel } = AntdCollapse

/**
 * @todo type
 */
type CollapseProps<T> = Component.WithOptions<T> &
  AntCollapseProps & {
    renderPanel: (props: T) => Omit<CollapsePanelProps, 'key'>
  }

function Collapse<T>({ options, renderPanel, ...restProps }: CollapseProps<T>) {
  return (
    <AntdCollapse
      expandIconPosition="right"
      expandIcon={({ isActive }) => (
        <IconSvgExpand
          className={classNames(
            'transition-transform duration-300',
            isActive ? 'rotate-180' : ''
          )}
        />
      )}
      {...restProps}
    >
      {mapChildren(options, ({ key, item }) => {
        return <Panel {...renderPanel(item)} key={key} />
      })}
    </AntdCollapse>
  )
}

export default Collapse
