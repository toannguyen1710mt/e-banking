interface StepProgressProps {
  steps: number;
  activeStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  activeStep,
}) => (
  <div className='absolute bottom-0 flex w-full items-center justify-between gap-2'>
    {Array.from({ length: steps }).map((_, index) => (
      <div
        key={index}
        className={`h-2 w-1/4 rounded-full transition-all ${
          index === activeStep
            ? 'bg-secondary-300'
            : 'bg-secondary-300 opacity-10'
        }`}
      />
    ))}
  </div>
);
