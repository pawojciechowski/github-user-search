import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';
import { testTheme } from 'config/tests/utils';

describe('<Button />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
