// Libs
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';

// Components
import { DueTileSkeleton } from '@/components/Skeletons/DueTileSkeleton';

export const MyCalenderSkeleton = () => (
  <Card className='h-full w-full gap-6 p-4 sm:flex-row lg:flex-col' radius='sm'>
    <CardHeader className='w-auto flex-col gap-6 p-0 sm:basis-1/2 lg:basis-0'>
      <Skeleton className='h-4 w-16 self-start rounded-lg' />
      <Skeleton className='h-56 w-full max-w-60 rounded-lg' />
    </CardHeader>
    <CardBody className='gap-5 p-0 sm:basis-1/2 lg:basis-0'>
      <Skeleton className='h-6 w-32 rounded-lg' />
      <div className='flex flex-col gap-4'>
        {Array.from({ length: 4 }, (_, index) => (
          <DueTileSkeleton key={index} />
        ))}
      </div>
    </CardBody>
  </Card>
);
