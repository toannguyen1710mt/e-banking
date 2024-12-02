import { nextui } from '@nextui-org/react';

// Themes
import { colors, fontFamily } from './src/themes';

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
              200: colors.gray.light,
              300: colors.blue.dark,
              400: colors.black,
              500: colors.white,
              600: colors.pinPin,
              700: colors.blue.light,
            },
            primary: {
              100: colors.green.dark,
              200: colors.blue.dark,
            },
            foreground: {
              100: colors.black,
              200: colors.white,
              300: colors.grey.dark,
            },
            secondary: {
              100: colors.gray.dark,
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
