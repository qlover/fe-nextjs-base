import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeType = "system" | "drak";

export const useThemeUI = () => {
  const { theme, themes, setTheme } = useNextTheme();
  const [themeValue, setThemeValue] = useState<ThemeType>("system");

  useEffect(() => setThemeValue(theme as ThemeType), [theme]);

  return { theme: themeValue, setTheme, themes };
};
