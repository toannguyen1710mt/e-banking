// Libs
import { Card, Skeleton } from '@nextui-org/react';

export const BalanceCardSkeleton = () => (
  <Card className='h-[155px] w-full pl-[14px] pr-4 pt-[13px]'>
    <div className='mb-10 flex justify-between text-primary-200'>
      {Array.from({ length: 2 }, (_, index) => (
        <Skeleton key={index} className='h-5 w-5 rounded-lg' />
      ))}
    </div>
    <div className='flex flex-col gap-3'>
      {Array.from({ length: 2 }, (_, index) => (
        <Skeleton
          key={`bottom-skeleton-${index}`}
          className={
            index === 0 ? 'h-7 w-32 rounded-lg' : 'h-4 w-28 rounded-lg'
          }
        />
      ))}
    </div>
  </Card>
);
