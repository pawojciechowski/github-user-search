import { Theme, ThemeName } from './types';
import colors from './colors';
import searchIcon from 'assets/icons/search-icon.svg';

export const themeNames = ['default'] as const;

export const themes: { [key in ThemeName]: Theme } = {
  default: {
    foreground: colors.white,
    background: colors.gray2,
    secondary: colors.blue2,
    input: {
      placeholder: {
        text: {
          color: colors.gray3,
        },
      },
      text: {
        color: colors.gray5,
      },
      background: colors.gray1,
      icon: searchIcon,
    },
    button: {
      text: {
        color: colors.white,
      },
      background: colors.blue1,
      disabled: {
        text: {
          color: colors.gray4,
        },
        background: colors.gray1,
      },
    },
    spacer: 16,
    typography: {
      base: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '19px',
        fontWeight: 'normal',
        letterSpacing: '0.4px',
        color: colors.gray4,
      },
      title: {
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: colors.black,
      },
    },
    containerShadow: '0px 2px 7px rgba(0, 0, 0, 0.1)',
  },
};
