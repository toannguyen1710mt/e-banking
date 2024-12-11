'use client';

import { cn } from '@nextui-org/theme';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

const sizes: { [key in TEXT_SIZE]: string } = {
  [TEXT_SIZE['4XL']]: 'text-4xl font-semibold',
  [TEXT_SIZE['3XLS']]: 'text-3xls font-medium',
  [TEXT_SIZE['2XL']]: 'text-2xl font-extralight',
  [TEXT_SIZE.LG]: 'text-lg font-medium',
  [TEXT_SIZE.BASE]: 'text-base font-medium',
  [TEXT_SIZE.SM]: 'text-sm font-medium',
  [TEXT_SIZE.XS]: 'text-xs font-medium',
  [TEXT_SIZE['2XS']]: 'text-xxs font-light',
};

const variants: { [key in TEXT_VARIANT]: string } = {
  [TEXT_VARIANT.DEFAULT]: 'text-foreground-100',
  [TEXT_VARIANT.PRIMARY]: 'text-primary-200',
  [TEXT_VARIANT.SECONDARY]: 'text-secondary-100',
  [TEXT_VARIANT.TERTIARY]: 'text-foreground-200',
  [TEXT_VARIANT.INFO]: 'text-foreground-300',
  [TEXT_VARIANT.DANGER]: 'text-danger-100',
  [TEXT_VARIANT.SUCCESS]: 'text-success',
  [TEXT_VARIANT.WARNING]: 'text-warning',
};

export interface TextProps {
  size?: TEXT_SIZE;
  variant?: TEXT_VARIANT;
  as?: keyof React.ReactHTML;
  className?: string;
}

export const Text = ({
  children,
  size = TEXT_SIZE.BASE,
  as: Component = 'p',
  variant = TEXT_VARIANT.PRIMARY,
  className,
  ...props
}: React.PropsWithChildren<TextProps>) => {
  return (
    <Component
      className={`${variants[variant]} ${cn(sizes[size], className)}`}
      {...props}
    >
      {children}
    </Component>
  );
};
