import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

/**
 * 用于 UITheme container 容器
 * @returns
 */
export const useUITheme = () => {
  const { theme, themes, setTheme: setNextTheme } = useTheme()
  const [themeValue, setThemeValue] = useState<UITheme.ThemeMode>('system')

  useEffect(() => setThemeValue(theme as UITheme.ThemeMode), [theme])

  const setTheme = useCallback((value: UITheme.ThemeMode) => {
    setNextTheme(value)
    // setThemeValue(value)
  }, [])

  return { theme: themeValue, setTheme, themes }
}
