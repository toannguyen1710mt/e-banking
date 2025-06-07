// Libs
import { Card, Skeleton } from '@nextui-org/react';

// Constants
import { TRANSFER_RECEIVED_TABLE_COLUMNS } from '@/constants';

// Components
import { TableSkeleton } from '../TableSkeleton';

export const ActionCenterSkeleton = () => (
  <Card
    className='h-full w-full min-w-[300px] space-y-5 p-4 py-5 pl-5 pr-[38px]'
    radius='sm'
  >
    <Skeleton className='w-2/5 rounded-lg'>
      <div className='h-5 w-2/5 rounded-lg bg-default-200' />
    </Skeleton>
    <div className='mb-[23px] ml-[50px] flex justify-center gap-6'>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card
          key={index}
          className='h-[120px] w-[173px] gap-[17px] px-[13px] py-[17px]'
          radius='sm'
        >
          <Skeleton className='w-full rounded-lg'>
            <div className='h-3 w-full rounded-lg bg-default-200' />
          </Skeleton>
          <div className='flex justify-between gap-[15px]'>
            <Skeleton className='w-2/5 rounded-lg'>
              <div className='h-6 w-2/5 rounded-lg bg-default-200' />
            </Skeleton>
            <Skeleton className='w-2/5 rounded-lg'>
              <div className='h-6 w-2/5 rounded-lg bg-default-200' />
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
    <div className='mb-4 flex flex-col gap-2'>
      <Skeleton className='w-2/5 rounded-lg'>
        <div className='h-4 w-2/5 rounded-lg bg-default-200' />
      </Skeleton>
      <Skeleton className='w-3/5 rounded-lg'>
        <div className='h-3 w-3/5 rounded-lg bg-default-200' />
      </Skeleton>
    </div>
    <TableSkeleton columns={TRANSFER_RECEIVED_TABLE_COLUMNS} />
  </Card>
);
