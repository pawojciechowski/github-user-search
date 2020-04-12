import { types, flow, getEnv, Instance, getSnapshot } from 'mobx-state-tree';
import { IAPIService } from 'modules/api/types';
import { GithubUserResponse, GithubReposResponse } from '../../../config/api/types';
import { APIError } from 'modules/api/errors';

export const GithubRepo = types.model('GithubRepo', {
  id: types.identifierNumber,
  name: types.string,
  htmlUrl: types.string,
  stars: types.number,
});

export const GithubUser = types.model('GithubUser', {
  login: types.identifier,
  name: types.string,
  bio: types.maybeNull(types.string),
  avatarUrl: types.string,
  repos: types.array(GithubRepo),
});

export const GithubUserStore = types
  .model('GithubUserStore', {
    user: types.maybeNull(GithubUser),
    state: types.optional(
      types.union(
        types.literal('initial'),
        types.literal('pending'),
        types.literal('success'),
        types.literal('error'),
        types.literal('notFound')
      ),
      'initial'
    ),
    error: types.maybe(types.string),
    lastSearchUsername: types.maybe(types.string),
  })
  .actions((self) => ({
    fetchUserWithRepos: flow(function* fetchUserWithRepos(username) {
      self.user = null;
      self.lastSearchUsername = username;
      self.state = 'pending';

      const apiService: IAPIService = getEnv(self).apiService;
      const userResponsePromise = apiService.get<GithubUserResponse>(`/users/${username}`);
      const reposResponsePromise = apiService.get<GithubReposResponse>(`/users/${username}/repos`);

      try {
        const [userResponse, reposResponse]: [GithubUserResponse, GithubReposResponse] = yield Promise.all([
          userResponsePromise,
          reposResponsePromise,
        ]);
        self.user = GithubUser.create({
          login: userResponse.login,
          name: userResponse.name || '',
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
        self.state = 'success';
      } catch (error) {
        if (error instanceof APIError && error.response?.status === 404) {
          self.state = 'notFound';
          self.user = null;
        } else {
          self.state = 'error';
          self.error = error.message;
          self.user = null;
        }
      }
    }),
  }))
  .views((self) => ({
    get userWithTopRepos() {
      const snapshot = getSnapshot(self);

      if (snapshot.user === null) {
        return null;
      } else {
        return GithubUser.create({
          ...snapshot.user,
          repos: [...snapshot.user.repos].sort((repo1, repo2) => repo2.stars - repo1.stars).slice(0, 3),
        });
      }
    },
    get isLoading() {
      return self.state === 'pending';
    },
  }));

export interface IGithubUserStore extends Instance<typeof GithubUserStore> {}
export interface IGithubUser extends Instance<typeof GithubUser> {}
