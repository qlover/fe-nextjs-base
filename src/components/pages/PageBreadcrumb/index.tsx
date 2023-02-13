import type { AProps } from '@/components/common/A'
import A from '@/components/common/A'
import useI18nCommon from '@/hooks/useI18nCommon'
import { StackPathType, usePathStack } from '@/hooks/usePathStack'
import { mapChildren } from '@/utils/client'
import {
  Breadcrumb as AntBreadcrumb,
  BreadcrumbProps as AntBreadcrumbProps
} from 'antd'
import { ReactNode } from 'react'

type BreadcrumbItem = AProps
type CellProps = { item: StackPathType; index: number }
type BreadcrumbProps = Component.WithOptions<BreadcrumbItem> & {
  hideLast?: boolean
  renderCell?: (props: CellProps, defaultNode: ReactNode) => ReactNode
  filterStack?: (options: StackPathType[]) => StackPathType[]
} & Pick<AntBreadcrumbProps, 'separator' | 'className' | 'style'>

PageBreadcrumb.i18nKey = ['root', 'blog', 'category']

/**
 *
 * 面包屑导航，获取拆分 pathname, 并不是访问栈
 *
 * 1. 会根据 单个 pathname 单独生成国际化文案
 *
 * @param param0
 * @returns
 */
function PageBreadcrumb({
  filterStack,
  renderCell,
  hideLast,
  ...rest
}: BreadcrumbProps) {
  const { commonT } = useI18nCommon()
  const { stack } = usePathStack()

  const _renderCell = (props: CellProps) => {
    const { item } = props

    const label = PageBreadcrumb.i18nKey.includes(item.key)
      ? commonT(`breadcrumb_${item.name}` as any)
      : item.key

    props.item.label = label

    const node = item.last ? (
      <span>{label}</span>
    ) : (
      <A href={item.path} title={label}>
        {label}
      </A>
    )

    return renderCell ? renderCell(props, node) : node
  }

  const stackOptions = () => {
    if (filterStack) {
      return filterStack(stack)
    }
    if (hideLast) {
      return stack.filter((i) => !i.last)
    }
    return stack
  }

  return (
    <AntBreadcrumb separator=">" {...rest}>
      {mapChildren(stackOptions(), ({ item, index }) => (
        <AntBreadcrumb.Item key={item.key}>
          {_renderCell({ item, index })}
        </AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
  )
}

export default PageBreadcrumb
