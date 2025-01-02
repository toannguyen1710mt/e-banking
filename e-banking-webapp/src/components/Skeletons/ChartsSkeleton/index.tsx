import { Card, Skeleton } from '@nextui-org/react';

export const ChartsSkeleton = () => (
  <Card className='h-full min-h-[370px] w-full min-w-[457px] p-4' radius='sm'>
    <Skeleton className='rounded-lg'>
      <div className='h-4 rounded-lg bg-default-300' />
    </Skeleton>
  </Card>
);
