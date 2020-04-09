import styled from 'styled-components';
import { Theme } from '../types';

const Text = styled.p`
  margin: 0;
  padding-bottom: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
`;

export default Text;
