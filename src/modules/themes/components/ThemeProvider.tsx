import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { themes } from '../themes';
import GlobalStyles from './GlobalStyles';

function ThemeProvider({ children }: PropsWithChildren<{}>) {
  return (
    <StyledComponentsThemeProvider theme={themes['default']}>
      <GlobalStyles />
      {children}
    </StyledComponentsThemeProvider>
  );
}

export default ThemeProvider;
