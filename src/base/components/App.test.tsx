import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getTestStores } from 'config/tests/utils';

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App stores={getTestStores()} />);
  });
});
