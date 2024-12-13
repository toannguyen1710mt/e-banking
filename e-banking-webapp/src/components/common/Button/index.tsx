'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      solid: 'border-transparent text-foreground-200',
      outline: 'border-[0.2px] border-background-300 font-semibold',
      bordered: 'border-[0.5px] border-secondary-100 font-semibold',
    },

    color: {
      default: 'bg-primary-100 text-foreground-200',
      primary: 'bg-background-300 text-foreground-200',
      secondary: 'bg-background-400 text-foreground-200',
      outline: 'bg-none',
      tertiary: 'bg-background-800 text-foreground-200',
      danger: 'bg-warning text-foreground-200',
      info: 'text-primary-200',
      overlay: 'bg-overlay',
      navyBlue: 'bg-navyBlue text-white',
    },

    isIconOnly: {
      true: 'bg-none',
      ariaLabel: 'Button Icon',
    },

    radius: {
      xs: 'rounded',
      xst: 'rounded-md',
      sm: 'rounded-2xl',
      md: 'rounded-3xl',
    },

    size: {
      default: 'h-6 px-0 py-[3px] text-2xs',
      xxs: 'w-[50px] min-w-[50px] h-[19px] px-0 py-[3px] font-medium !text-xxs',
      xs: 'w-[87px] h-5 py-1 px-2 text-2xs font-medium',
      sm: 'w-[77px] h-[33px] py-2 text-sm font-semibold',
      md: 'w-[69px] h-[35px] py-2.5 text-xs font-semibold',
      base: 'w-[168px] h-10 py-3 text-xs font-semibold',
      lg: 'w-full max-h-10 py-2.5 text-sm',
      xl: 'w-[271px] h-14 py-4 font-medium',
      xxl: 'px-[14px] py-[10px] text-xs font-semibold',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'lg',
    radius: 'md',
  },
});
