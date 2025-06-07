// Libs
import { Card, CardBody, Skeleton } from '@nextui-org/react';

// Components
import { CreditCardSkeleton, MasterCardSkeleton } from '@/components';

export const CardOverviewSkeleton = () => (
  <Card className='col-span-3'>
    <CardBody className='flex flex-col justify-between gap-6 p-0 sm:flex-row'>
      <div className='flex w-full flex-col gap-4 px-4 py-2'>
        <div className='flex max-w-[290px] items-center justify-between'>
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton className='h-5 w-16 rounded-lg' key={index} />
          ))}
        </div>
        <CreditCardSkeleton />
      </div>
      <MasterCardSkeleton />
    </CardBody>
  </Card>
);
