import React from 'react';
import { render } from '@testing-library/react';
import Input from '../../components/Input';
import { Theme } from 'modules/themes/types';

const testTheme = {
  typography: {
    base: {
      fontSize: 'test',
      fontWeight: 'test',
      lineHeight: 'test',
      letterSpacing: 'test',
      color: 'test',
    },
  },
  spacer: 1,
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
} as Theme;

describe('Input', () => {
  it('matches snapshot', () => {
    const { container } = render(<Input theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
