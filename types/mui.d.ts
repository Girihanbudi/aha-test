// Module augmentation for MUI

import { Palette, PaletteOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    mode: string
    palette: Palette
    mainColor: {
      main: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      secondary: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      primary: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      strong: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      danger: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      warning: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      success: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      disabled: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
      dissapear: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        A100: string
        A200: string
        A400: string
        A700: string
        contrastDefaultColor: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    mode?: string
    palette?: PaletteOptions | undefined
    mainColor?: {
      main?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      secondary?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      primary?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      strong?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      danger?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      warning?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      success?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      disabled?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
      dissapear?: {
        50?: string
        100?: string
        200?: string
        300?: string
        400?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A400?: string
        A700?: string
        contrastDefaultColor?: string
      }
    }
  }
}
