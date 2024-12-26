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
}

export const MetricsCard = ({
  title,
  totalTransfers,
  isPositive,
  percentageChange,
}: IMetricsCardProps) => {
  const chipBgColor = isPositive
    ? 'bg-primary-200 bg-opacity-10'
    : 'bg-background-600';

  const chipTextColor = isPositive ? 'text-primary-200' : 'text-red';

  return (
    <Card className='min-w-[180px] p-4'>
      <Text className='font-semibold' variant={TEXT_VARIANT.DEFAULT}>
        {title}
      </Text>
      <div className='flex items-center justify-between gap-4'>
        <Text className='text-[52px] font-bold text-primary-200' as='span'>
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
