import React from 'react';
import { renderWithThemeProvider } from 'config/tests/utils';
import { UserSearchResult } from 'modules/user-search/components/UserSearchResult';
import { IGithubUserStore } from 'modules/user-search/stores/GithubUserStore';

const getTestUserStore = (data: {} = {}) =>
  (({
    isLoading: false,
    ...data,
  } as unknown) as IGithubUserStore);

describe('<UserSearchResult />', () => {
  it('should render', () => {
    renderWithThemeProvider(<UserSearchResult userStore={getTestUserStore()} />);
  });
});
