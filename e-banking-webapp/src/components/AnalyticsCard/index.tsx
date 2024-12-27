'use client';

// Libs
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Components
import { ArrowDownIcon, ArrowUpIcon, Chip, Text } from '@/components';

export interface IAnalyticsCardItem {
  title: string;
  subtitle: string;
  amount: number;
  percentageChange: number;
  isPositive?: boolean;
}

export const AnalyticsCard = ({
  title,
  subtitle,
  isPositive,
  amount,
  percentageChange,
}: IAnalyticsCardItem) => {
  const ArrowComponent = isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />;

  return (
    <Card key={title} className='w-full gap-4 rounded-md p-0'>
      <CardHeader className='p-4 text-xs font-medium'>
        <Text>{title}</Text>
      </CardHeader>
      <CardBody className='flex flex-row items-center gap-5 overflow-y-hidden p-4'>
        <Text as='span' className='text-[2em] font-extrabold'>
          ${formatNumberWithCommas(amount)}
        </Text>
        <Chip
          startContent={ArrowComponent}
          color={isPositive ? 'success' : 'danger'}
          classNames={{
            base: 'h-5',
            content: 'font-extrabold text-4xs p-0',
          }}
        >
          {percentageChange}%
        </Chip>
      </CardBody>
      <CardFooter className='rounded-none p-4'>
        <Text className='text-2xs font-light text-transparentBlack'>
          {subtitle}
        </Text>
      </CardFooter>
    </Card>
  );
};
