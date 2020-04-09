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
    margin-right: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
  }
`;

interface SearchBarProps {
  userStore: IGithubUserStore;
}

export function SearchBar({ userStore }: SearchBarProps) {
  return (
    <SearchBarContainer>
      <Input placeholder="Search for users" />
      <Button disabled={userStore.isLoading} onClick={() => userStore.fetchUserWithRepos('pawojciechowski')}>
        Search
      </Button>
    </SearchBarContainer>
  );
}

export default inject('userStore')(observer(SearchBar)) as any;
