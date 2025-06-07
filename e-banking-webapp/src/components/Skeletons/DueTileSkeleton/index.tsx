// Libs
import { Skeleton } from '@nextui-org/react';

export const DueTileSkeleton = () => (
  <div className='flex gap-3'>
    <Skeleton className='h-9 w-9 rounded-lg' />
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-4 w-40 rounded-lg' />
      <Skeleton className='h-3 w-14 rounded-lg' />
    </div>
  </div>
);
