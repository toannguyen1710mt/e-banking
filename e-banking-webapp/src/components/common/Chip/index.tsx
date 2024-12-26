'use client';

// Libs
import { Chip as ChipNextUI, extendVariants } from '@nextui-org/react';

export const Chip = extendVariants(ChipNextUI, {
  variants: {
    size: {
      sm: {
        base: 'px-2 py-1',
      },
      md: {
        base: 'px-4 py-2',
      },
      lg: {
        base: 'px-6 py-3',
      },
    },
    color: {
      primary: {
        base: 'bg-primary/10 text-primary',
      },
      secondary: {
        base: 'bg-secondary/10 text-secondary',
      },
      success: {
        base: 'bg-success/10 text-success',
      },
      danger: {
        base: 'bg-warning/10 text-warning',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'primary',
  },
});
