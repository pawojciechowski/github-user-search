import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components';
import { Theme, ThemeName } from '../types';
import { themes } from '../themes';
import { baseFontCSS } from '../styles';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }

  body {
    ${baseFontCSS}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    background: ${({ theme }: { theme: Theme }) => theme.background};
  }

  #root {
    height: 100%;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  // TODO: Get theme from state
  const themeName: ThemeName = 'default';

  return (
    <StyledComponentsThemeProvider theme={themes[themeName]}>
      <GlobalStyle />
      {children}
    </StyledComponentsThemeProvider>
  );
}

export default ThemeProvider;
