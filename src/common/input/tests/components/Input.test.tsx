import React from 'react';
import { render } from '@testing-library/react';
import Input from '../../components/Input';
import { testTheme } from 'config/tests/utils';

describe('<Input />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Input theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
