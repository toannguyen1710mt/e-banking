'use client';

import { cn } from '@nextui-org/react';

interface StepProgressProps {
  steps: number;
  activeStep: number;
  onPrevStep: () => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  activeStep,
  onPrevStep,
}) => (
  <div className='flex w-full items-center justify-center gap-2'>
    {Array.from({ length: steps }).map((_, index) => {
      const handleClick = (e: React.FormEvent) => {
        e.preventDefault();

        if (index < activeStep && activeStep !== steps - 1) {
          onPrevStep();
        }
      };

      return (
        <div
          aria-labelledby='Step Progress'
          aria-label='Step Progress'
          key={index}
          role='button'
          className={cn(
            'h-2 w-full max-w-[92px] rounded-full bg-secondary-300 transition-all',
            { 'opacity-10': index !== activeStep },
          )}
          onClick={handleClick}
        />
      );
    })}
  </div>
);
