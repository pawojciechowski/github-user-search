import { themeNames } from './themes';

export type Color = string;
export type FontSize = string;
export type FontWeight = string;
export type FontFamily = string;
export type LineHeight = string;
export type LetterSpacing = string;
export type BoxShadow = string;
export type CSSUrl = string;

interface FontSettings {
  fontFamily?: FontFamily;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  color?: Color;
}

interface InputStyles {
  placeholder?: {
    text: FontSettings;
  };
  background: Color;
  text: FontSettings;
  icon?: CSSUrl;
}

interface ButtonStyles {
  background: Color;
  text: FontSettings;
}

interface TypographySettings {
  base: Required<FontSettings>;
  title: FontSettings;
}

export interface Theme {
  foreground: Color;
  background: Color;
  input: InputStyles;
  button: ButtonStyles & { disabled?: ButtonStyles };
  spacer: number;
  typography: TypographySettings;
  containerShadow: BoxShadow;
}

export type ThemeName = typeof themeNames[number];
