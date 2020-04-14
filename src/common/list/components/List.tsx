import React from 'react';
import styled, { css } from 'styled-components';
import Title from 'modules/themes/components/Title';
import { Theme } from 'modules/themes/types';
import { ListItem } from '../types';
import Skeleton from 'react-loading-skeleton';

const ListContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    display: block;
    margin-bottom: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
  }
`;

const listItemStyles = css`
  display: block;
  padding: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
  background: ${({ theme }: { theme: Theme }) => `${theme.foreground}`};
  box-shadow: ${({ theme }: { theme: Theme }) => `${theme.containerShadow}`};
  border-radius: 12px;
  line-height: 16px;
  color: ${({ theme }: { theme: Theme }) => `${theme.secondary}`};
`;

const ListItemContent = styled.div`
  ${listItemStyles}
`;

const ListItemContentHref = styled.a`
  ${listItemStyles}
  text-decoration: none;
`;

interface ListProps {
  title: string;
  items: ListItem[];
  loading?: boolean;
}

export function List({ title, items, loading }: ListProps) {
  return (
    <ListContainer>
      <Title as="h2">{title}</Title>
      <ul>
        {!loading
          ? items.map((item) => {
              return (
                <li key={item.id}>
                  {item.href ? (
                    <ListItemContentHref rel="noopener nofollow noreferer" target="_blank" href={item.href}>
                      {item.text}
                    </ListItemContentHref>
                  ) : (
                    <ListItemContent>{item.text}</ListItemContent>
                  )}
                </li>
              );
            })
          : [...(Array(3).keys() as any)].map((i) => {
              return (
                <li key={i}>
                  <Skeleton height={48} />
                </li>
              );
            })}
      </ul>
    </ListContainer>
  );
}

export default List;
