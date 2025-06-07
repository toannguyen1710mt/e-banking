// Libs
import { Card, Skeleton } from '@nextui-org/react';

export const CreditCardSkeleton = () => (
  <Card className='w-[290px] space-y-5 p-4' radius='sm'>
    <Skeleton className='rounded-lg'>
      <div className='h-4 rounded-lg bg-default-300' />
    </Skeleton>
    <div className='flex flex-col gap-2'>
      <Skeleton className='w-4/5 rounded-lg'>
        <div className='h-3 w-4/5 rounded-lg bg-default-300' />
      </Skeleton>
      <div className='flex w-full items-center gap-3'>
        <div className='flex w-full flex-col gap-2'>
          <Skeleton className='h-3 w-3/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
        </div>
        <div>
          <Skeleton className='flex h-12 w-12 rounded-full' />
        </div>
      </div>
    </div>
  </Card>
);
