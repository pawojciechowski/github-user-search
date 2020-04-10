import React, { useState } from 'react';
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

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, userStore: IGithubUserStore) => {
  if (e.key === 'Enter') {
    userStore.fetchUserWithRepos(e.currentTarget.value);
  }
};

const handleChange = (
  e: React.FormEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setInputValue(e.currentTarget.value);
};

interface SearchBarProps {
  userStore: IGithubUserStore;
}

export function SearchBar({ userStore }: SearchBarProps) {
  const [value, setInputValue] = useState('');
  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e, setInputValue)}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e, userStore)}
        placeholder="Search for users"
      />
      <Button disabled={userStore.isLoading} onClick={() => userStore.fetchUserWithRepos(value)}>
        Search
      </Button>
    </SearchBarContainer>
  );
}

export default inject('userStore')(observer(SearchBar)) as any;
