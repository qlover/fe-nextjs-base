import Img, { ImgProps } from '@/components/common/Img'
import { domDataCompoent } from '@/utils/client'
import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import Arrange from '../Arrange'
import css from './index.module.less'

export type FigureProps = React.HTMLAttributes<HTMLElement> &
  Component.WithChildren<{
    coverClassName?: string
    contentClassName?: string

    extra?: ReactNode

    imgProps?: ImgProps

    cover?: ReactNode

    /**
     * 垂直模式, 主要单纯使用图片上文字下布局
     *
     * 支持两种布局，一种普通水平排列，小尺寸会显示成垂直排列
     *
     * 第二种就是垂直排列，不会受屏幕大小影响
     *
     */
    layout?: 'vertical' | 'horizontal'

    /**
     * 小尺寸时图片是否在上方
     */
    // topCover?: boolean
  }>

/**
 * 扩展 figure 元素
 * @returns
 */
const Figure: FC<FigureProps> = ({
  children,
  imgProps,
  layout = 'horizontal',
  className,
  coverClassName,
  contentClassName,
  cover,
  extra,
  ...restProps
}) => {
  return (
    <Arrange
      {...restProps}
      {...domDataCompoent('Figure')}
      data-layout={layout}
      miniSingle
      as="figure"
      className={classNames(css['layout-' + layout], className)}
    >
      {extra}

      <Arrange.Cell
        as="figcaption"
        className={classNames('figure-content', contentClassName)}
      >
        {children}
      </Arrange.Cell>

      <Arrange.Cell className={classNames('figure-cover', coverClassName)}>
        {imgProps ? <Img width={600} height={400} {...imgProps} /> : cover}
      </Arrange.Cell>
    </Arrange>
  )
}

export default Figure
