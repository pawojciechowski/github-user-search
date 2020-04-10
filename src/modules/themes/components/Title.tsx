import styled from 'styled-components';
import { Theme } from '../types';

const Title = styled.h1`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.title.fontSize};
  font-weight: ${({ theme }: { theme: Theme }) => theme.typography.title.fontWeight};
  line-height: ${({ theme }: { theme: Theme }) => theme.typography.title.lineHeight};
  letter-spacing: ${({ theme }: { theme: Theme }) => theme.typography.title.letterSpacing};
  color: ${({ theme }: { theme: Theme }) => theme.typography.title.color};
  margin-top: 0;
  margin-bottom: ${({ theme }: { theme: Theme }) => `${theme.spacer}px`};
  padding: 0;
`;

export default Title;
