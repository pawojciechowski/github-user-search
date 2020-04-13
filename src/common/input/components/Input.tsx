import React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from 'modules/themes/types';
import { baseFontCSS } from 'modules/themes/styles';

const BaseInput = styled.input`
  ${baseFontCSS}
  color: ${({ theme }: { theme: Theme }) => theme.input.text.color};
  line-height: 16px;
  padding: ${({ theme }: { theme: Theme }) => {
    const val = `${theme.spacer * 0.625}px`;
    return `${val} ${val} ${val} 32px`;
  }};
  background: ${({ theme }: { theme: Theme }) => theme.input.background};
  border-radius: 8px;
  border: none;
  box-sizing: border-box;
  width: 100%;

  &::placeholder {
    color: ${({ theme }: { theme: Theme }) => theme.input.placeholder?.text.color};
  }
`;

const InputContainer = ({ className, ...rest }: any) => {
  return (
    <div className={className}>
      <BaseInput {...rest} />
    </div>
  );
};

const Input = styled(InputContainer)`
  position: relative;

  ${({ theme }: { theme: Theme }) => {
    if (theme.input.icon) {
      return css`
        &:before {
          content: '';
          position: absolute;
          left: 8px;
          top: 10px;
          width: 16px;
          height: 16px;
          background-image: url(${theme.input.icon});
        }
      `;
    }
  }}
`;

export default Input;
