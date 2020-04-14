import React from 'react';
import UserSearch from 'modules/user-search/components/UserSearch';
import { renderWithStateAndTheme } from 'config/tests/utils';

describe('<UserSearch />', () => {
  it('should match snapshot', () => {
    const { container } = renderWithStateAndTheme(<UserSearch />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
