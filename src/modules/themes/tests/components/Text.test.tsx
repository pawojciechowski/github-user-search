import React from 'react';
import { render } from '@testing-library/react';
import Text from '../../components/Text';
import { Theme } from '../../types';

const testTheme = {
  spacer: 1,
} as Theme;

describe('<Text />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Text theme={testTheme} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
