import { themeNames } from './themes';

export type Color = string;
export type FontSize = string;
export type FontWeight = string;
export type FontFamily = string;
export type LineHeight = string;
export type LetterSpacing = string;

interface FontSettings {
  fontFamily?: FontFamily,
  fontSize?: FontSize,
  fontWeight?: FontWeight,
  lineHeight?: LineHeight,
  letterSpacing?: LetterSpacing,
  color?: Color
}

interface InputStyles {
  placeholder?: {
    text: FontSettings
  },
  background: Color,
  text: FontSettings
}

interface ButtonStyles {
  background: Color,
  text: FontSettings
}

interface TypographySettings {
  base: FontSettings,
  title: FontSettings
}

export interface Theme {
  background: Color,
  input: InputStyles,
  button: ButtonStyles,
  spacer: number,
  typography: TypographySettings,
}

export type ThemeName = typeof themeNames[number];
