'use client';

import { extendVariants, Input as InputNextUI } from '@nextui-org/react';

export const Input = extendVariants(InputNextUI, {
  variants: {
    color: {
      default: {
        inputWrapper: ['!bg-inherit'],
        input: ['!text-foreground-100', 'placeholder:text-foreground-100'],
        errorMessage: 'text-warning',
        label: '!text-primary-200 text-sm font-medium',
      },
    },

    border: {
      default: {
        inputWrapper: [
          'border',
          'border-primary-200',
          'group-data-[focus=true]:border-primary-200',
          'data-[hover=true]:border-secondary-200',
          'data-[hover=true]:!bg-inherit',
        ],
      },
    },

    radius: {
      xs: {
        inputWrapper: 'rounded-md',
      },
    },

    textSize: {
      base: {
        input: 'text-sm',
      },
    },
    size: {
      xs: {
        input: 'w-full h-10 py-2.5 mx-2',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    border: 'default',
    textSize: 'base',
    radius: 'xs',
    size: 'xs',
  },
});
