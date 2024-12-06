'use client';

import { ReactNode } from 'react';
import { Radio as RadioNextUI, RadioProps } from '@nextui-org/react';

interface RadioButtonProps extends RadioProps {
  children: ReactNode;
}

export const RadioButton = ({ children, ...props }: RadioButtonProps) => (
  <RadioNextUI
    {...props}
    classNames={{
      base: 'gap-[13px] m-0',
      wrapper:
        'group-data-[selected=true]:border-primary-200 w-[14px] h-[14px]',
      label: 'text-2xs text-black',
      control: 'bg-primary-200 w-[7px] h-[7px]',
    }}
  >
    {children}
  </RadioNextUI>
);
