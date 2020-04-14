import GithubUserStore from 'modules/user-search/stores/GithubUserStore';
import { githubApiService } from 'config/api/services';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';

const userStore = GithubUserStore.create({}, { apiService: githubApiService });

if (module.hot) {
  if (module.hot.data && module.hot.data.store) {
    applySnapshot(userStore, module.hot.data.store);
  }
  module.hot.dispose((data) => {
    data.store = getSnapshot(userStore);
  });
}

const appStores = {
  userStore,
};

export type AppStores = typeof appStores;

export default appStores;
