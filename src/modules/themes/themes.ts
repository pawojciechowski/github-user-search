import { Theme, ThemeName } from './types';
import colors from './colors';

export const themeNames = ['default'] as const;

export const themes: {[key in ThemeName]: Theme} = {
  default: {
    background: colors.gray2,
    input: {
      placeholder: {
        text: {
          color: colors.gray3
        }
      },
      text: {
        color: colors.gray5
      },
      background: colors.gray1
    },
    button: {
      text: {
        color: colors.white
      },
      background: colors.blue1
    },
    spacer: 16,
    typography: {
      base: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '19px',
        letterSpacing: '0.4px',
        color: colors.gray4
      },
      title: {
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: colors.black
      }
    }
  }
};

