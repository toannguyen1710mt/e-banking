'use client';

import { useState } from 'react';
import { cn } from '@nextui-org/react';

// Constants
import { SLIDESHOW_DATA } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { ArrowRightIcon } from '../icons';
import { Button, Text } from '../common';

interface SlideshowProps {
  onGetStarted: () => void;
}

export const Slideshow = ({ onGetStarted }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === SLIDESHOW_DATA.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* Slides */}
      <div
        className={cn(
          'relative flex h-full transition-transform duration-500',
          {
            'translate-x-0': currentIndex === 0,
            'translate-x-100': currentIndex === 1,
            'translate-x-200': currentIndex === 2,
          },
        )}
      >
        {SLIDESHOW_DATA.map((item) => {
          const { id, image, title, description } = item;

          return (
            <div
              key={id}
              className='relative w-full flex-shrink-0 px-6 py-8 text-left'
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                {image}
              </div>
              <div className='absolute bottom-[113px] left-0 lg:bottom-10'>
                <Text
                  as='h2'
                  size={TEXT_SIZE['3XLS']}
                  variant={TEXT_VARIANT.TERTIARY}
                  className='mb-2'
                >
                  {title}
                </Text>
                <div className='flex items-start gap-6'>
                  <Button
                    onClick={handleNext}
                    size='default'
                    className='m-0 w-0 min-w-5 border-none bg-transparent p-0'
                  >
                    <ArrowRightIcon customClass='w-[20px] h-[22px]' />
                  </Button>
                  <Text size={TEXT_SIZE['LG']} variant={TEXT_VARIANT.TERTIARY}>
                    {description}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className='absolute bottom-0 flex w-full items-center justify-between'>
        <div className='flex justify-center space-x-2'>
          {SLIDESHOW_DATA.map((_, index) => {
            const getDotClassName =
              currentIndex === index
                ? 'w-9 bg-secondary-300'
                : 'w-3 bg-gray-300';

            return (
              <div
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${getDotClassName}`}
              />
            );
          })}
        </div>
        <Button
          onClick={onGetStarted}
          variant='outline'
          color='outline'
          className='h-[34px] w-[120px] min-w-[120px] rounded-[24px] border-[0.5px] border-white p-0 font-medium text-white lg:hidden'
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
