import React from 'react';
import { render } from '@testing-library/react';
import List, { ListContainer, ListItemContent } from '../../components/List';
import { Theme } from 'modules/themes/types';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ListItem } from 'common/list/types';

const testTheme = {
  spacer: 1,
  foreground: 'test',
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
  },
} as Theme;

const testItemsWithHrefs: ListItem[] = [
  {
    id: '1',
    text: 'test1',
    href: 'http://localhost1',
  },
  {
    id: '2',
    text: 'test2',
    href: 'http://localhost2',
  },
];

const testItemsWithoutHrefs: ListItem[] = [
  {
    id: '1',
    text: 'test1',
  },
  {
    id: '2',
    text: 'test2',
  },
];

const testTitle = 'testTitle';

const renderWithThemeProvider = (element: React.ReactNode) => {
  return render(<StyledComponentsThemeProvider theme={testTheme}>{element}</StyledComponentsThemeProvider>);
};

describe('ListContainer', () => {
  it('matches snapshot', () => {
    const { container } = render(<ListContainer theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('ListItemContent', () => {
  it('matches snapshot', () => {
    const { container } = render(<ListItemContent theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('ListItemContentHref', () => {
  it('matches snapshot', () => {
    const { container } = render(<ListItemContent theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('List', () => {
  it('renders proper number of items', () => {
    const { container: container1 } = renderWithThemeProvider(<List items={testItemsWithHrefs} title={testTitle} />);
    expect(container1.querySelector('ul')?.children.length).toBe(2);

    const { container: container2 } = renderWithThemeProvider(<List items={[]} title={testTitle} />);
    expect(container2.querySelector('ul')?.children.length).toBe(0);
  });

  it('renders title text', () => {
    const { queryByText } = renderWithThemeProvider(<List items={testItemsWithHrefs} title={testTitle} />);
    expect(queryByText(testTitle)).toBeTruthy();
  });

  it('renders in anchor element when href is passed', () => {
    const { container } = renderWithThemeProvider(<List items={testItemsWithHrefs} title={testTitle} />);
    expect(container.querySelectorAll('li > a').length).toBe(2);
  });

  it('renders in div element when href is not passed', () => {
    const { container } = renderWithThemeProvider(<List items={testItemsWithoutHrefs} title={testTitle} />);
    expect(container.querySelectorAll('li > div').length).toBe(2);
  });

  it('matches snapshot', () => {
    const { container } = renderWithThemeProvider(<List items={testItemsWithHrefs} title={testTitle} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});