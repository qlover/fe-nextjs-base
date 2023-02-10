import { createContainer } from 'unstated-next'

function useI18nComponents(props: I18nComponent.ContainerProps = {}) {
  return props
}

const I18nComponentsContainer = createContainer(useI18nComponents)

export const { Provider: I18nComponentProvider } = I18nComponentsContainer

export default I18nComponentsContainer
