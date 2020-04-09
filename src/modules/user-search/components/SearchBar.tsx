import React from 'react';
import { observer, inject } from 'mobx-react';
import { IGithubUserStore } from '../stores/GithubUserStore';
import Button from 'common/button/components/Button';
import Input from 'common/input/components/Input';
import styled from 'styled-components';
import { Theme } from 'modules/themes/types';

const SearchBarContainer = styled.div`
  display: flex;

  ${Input} {
    flex-grow: 1;
    margin-right: ${({ theme }: { theme: Theme}) => `${theme.spacer}px`};
  }
`;

interface SearchBarProps {
  user: IGithubUserStore
}

export function SearchBar({ user }: SearchBarProps) {
  return (
    <SearchBarContainer>
      <Input placeholder="Search for users"/>
      <Button disabled={user.isLoading} onClick={() => user.fetchUserWithRepos('pawojciechowski')}>Search</Button>
    </SearchBarContainer>
  )
}

export default inject('user')(observer(SearchBar)) as any;
