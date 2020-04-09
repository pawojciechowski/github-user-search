import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserSearchResult from './UserSearchResult';

const UserSearchContainer = styled.div``;
const UserSearchHeader = styled.div``;

function UserSearch() {
  return (
    <UserSearchContainer>
      <UserSearchHeader>
        <SearchBar />
      </UserSearchHeader>
      <UserSearchResult />
    </UserSearchContainer>
  )
}

export default UserSearch;
