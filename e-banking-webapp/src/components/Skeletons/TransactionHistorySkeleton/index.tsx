import { Card, Skeleton } from '@nextui-org/react';
import { SkeletonTable } from '../SkeletonTable';
import { TRANSACTION_TABLE_COLUMNS } from '@/constants';

export const TransactionHistorySkeleton = () => (
  <Card className='h-full w-full min-w-[300px] space-y-5 p-4' radius='sm'>
    <div className='flex flex-col gap-1'>
      <Skeleton className='w-2/5 rounded-lg'>
        <div className='h-4 w-2/5 rounded-lg bg-default-300' />
      </Skeleton>
      <Skeleton className='w-2/5 rounded-lg'>
        <div className='h-4 w-2/5 rounded-lg bg-default-200' />
      </Skeleton>
    </div>
    <SkeletonTable columns={TRANSACTION_TABLE_COLUMNS} />
  </Card>
);
