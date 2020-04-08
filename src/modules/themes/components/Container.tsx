import styled from 'styled-components';
import { Theme } from '../types';

const Container = styled.div`
  padding-left: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
  padding-right: ${({ theme }: { theme: Theme}) => `${theme.spacer * 1.5}px`};
`;

export default Container;
