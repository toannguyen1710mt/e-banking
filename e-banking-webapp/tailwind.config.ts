import { nextui } from '@nextui-org/react';

// Themes
import { colors, fontFamily, fontSize } from './src/themes';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamily,
      fontSize,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: {
              100: colors.overlay,
              200: colors.lightGray,
              300: colors.navyBlue,
              400: colors.black,
              500: colors.white,
              600: colors.pinPin,
              700: colors.dimGray,
            },
            primary: {
              100: colors.pastelGreen,
              200: colors.navyBlue,
            },
            foreground: {
              100: colors.black,
              200: colors.white,
              300: colors.neutralGray,
            },
            secondary: {
              100: colors.transparentBlack,
              200: colors.green,
            },
            success: colors.forestGreen,
            warning: colors.red,
            danger: {
              100: colors.error,
            },
          },
        },
        dark: {
          colors: {
            background: {},
            primary: {},
            foreground: {},
            secondary: {},
          },
        },
      },
    }),
  ],
};
