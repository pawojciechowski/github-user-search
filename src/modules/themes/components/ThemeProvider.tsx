import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeName } from '../types';
import { themes } from '../themes';
import GlobalStyles from './GlobalStyles';

function ThemeProvider({ children }: PropsWithChildren<{}>) {
  // TODO: Get theme from state
  const themeName: ThemeName = 'default';

  return (
    <StyledComponentsThemeProvider theme={themes[themeName]}>
      <GlobalStyles />
      {children}
    </StyledComponentsThemeProvider>
  );
}

export default ThemeProvider;
