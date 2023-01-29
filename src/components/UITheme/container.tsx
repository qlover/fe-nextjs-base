import { useUITheme } from '@/hooks/useUITheme'
import { ThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react'
import { createContainer } from 'unstated-next'

type UIThemeState = {}

type UIThemeProps = {
  children?: ReactNode
  value?: UIThemeProps
}

export const UIThemeContainer = createContainer(useUITheme)

/**
 * 页面主题服务提供
 * @param param0
 * @returns
 */
export const UIThemeContext: FC<UIThemeProps> = ({ value, children }) => {
  return (
    <UIThemeContainer.Provider>
      <ThemeProvider>{children}</ThemeProvider>
    </UIThemeContainer.Provider>
  )
}
