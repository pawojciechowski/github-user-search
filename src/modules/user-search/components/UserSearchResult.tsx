import React, { useMemo } from 'react';
import { observer, inject } from 'mobx-react';
import { IGithubUserStore } from '../stores/GithubUserStore';
import styled from 'styled-components';
import Title from 'modules/themes/components/Title';
import Text from 'modules/themes/components/Text';
import List from 'common/list/components/List';

// TODO: Add skeleton
const UserSearchResultContainer = styled.div``;
const UserSearchResultHeader = styled.div``;
const UserSearchResultAvatarContainer = styled.div``;

interface UserSearchResultProps {
  userStore: IGithubUserStore;
}

export function UserSearchResult({ userStore }: UserSearchResultProps) {
  const user = userStore.userWithTopRepos;
  const listItems = useMemo(() => {
    return user
      ? user.repos.map((repo) => ({
          id: repo.id.toString(),
          text: repo.name,
          href: repo.htmlUrl,
        }))
      : [];
  }, [user]);

  return (
    <UserSearchResultContainer>
      {user && (
        <>
          <UserSearchResultHeader>
            <UserSearchResultAvatarContainer>
              <img src={user.avatarUrl} alt="Avatar url" />
            </UserSearchResultAvatarContainer>
            <Title>{user.name}</Title>
          </UserSearchResultHeader>
          <Text>{user.bio}</Text>
          <List title="Top repositories" items={listItems} />
        </>
      )}
    </UserSearchResultContainer>
  );
}

export default inject('userStore')(observer(UserSearchResult)) as any;
