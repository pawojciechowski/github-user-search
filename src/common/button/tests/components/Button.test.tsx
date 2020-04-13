import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';
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
} as Theme;

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
