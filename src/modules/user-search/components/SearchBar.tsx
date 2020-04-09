import React from 'react';
import { observer, inject } from 'mobx-react';
import { IGithubUserStore } from '../stores/GithubUserStore';

interface SearchBarProps {
  user: IGithubUserStore
}

export function SearchBar({ user }: SearchBarProps) {
  return (
    <div>

    </div>
  )
}

export default inject('user')(observer(SearchBar)) as any;
