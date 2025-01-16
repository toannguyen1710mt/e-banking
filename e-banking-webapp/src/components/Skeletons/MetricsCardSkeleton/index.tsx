// Libs
import { Card, Skeleton } from '@nextui-org/react';

export const MetricsCardSkeleton = () => (
  <Card className='min-w-[180px] cursor-pointer gap-4 p-4 sm:basis-1/2'>
    <Skeleton className='h-7 w-32 rounded-lg' />
    <div className='flex items-center justify-between gap-4'>
      <Skeleton className='h-16 w-16 rounded-lg' />
      <Skeleton className='h-7 w-20 rounded-lg' />
    </div>
  </Card>
);
