'use client';

import { ReactNode } from 'react';
import { Radio as RadioNextUI, RadioProps } from '@nextui-org/react';

interface RadioButtonProps extends RadioProps {
  children: ReactNode;
}

export const RadioButton = ({ children, ...props }: RadioButtonProps) => (
  <RadioNextUI
    classNames={{
      base: 'gap-[5px] m-0 p-0 leading-[26px]',
      wrapper:
        'group-data-[selected=true]:border-primary-200 w-[14px] h-[14px]',
      label: 'text-xs text-black',
      control: 'bg-primary-200 w-[7px] h-[7px]',
    }}
    {...props}
  >
    {children}
  </RadioNextUI>
);
