'use client';

import { useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CircularProgress,
} from '@nextui-org/react';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Utils
import { calculatePercentage } from '@/utils';

// Components
import { Button, Text, TargetTile } from '@/components';
import {
  ChevronRightIcon,
  GiftIcon,
  PlaneIcon,
  PlusIcon,
} from '@/components/icons';

// TODO: get data for targets from API
const targetList = [
  {
    icon: GiftIcon,
    title: 'Self Reward',
    deposit: 45000,
    targetAmount: 100000,
    currencyUnit: '$',
  },
  {
    icon: PlaneIcon,
    title: 'Holiday',
    deposit: 30000,
    targetAmount: 200000,
    currencyUnit: '$',
  },
  {
    icon: GiftIcon,
    title: 'Christmas',
    deposit: 35000,
    targetAmount: 50000,
    currencyUnit: '$',
  },
];

export const MyTarget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next target for footer
  const handleNextTarget = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % targetList.length);
  };

  const percentage = calculatePercentage(
    targetList[currentIndex].deposit,
    targetList[currentIndex].targetAmount,
  );

  return (
    <Card className='rounded-md'>
      {/* Header */}
      <CardHeader className='flex justify-between px-[6px]'>
        <Text
          as='span'
          size={TEXT_SIZE.XS}
          variant={TEXT_VARIANT.DEFAULT}
          className='font-semibold'
        >
          My Targets
        </Text>
        <Button
          startContent={<PlusIcon />}
          radius='xs'
          size='xxs'
          className='min-w-0 text-3xs'
          isDisabled
        >
          New
        </Button>
      </CardHeader>

      {/* Target List */}
      {targetList.map((target, index) => (
        <TargetTile
          key={index}
          icon={target.icon}
          title={target.title}
          deposit={target.deposit}
          targetAmount={target.targetAmount}
        />
      ))}

      {/* Footer - Changes only when clicking chevron right icon */}
      <CardFooter>
        <div className='flex w-full flex-col gap-5'>
          <div className='flex justify-between text-secondary-300'>
            <Text
              as='span'
              size={TEXT_SIZE['2XS']}
              className='font-extrabold text-secondary-300'
            >
              {targetList[currentIndex].title}
            </Text>
            <button onClick={handleNextTarget}>
              <ChevronRightIcon />
            </button>
          </div>

          <div className='flex justify-center'>
            <CircularProgress
              classNames={{
                base: 'w-full flex items-center justify-center',
                svg: 'w-[200px] h-[200px] drop-shadow-md',
                indicator: 'stroke-[#2A9D8F]',
                track: 'stroke-[#2A9D8F]/10',
                value: 'text-medium font-extrabold text-black',
              }}
              showValueLabel={true}
              strokeWidth={3}
              value={percentage}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
