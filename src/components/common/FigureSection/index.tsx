import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import Arrange from '../Arrange'
import Figure, { FigureProps } from '../Figure'
import StringWithHTML from '../StringWithHTML'
import css from './index.module.less'

export type FigureSectionProps = Omit<FigureProps, 'extra'> & {
  header?: ReactNode
  contentHeader?: ReactNode
  /**
   * 小尺寸时图片是否在上方
   * @default false
   */
  topCover?: boolean
}
const FigureSection: FC<FigureSectionProps> = ({
  children,
  header,
  topCover,
  contentHeader,
  ...props
}) => {
  return (
    <Figure
      extra={
        header ? (
          <Arrange.Cell className="figure-head">{header}</Arrange.Cell>
        ) : null
      }
      coverClassName={topCover ? 'top-cover' : ''}
      {...props}
      className={classNames(css['figuresection'], props.className)}
    >
      {contentHeader ? (
        <h2 className="figuresection-head">{contentHeader}</h2>
      ) : null}

      <StringWithHTML className="figuresection-body" value={children} />
    </Figure>
  )
}

export default FigureSection
