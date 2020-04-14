import React from 'react';
import { renderWithThemeProvider } from 'config/tests/utils';
import { UserSearchResult } from 'modules/user-search/components/UserSearchResult';
import { IGithubUserStore } from 'modules/user-search/stores/GithubUserStore';

describe('<UserSearchResult />', () => {
  it('should match snapshot when in initial state', () => {
    const userStore = ({
      state: 'initial',
    } as unknown) as IGithubUserStore;

    const { container } = renderWithThemeProvider(<UserSearchResult userStore={userStore} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when in notFound state', () => {
    const userStore = ({
      state: 'notFound',
      lastSearchUsername: 'testLastSearchUsername',
    } as unknown) as IGithubUserStore;

    const { container } = renderWithThemeProvider(<UserSearchResult userStore={userStore} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when in error state', () => {
    const userStore = ({
      state: 'error',
    } as unknown) as IGithubUserStore;

    const { container } = renderWithThemeProvider(<UserSearchResult userStore={userStore} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when in success state', () => {
    const userStore = ({
      state: 'success',
      userWithTopRepos: {
        login: 'testLogin',
        name: 'test Name',
        bio: 'testBio',
        avatarUrl: 'testUrl',
        repos: [
          {
            id: 1,
            name: 'testRepo1',
            htmlUrl: 'testRepoUrl1',
            stars: 1,
          },
        ],
      },
    } as unknown) as IGithubUserStore;

    const { container } = renderWithThemeProvider(<UserSearchResult userStore={userStore} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
