import { AProps } from '@/components/common/A'
import useCacheState from '@/hooks/common/useCacheState'
import { mapChildren } from '@/utils/client'
import { ReactNode, useEffect } from 'react'
import Dropdown, { DropdownProps } from '../Dropdown'
import css from './index.module.less'

export type SelectOption = {
  selected?: boolean
  aProps?: AProps
  icon?: ReactNode
}

type SelectState<T> = {
  open?: boolean
  value?: any
  selected?: T
}

export type SelectProps<T> = Partial<DropdownProps> &
  Component.WithOptions<T> & {
    value?: any
    onChange?: (value: any | undefined, item: T) => void
    placeholder?: string
    renderOption?: (props: Component.MapRenderProps<T>) => ReactNode
    renderTrigger?: (props: SelectState<T>) => ReactNode
  }

function findWithValue(value: any, options?: any[]) {
  const result = { value, selected: {} }
  if (options) {
    result.selected = options.find((i) => i.value === value)
  }
  return result
}

/**
 * 下拉框组件
 *
 * TODO: 虚拟滚动
 *
 * @param props
 * @returns
 */
function Select<T = SelectOption>(props: SelectProps<T>) {
  const {
    options,
    onChange,
    value,
    placeholder,
    renderOption,
    renderTrigger,
    ...dropProps
  } = props

  const [innerstate, setInnserState] = useCacheState<SelectState<T>>({
    ...(findWithValue(value, options) as any),
    open: false
  })

  useEffect(() => {
    setInnserState(findWithValue(value, options) as any)
  }, [value])

  const _onChange = (val: any, item: T) => {
    onChange?.(val, item)

    setInnserState({ value, selected: item, open: false })
  }

  const _renderTrigger = (): any => {
    if (renderTrigger) {
      return renderTrigger(innerstate)
    }

    const { selected } = innerstate

    if (selected === undefined) {
      return <span className="select-placeholder">{placeholder}</span>
    }
    // @ts-expect-error
    return <span className="flex-1">{selected?.label}</span>
  }

  const renderOverlay: DropdownProps['overlay'] = () => {
    return (
      <div className={css['select-content']}>
        {mapChildren(options, (props) => {
          const { item } = props
          const { icon, label, value } = (item || {}) as any
          // TODO: 调整 node 节点 onchange 事件问题，暂时用 span 标签套一层
          const node = (
            <div
              key={props.key}
              className={
                'hover:bg-[#3067FD] text-black hover:text-white transition-colors duration-100 cursor-pointer py-1 px-2'
              }
            >
              {icon ? icon : null}
              <span>{label || item}</span>
            </div>
          )

          return (
            <span
              key={props.key}
              onClickCapture={() => {
                _onChange(value || item, item)
              }}
            >
              {renderOption ? renderOption(props) : node}
            </span>
          )
        })}
      </div>
    )
  }
  return (
    <Dropdown
      open={innerstate.open}
      onOpenChange={(open) => {
        setInnserState({
          open: open
        })
      }}
      showArrow
      overlay={dropProps?.overlay || renderOverlay}
      {...dropProps}
    >
      {_renderTrigger}
    </Dropdown>
  )
}

export default Select
