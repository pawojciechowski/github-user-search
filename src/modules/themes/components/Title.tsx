import styled from 'styled-components';
import { Theme } from '../types';

const Title = styled.h1`
  font-size: ${({ theme }: { theme: Theme}) => theme.typography.title.fontSize};
  font-weight: ${({ theme }: { theme: Theme}) => theme.typography.title.fontWeight};
  line-height: ${({ theme }: { theme: Theme}) => theme.typography.title.lineHeight};
  letter-spacing: ${({ theme }: { theme: Theme}) => theme.typography.title.letterSpacing};
  color: ${({ theme }: { theme: Theme}) => theme.typography.title.color};
  margin: 0;
  padding: 0;
`;

export default Title;
