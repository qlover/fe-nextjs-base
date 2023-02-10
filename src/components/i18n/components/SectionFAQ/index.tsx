import { Collapse, StringWithHTML } from '@/components/common'
import { PageSection } from '@/components/pages'
import { domDataCompoent } from '@/utils/client'
import { FC } from 'react'
import css from './index.module.less'

const SectionFAQ: FC<I18nComponent.LocalesComponentInterface> = ({
  options,
  title
}) => {
  return (
    <PageSection
      {...domDataCompoent('SectionFAQ')}
      title={title}
      wrapperClassName={css['SectionFAQ']}
    >
      <div className="max-w-[720px] mx-auto">
        <Collapse
          className={css['faqCollapse']}
          bordered={false}
          options={options}
          renderPanel={(option) => ({
            header: <h3>{option.title}</h3>,
            children: <StringWithHTML value={option.description} />
          })}
        />
      </div>
    </PageSection>
  )
}

SectionFAQ.displayName = 'SectionFAQ'

export default SectionFAQ
