import classNames from 'classnames'
import { isString } from 'lodash'
import { FC, PropsWithChildren, ReactNode } from 'react'

import css from './index.module.less'

export type PageSectionProps = PropsWithChildren<
  Component.UI & {
    title?: ReactNode
    subTitle?: ReactNode
    wrapperClassName?: string
    bodyClassName?: string
    subClassName?: string
  }
>

const PageSection: FC<PageSectionProps> = ({
  wrapperClassName,
  bodyClassName,
  className,
  style,
  title,
  subTitle,
  subClassName,
  children,
  ...restProps
}) => {
  const sectionHeader = () => {
    if (title || subTitle) {
      return (
        <div className="PageSection-head">
          <div className="pageSection-title">
            {isString(title) ? <h2>{title}</h2> : title}
          </div>

          {subTitle ? (
            <div className={classNames('pageSection-subtitle', subClassName)}>
              {subTitle}
            </div>
          ) : null}
        </div>
      )
    }

    return null
  }

  const SectionHeader = sectionHeader()

  return (
    <section
      className={classNames(css['wrapper'], wrapperClassName)}
      {...restProps}
    >
      <div className={classNames('PageSection-main', className)} style={style}>
        {SectionHeader}

        {children ? (
          <div className={classNames('PageSection-body', bodyClassName)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default PageSection
