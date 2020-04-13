import React from 'react';
import { render } from '@testing-library/react';
import Container from '../../components/Container';
import { Theme } from '../../types';

const testTheme = {
  spacer: 1,
} as Theme;

describe('Container', () => {
  it('use proper padding based on spacer property in theme', () => {
    const { container } = render(<Container theme={testTheme} />);
    expect(container.firstChild).toHaveStyleRule('padding-left', '1.5px');
    expect(container.firstChild).toHaveStyleRule('padding-right', '1.5px');
  });

  it('matches snapshot', () => {
    const { container } = render(<Container theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
