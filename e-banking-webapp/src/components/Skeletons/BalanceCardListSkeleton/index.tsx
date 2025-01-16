// Components
import { BalanceCardSkeleton } from '@/components';

export const BalanceCardListSkeleton = () => (
  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
    {Array.from({ length: 4 }, (_, index) => (
      <BalanceCardSkeleton key={index} />
    ))}
  </div>
);
