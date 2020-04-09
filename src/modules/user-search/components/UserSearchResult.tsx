import React from 'react';
import { observer, inject } from 'mobx-react';
import { IGithubUserStore } from '../stores/GithubUserStore';

interface UserSearchResultProps {
  user: IGithubUserStore
}

export function UserSearchResult({ user }: UserSearchResultProps) {
  return (
    <div>

    </div>
  )
}

export default inject('user')(observer(UserSearchResult)) as any;
