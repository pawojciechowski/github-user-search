import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserSearchResult from './UserSearchResult';
import Container from 'modules/themes/components/Container';
import { Theme } from 'modules/themes/types';

const UserSearchContainer = styled.div``;
const UserSearchHeader = styled(Container)`
  padding-top: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
  padding-bottom: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
  background: ${({ theme }: { theme: Theme}) => theme.foreground};
  box-shadow: ${({ theme }: { theme: Theme}) => theme.containerShadow};
`;
const UserSearchResultContainer = styled(Container)`
  padding-top: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
  padding-bottom: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
`;

function UserSearch() {
  return (
    <UserSearchContainer>
      <UserSearchHeader>
        <SearchBar />
      </UserSearchHeader>
      <UserSearchResultContainer>
        <UserSearchResult />
      </UserSearchResultContainer>
    </UserSearchContainer>
  )
}

export default UserSearch;
