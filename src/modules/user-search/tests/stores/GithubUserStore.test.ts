import { when } from 'mobx';
import { GithubUserResponse, GithubReposResponse } from 'config/api/types';
import { APIError } from 'modules/api/errors';

import GithubUserStore, { GithubUser, GithubRepo } from '../../stores/GithubUserStore';

const testUsername = 'testUsername';
const testReposResponse = [
  {
    id: 1,
    name: 'test1',
    html_url: 'test1',
    stargazers_count: 5,
  },
  {
    id: 2,
    name: 'test2',
    html_url: 'test2',
    stargazers_count: 7,
  },
  {
    id: 3,
    name: 'test3',
    html_url: 'test3',
    stargazers_count: 2,
  },
  {
    id: 4,
    name: 'test4',
    html_url: 'test4',
    stargazers_count: 4,
  },
] as GithubReposResponse;

const testReposSortedAndSliced = [
  {
    id: 2,
    name: 'test2',
    html_url: 'test2',
    stargazers_count: 7,
  },
  {
    id: 1,
    name: 'test1',
    html_url: 'test1',
    stargazers_count: 5,
  },
  {
    id: 4,
    name: 'test4',
    html_url: 'test4',
    stargazers_count: 4,
  },
] as GithubReposResponse;

const testUserResponse = {
  login: 'test',
  name: 'test',
  bio: 'test',
  avatar_url: 'test',
} as GithubUserResponse;

const apiServiceMock = {
  get: jest.fn((url) => {
    if (url === `/users/${testUsername}`) {
      return Promise.resolve(testUserResponse);
    } else if (url === `/users/${testUsername}/repos`) {
      return Promise.resolve(testReposResponse);
    }
  }),
};

const testError = new Error('test');

const apiServiceMockWithError = {
  get: jest.fn(() => {
    return Promise.reject(testError);
  }),
};

const apiServiceMockWith404 = {
  get: jest.fn(() => {
    return Promise.reject(new APIError('', {}, { status: 404 } as Response));
  }),
};

const getGithubUser = (
  userResponse: GithubUserResponse = testUserResponse,
  reposResponse: GithubReposResponse = testReposResponse
) => {
  return GithubUser.create({
    login: userResponse.login,
    name: userResponse.name!,
    bio: userResponse.bio,
    avatarUrl: userResponse.avatar_url,
    repos: reposResponse.map((repo) =>
      GithubRepo.create({
        id: repo.id,
        name: repo.name,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count,
      })
    ),
  });
};

describe('GithubUserStore', () => {
  it('can be created without errors', () => {
    expect(GithubUserStore.create()).toBeTruthy();
  });

  describe('actions', () => {
    describe('fetchUserWithRepos', () => {
      it('properly update state when success', async () => {
        const store = GithubUserStore.create({}, { apiService: apiServiceMock });
        await store.fetchUserWithRepos(testUsername);

        expect(store.lastSearchUsername).toBe(testUsername);
        expect(store.state).toBe('success');
        expect(store.user).toMatchObject(getGithubUser());
      });

      it('sets notFound state when 404 error happened', async () => {
        const store = GithubUserStore.create({}, { apiService: apiServiceMockWith404 });
        await store.fetchUserWithRepos(testUsername);

        expect(store.lastSearchUsername).toBe(testUsername);
        expect(store.state).toBe('notFound');
        expect(store.user).toBe(null);
      });

      it('sets error state when unknown error happened', async () => {
        const store = GithubUserStore.create({}, { apiService: apiServiceMockWithError });
        await store.fetchUserWithRepos(testUsername);

        expect(store.lastSearchUsername).toBe(testUsername);
        expect(store.state).toBe('error');
        expect(store.error).toBe(testError.message);
        expect(store.user).toBe(null);
      });

      it('sets pending state', async () => {
        expect.assertions(3);

        const store = GithubUserStore.create({}, { apiService: apiServiceMock });
        store.fetchUserWithRepos(testUsername);

        await when(
          () => store.state === 'pending',
          () => {
            expect(store.state).toBe('pending');
            expect(store.lastSearchUsername).toBe(testUsername);
            expect(store.user).toBe(null);
          }
        );
      });
    });
  });

  describe('views', () => {
    describe('isLoading', () => {
      it('returns false when no user fetched', () => {
        const store = GithubUserStore.create({});
        expect(store.isLoading).toBe(false);
      });

      it('returns true when state is pending', () => {
        const store = GithubUserStore.create({ state: 'pending' });
        expect(store.isLoading).toBe(true);
      });
    });

    describe('userWithTopRepos', () => {
      it('returns null when no user fetched', () => {
        const store = GithubUserStore.create({});
        expect(store.userWithTopRepos).toBe(null);
      });

      it('returns GithubUser instance with top 3 repos sorted by stars when there is a user', () => {
        const store = GithubUserStore.create({ user: getGithubUser() });
        expect(store.userWithTopRepos).toMatchObject(getGithubUser(testUserResponse, testReposSortedAndSliced));
      });
    });
  });
});
