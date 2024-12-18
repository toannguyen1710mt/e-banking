'use client';

// Libs
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Components
import { ArrowDownIcon, ArrowUpIcon } from '@/components/icons';

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
  const chipBgColor = isPositive ? 'bg-lightGreen' : 'bg-lightRed';
  const chipTextColor = isPositive ? 'text-green' : 'text-red';

  return (
    <Card key={title} className='w-full min-w-[192px] pl-4 pt-[22px]'>
      <CardHeader className='p-0 text-xs font-medium'>{title}</CardHeader>
      <CardBody className='flex flex-row items-center gap-5 p-0 pt-[21px] font-extrabold'>
        <span className='text-base'>${formatNumberWithCommas(amount)}</span>
        <Chip
          startContent={ArrowComponent}
          classNames={{
            base: `${chipBgColor} ${chipTextColor} py-1 px-[6px] gap-1`,
            content: 'font-extrabold text-[7px] p-0',
          }}
        >
          {percentageChange}%
        </Chip>
      </CardBody>
      <CardFooter className='p-0 pb-[19px] pt-5 text-[10px] font-light text-transparentBlack'>
        {subtitle}
      </CardFooter>
    </Card>
  );
};
