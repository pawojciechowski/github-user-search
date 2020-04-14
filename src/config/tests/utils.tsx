import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { Theme } from 'modules/themes/types';
import GithubUserStore from 'modules/user-search/stores/GithubUserStore';
import { Provider } from 'mobx-react';

export const testTheme: Theme = {
  spacer: 1,
  foreground: 'test',
  background: 'test',
  secondary: 'test',
  containerShadow: 'test',
  typography: {
    title: {
      fontSize: 'test',
      fontWeight: 'test',
      lineHeight: 'test',
      letterSpacing: 'test',
      color: 'test',
    },
    base: {
      fontFamily: 'test',
      fontSize: 'test',
      fontWeight: 'test',
      lineHeight: 'test',
      letterSpacing: 'test',
      color: 'test',
    },
  },
  input: {
    background: 'test',
    text: {
      color: 'test',
    },
    placeholder: {
      text: {
        color: 'test',
      },
    },
    icon: 'test',
  },
  button: {
    background: 'test',
    text: {
      color: 'test',
    },
    disabled: {
      background: 'testDisabled',
      text: {
        color: 'testDisabled',
      },
    },
  },
};

export const renderWithThemeProvider = (element: React.ReactNode, theme?: Theme) => {
  return render(<StyledComponentsThemeProvider theme={testTheme}>{element}</StyledComponentsThemeProvider>);
};

interface TestInitialState {
  userStore?: any;
}

export const getTestStores = (initialState: TestInitialState = {}) => {
  return {
    userStore: GithubUserStore.create({ ...initialState.userStore }),
  };
};

export const renderWithStateAndTheme = (element: React.ReactNode, theme?: Theme, initialState?: TestInitialState) => {
  const stores = getTestStores(initialState);

  return render(
    <Provider {...stores}>
      <StyledComponentsThemeProvider theme={testTheme}>{element}</StyledComponentsThemeProvider>
    </Provider>
  );
};
