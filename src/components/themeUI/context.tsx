import { ThemeProvider } from "next-themes";
import React, { FC, ReactNode } from "react";
import { createContainer } from "unstated-next";

type ThemeUIState = {};

function useContainer(initialState?: ThemeUIState) {}

export const ThemeUIContainer = createContainer(useContainer);

export const ThemeUI: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeUIContainer.Provider>{children}</ThemeUIContainer.Provider>
    </ThemeProvider>
  );
};
