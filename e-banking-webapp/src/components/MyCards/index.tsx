'use client';

import { useState } from 'react';
import { Card, cn } from '@nextui-org/react';

// Constants
import { MY_CARDS_ACCOUNTS } from '@/constants';

// Interfaces
import { TEXT_VARIANT } from '@/interfaces';

// Components
import { MastercardIcon } from '../icons';
import { Text } from '../common';

export const MyCards = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleOnClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    }
  };

  return (
    <div className='flex gap-[9px]'>
      {MY_CARDS_ACCOUNTS.map(({ title, expireDate, numberAccount }, index) => {
        const textOpacity =
          selectedIndex === index ? 'opacity-100' : 'opacity-50';
        const bgColorCard =
          selectedIndex === index ? 'bg-secondary-300' : 'bg-background-500';
        const textVariant =
          selectedIndex === index
            ? TEXT_VARIANT.TERTIARY
            : TEXT_VARIANT.DEFAULT;

        return (
          <div
            key={index}
            className='hover:cursor-pointer'
            onClick={() => handleOnClick(index)}
          >
            <Card
              className={cn(
                'flex h-[88px] w-full min-w-[111px] flex-col justify-between rounded-[6px] border-0 p-2',
                bgColorCard,
              )}
            >
              <div className='flex gap-3 p-0'>
                <div className='flex flex-1 items-center justify-between'>
                  <Text className='text-xs' variant={textVariant}>
                    {title}
                  </Text>
                  <MastercardIcon customClass='w-[25px] h-[15px]' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <Text
                  className={`text-2xs ${textOpacity}`}
                  variant={textVariant}
                >
                  .... {numberAccount.slice(-4)}
                </Text>
                <Text
                  className={`text-2xs ${textOpacity}`}
                  variant={textVariant}
                >
                  {expireDate}
                </Text>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
