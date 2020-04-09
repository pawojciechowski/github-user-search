import React, { PropsWithChildren } from 'react';
import { Provider } from "mobx-react";
import { GithubUserStore } from 'modules/user-search/stores/GithubUserStore';
import { githubApiService } from 'config/api';

const user = GithubUserStore.create({}, { apiService: githubApiService });

export function StateProvider({ children }: PropsWithChildren<{}>) {
  return (
    <Provider user={user}>
      {children}
    </Provider>
  )
}

export default StateProvider;
