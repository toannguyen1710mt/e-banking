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

// Mocks
import { TARGET_LIST } from '@/mocks';

// Components
import { Button, Text, TargetTile } from '@/components';
import { ChevronRightIcon, PlusIcon } from '@/components/icons';

export const MyTarget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next target for footer
  const handleNextTarget = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TARGET_LIST.length);
  };

  const percentage = calculatePercentage(
    TARGET_LIST[currentIndex].deposit,
    TARGET_LIST[currentIndex].targetAmount,
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
      {TARGET_LIST.map((target, index) => (
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
              aria-label='current-target-title'
            >
              {TARGET_LIST[currentIndex].title}
            </Text>
            <button
              onClick={handleNextTarget}
              type='button'
              aria-label='chevron-right-button'
            >
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
