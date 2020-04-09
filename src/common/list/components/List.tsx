import React from 'react';
import styled from 'styled-components';
import Title from 'modules/themes/components/Title';

const ListContainer = styled.div``;
const ListItemContent = styled.div``;
const ListItemContentHref = styled.a``;

interface ListItem {
  id: string;
  text: string;
  href?: string;
}

interface ListProps {
  title: string;
  items: ListItem[];
}

export function List({ title, items }: ListProps) {
  return (
    <ListContainer>
      <Title>{title}</Title>
      <ul>
        {items.map((item) => {
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
        })}
      </ul>
    </ListContainer>
  );
}

export default List;
