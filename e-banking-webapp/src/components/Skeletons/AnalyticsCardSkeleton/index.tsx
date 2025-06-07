import { Card, Skeleton } from '@nextui-org/react';

export const AnalyticsCardSkeleton = () => (
  <Card className='h-full w-full min-w-[300px] space-y-5 p-4' radius='sm'>
    <div className='flex flex-col gap-4'>
      <Skeleton className='w-3/5 rounded-lg'>
        <div className='h-6 w-2/5 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='w-4/5 rounded-lg'>
        <div className='h-8 w-4/5 rounded-lg bg-default-200' />
      </Skeleton>
      <Skeleton className='w-1/5 rounded-lg'>
        <div className='h-5 w-1/5 rounded-lg bg-default-200' />
      </Skeleton>
    </div>
  </Card>
);
