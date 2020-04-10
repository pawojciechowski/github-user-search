import React, { PropsWithChildren } from 'react';
import { Provider } from 'mobx-react';
import { GithubUserStore } from 'modules/user-search/stores/GithubUserStore';
import { githubApiService } from 'config/api/services';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';

const userStore = GithubUserStore.create({}, { apiService: githubApiService });
(window as any).store = userStore;

export function StateProvider({ children }: PropsWithChildren<{}>) {
  return <Provider userStore={userStore}>{children}</Provider>;
}

if (module.hot) {
  if (module.hot.data && module.hot.data.store) {
    applySnapshot(userStore, module.hot.data.store);
  }
  module.hot.dispose((data) => {
    data.store = getSnapshot(userStore);
  });
}

export default StateProvider;
