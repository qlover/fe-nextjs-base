import dynamic from 'next/dynamic'

export const DynamicComponentsMap = {
  SectionFAQ: dynamic(() => import('./components/SectionFAQ'))
}
