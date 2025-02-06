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
  <Card className='w-full basis-1/2 gap-4 rounded-md px-2 py-3 shadow-none'>
    <CardHeader className='flex justify-between p-0 text-xs font-semibold'>
      <span className='text-xs lg:text-xl xl:text-xs'>Daily Limit</span>
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
    <CardBody className='overflow-hidden p-0 text-xs'>
      <div className='flex items-baseline'>
        <span className='text-xs font-bold lg:text-base xl:text-xs'>
          $ {expenses} Used
        </span>
        <span className='ml-2 text-3xs font-normal'>from $ {limit} limit</span>
      </div>
    </CardBody>
    <CardFooter className='p-0 pb-2'>
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
