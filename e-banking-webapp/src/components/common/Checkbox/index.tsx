'use client';

// Libs
import { extendVariants, Checkbox as NextUICheckbox } from '@nextui-org/react';

export const Checkbox = extendVariants(NextUICheckbox, {
  variants: {
    color: {
      primary: {
        wrapper: ['after:bg-primary-200 before:border-primary-200'],
        icon: 'text-foreground-200',
      },
    },
    size: {
      sm: {
        label: 'text-xs text-foreground-100',
        wrapper: ['w-3 h-3', 'before:border'],
      },
      md: {
        label: 'text-sm text-foreground-100',
        wrapper: ['w-4 h-4', 'before:border'],
      },
      lg: {
        label: 'text-base text-foreground-100',
        wrapper: ['w-5 h-5', 'before:border'],
      },
    },
    radius: {
      sm: {
        wrapper: ['rounded', 'before:rounded', 'after:rounded'],
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
  },
});
