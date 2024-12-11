'use client';

// Libs
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Progress,
} from '@nextui-org/react';

// Components
import { ArrowUpIcon } from '@/components';

interface IDailyLimit {
  expenses: string;
  limit: string;
}

export const DailyLimit = ({ expenses, limit }: IDailyLimit) => (
  <Card className='w-full px-[6px] pt-[9px]'>
    <CardHeader className='flex justify-between p-0 text-xs font-semibold'>
      <span>Daily Limit</span>
      <Chip
        startContent={<ArrowUpIcon />}
        classNames={{
          base: `bg-lightAqua text-black py-1 px-[6px] gap-1`,
          content: 'font-extrabold text-[7px] p-0',
        }}
      >
        8%
      </Chip>
    </CardHeader>
    <CardBody className='p-0 pt-2 text-xs'>
      <div className='flex items-baseline'>
        <span className='font-bold'>$ {expenses} Used</span>
        <span className='ml-2 text-3xs font-normal'>from $ {limit} limit</span>
      </div>
    </CardBody>
    <CardFooter className='p-0 pb-4 pt-[9px]'>
      <Progress
        aria-label='Loading...'
        classNames={{
          track: 'bg-lightAqua',
          indicator: 'bg-java',
        }}
        value={40}
      />
    </CardFooter>
  </Card>
);
