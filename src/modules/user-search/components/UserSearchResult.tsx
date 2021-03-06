import React, { useMemo } from 'react';
import { observer, inject } from 'mobx-react';
import { IGithubUserStore, IGithubUser } from '../stores/GithubUserStore';
import styled from 'styled-components';
import Title from 'modules/themes/components/Title';
import Text from 'modules/themes/components/Text';
import List from 'common/list/components/List';
import { Theme } from 'modules/themes/types';
import { ListItem } from 'common/list/types';
import Skeleton from 'react-loading-skeleton';

const UserSearchResultContainer = styled.div``;
const UserSearchResultHeader = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};

  ${Title} {
    margin-bottom: 0;
  }
`;
const UserSearchResultAvatarContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
`;

const UserSearchResultBio = styled(Text)`
  margin-bottom: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
`;

const renderContent = (userStore: IGithubUserStore, listItems: ListItem[], user: IGithubUser | null) => {
  switch (userStore.state) {
    case 'notFound':
      return (
        <>
          <Title as="h2">Couldn't find user with username "{userStore.lastSearchUsername}" :(</Title>
          <Text>Please make sure you don't misspelled the username</Text>
        </>
      );
    case 'initial':
      return (
        <>
          <Title as="h2">Let's find a Github user!</Title>
          <Text>Start with typing the username in the search box :)</Text>
        </>
      );
    case 'error':
      return <Title as="h2">There was an error while searching the user :(</Title>;
    default:
      return (
        <>
          <UserSearchResultHeader>
            <UserSearchResultAvatarContainer>
              {!userStore.isLoading ? (
                user && <img src={user.avatarUrl} alt="Avatar url" />
              ) : (
                <Skeleton height="100%" />
              )}
            </UserSearchResultAvatarContainer>
            <Title>
              {!userStore.isLoading ? (
                user &&
                user.name.split(' ').map((word, i) => {
                  return (
                    <React.Fragment key={i}>
                      {word}
                      <br />
                    </React.Fragment>
                  );
                })
              ) : (
                <>
                  <Skeleton width={70} />
                  <br />
                  <Skeleton width={120} />
                </>
              )}
            </Title>
          </UserSearchResultHeader>
          <UserSearchResultBio>{!userStore.isLoading ? user && user.bio : <Skeleton count={2} />}</UserSearchResultBio>
          <List title="Top repositories" items={listItems} loading={userStore.isLoading} />
        </>
      );
  }
};

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

  return <UserSearchResultContainer>{renderContent(userStore, listItems, user)}</UserSearchResultContainer>;
}

export default inject('userStore')(observer(UserSearchResult)) as any;
