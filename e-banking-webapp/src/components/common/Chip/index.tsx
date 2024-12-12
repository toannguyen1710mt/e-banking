'use client';

// Libs
import { ReactNode } from 'react';
import { Chip as ChipBase, cn } from '@nextui-org/react';

type FontWeightType = 'font-extrabold' | 'font-normal';
type BGColorType = 'bg-lightAqua' | 'bg-lightGreen' | 'bg-lightRed';
type TextColorType = 'text-primary-200' | 'text-green' | 'text-red';
type FontSizeType =
  | 'text-4xs'
  | 'text-3xs'
  | 'text-2xs'
  | 'text-xs'
  | 'text-sm';

interface ChipProps {
  startContent?: ReactNode;
  text: string;
  bgColor?: BGColorType;
  fontColor?: TextColorType;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  customClass?: string;
}

export const Chip = ({
  startContent,
  text,
  bgColor = 'bg-lightAqua',
  fontColor = 'text-primary-200',
  fontWeight = 'font-extrabold',
  fontSize = 'text-4xs',
  customClass,
}: ChipProps) => {
  const customClasses = cn(
    bgColor,
    fontColor,
    'py-[3px] px-[6px] gap-[1px]',
    customClass,
  );

  const contentClasses = cn(fontWeight, fontSize, 'p-0 leading-[12px]');

  return (
    <ChipBase
      startContent={startContent || null}
      classNames={{
        base: customClasses,
        content: contentClasses,
      }}
    >
      {text}
    </ChipBase>
  );
};
