import workConfig from '@/config/workConfig'
import { mapChildren } from '@/utils/client'
import { clientLog } from '@/utils/common/logger'
import React, { FC } from 'react'
import { DynamicComponentsMap } from '../config/consts'
import I18nComponentsContainer from '../container'

interface I18nComponentProps
  extends Component.UI,
    I18nComponent.ContainerProps {
  components: I18nComponent.Base<any>[]

  /**
   * 可自定义渲染指定类型组件, 需要给组件加 key
   * @param props
   * @returns
   */
  children?(
    props: I18nComponent.Base<any>
  ): false | undefined | React.ReactElement
}

/**
 * 用于统一渲染 locales 中定义的 `I18nComponent.Base` 类型组件
 * @param param0
 * @returns
 */
const I18nComponents: FC<I18nComponentProps> = ({
  children,
  components,
  ...containerProps
}) => {
  return (
    <I18nComponentsContainer.Provider initialState={containerProps}>
      {mapChildren(components, ({ key, item }) => {
        if (children) {
          const resultChild = children(item)
          if (resultChild) {
            return resultChild
          }
        }

        const DynComponent = DynamicComponentsMap[item.type]

        if (!DynamicComponentsMap[item.type]) {
          if (workConfig.appEnv !== 'master') {
            clientLog.error(`not ${item.type} Component!`)
          }

          return null
        }

        return <DynComponent key={key} {...item.props} />
      })}
    </I18nComponentsContainer.Provider>
  )
}

export default I18nComponents
