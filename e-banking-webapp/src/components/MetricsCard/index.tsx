'use client';

import { Card } from '@nextui-org/react';

// Interfaces
import { TEXT_VARIANT } from '@/interfaces';

// Components
import { Text, ArrowUpIcon, Chip } from '@/components';

interface IMetricsCardProps {
  title: string;
  totalTransfers: number;
  isPositive: boolean;
  percentageChange: number;
  isSelected: boolean;
}

export const MetricsCard = ({
  title,
  totalTransfers,
  isPositive,
  percentageChange,
  isSelected,
}: IMetricsCardProps) => {
  const chipBgColor = isSelected
    ? 'bg-background-500/10'
    : isPositive
      ? 'bg-primary-200 bg-opacity-10'
      : 'bg-background-600';

  const chipTextColor = isSelected
    ? 'text-white'
    : isPositive
      ? 'text-primary-200'
      : 'text-red';

  const cardBgColor = isSelected ? 'bg-[#264653]' : 'bg-white';

  const textColor = isSelected ? 'text-white' : 'text-primary-200';

  return (
    <Card className={`min-w-[180px] cursor-pointer p-4 ${cardBgColor}`}>
      <Text
        className={`font-semibold ${textColor}`}
        variant={TEXT_VARIANT.DEFAULT}
      >
        {title}
      </Text>
      <div className='flex items-center justify-between gap-4'>
        <Text className={`text-[52px] font-bold ${textColor}`} as='span'>
          {totalTransfers}
        </Text>

        <Chip
          startContent={
            <div className={`${chipTextColor}`}>
              <ArrowUpIcon customClass='w-[25px] h-4' />
            </div>
          }
          radius='sm'
          classNames={{
            base: `${chipBgColor}`,
            content: `font-extrabold text-xs p-0 ${chipTextColor}`,
          }}
        >
          {percentageChange}%
        </Chip>
      </div>
    </Card>
  );
};
