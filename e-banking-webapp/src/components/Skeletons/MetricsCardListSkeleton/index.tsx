// Components
import { MetricsCardSkeleton } from '@/components';

export const MetricsCardListSkeleton = () => (
  <div className='flex flex-col gap-6 sm:flex-row xl:flex-col xl:gap-3'>
    {Array.from({ length: 2 }, (_, index) => (
      <MetricsCardSkeleton key={index} />
    ))}
  </div>
);
