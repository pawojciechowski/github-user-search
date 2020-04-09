import styled from 'styled-components';
import { Theme } from 'modules/themes/types';
import { baseFontCSS } from 'modules/themes/styles';

const Button = styled.button`
  ${baseFontCSS}
  font-size: 12px;
  line-height: 12px;
  padding: ${({ theme }: { theme: Theme }) => `${theme.spacer * 0.75}px`};
  background: ${({ theme }: { theme: Theme }) => theme.button.background};
  color: ${({ theme }: { theme: Theme }) => theme.button.text.color};
  border-radius: 8px;
  font-weight: bold;
  white-space: nowrap;
  border: none;
  cursor: pointer;

  transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

  &[disabled] {
    background: ${({ theme }: { theme: Theme }) => theme.button.disabled?.background};
    color: ${({ theme }: { theme: Theme }) => theme.button.disabled?.text.color};
  }
`;

export default Button;
