import React from 'react';
import { render } from '@testing-library/react';
import Title from '../../components/Title';
import { Theme } from '../../types';

const testTheme = {
  typography: {
    title: {
      fontSize: 'test',
      fontWeight: 'test',
      lineHeight: 'test',
      letterSpacing: 'test',
      color: 'test',
    },
  },
  spacer: 1,
} as Theme;

describe('Title', () => {
  it('matches snapshot', () => {
    const { container } = render(<Title theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
