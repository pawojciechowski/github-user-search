import { baseFontCSS } from '../styles';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../types';

export default createGlobalStyle`
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
