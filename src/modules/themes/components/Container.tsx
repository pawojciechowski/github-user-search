import styled from 'styled-components';
import { Theme } from '../types';

const Container = styled.div`
  padding-left: ${({ theme }: { theme: Theme }) => `${theme.spacer * 1.5}px`};
  padding-right: ${({ theme }: { theme: Theme }) => `${theme.spacer * 1.5}px`};

  @media screen and (min-width: 768px) {
    max-width: 700px;
    margin: auto;
  }
`;

export default Container;
