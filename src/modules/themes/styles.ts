import { css } from "styled-components";
import { Theme } from "./types";

export const baseFontCSS = css`
  font-family: ${({ theme }: { theme: Theme}) => theme.typography.base.fontFamily};
  font-size: ${({ theme }: { theme: Theme}) => theme.typography.base.fontSize};
  line-height: ${({ theme }: { theme: Theme}) => theme.typography.base.lineHeight};
  font-weight: ${({ theme }: { theme: Theme}) => theme.typography.base.fontWeight};
  letter-spacing: ${({ theme }: { theme: Theme}) => theme.typography.base.letterSpacing};
  color: ${({ theme }: { theme: Theme}) => theme.typography.base.color};
`;
