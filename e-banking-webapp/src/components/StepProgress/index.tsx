import { cn } from '@nextui-org/react';

interface StepProgressProps {
  steps: number;
  activeStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <div className='absolute bottom-0 flex w-full items-center justify-between gap-2'>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-2 w-1/4 rounded-full bg-secondary-300 transition-all',
            { 'opacity-10': index !== activeStep },
          )}
        />
      ))}
    </div>
  );
};
