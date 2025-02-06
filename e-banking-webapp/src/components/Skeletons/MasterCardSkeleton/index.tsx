// Libs
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@nextui-org/react';

export const MasterCardSkeleton = () => (
  <Card className='w-full min-w-[100px] px-4 pb-5 pt-[14px] md:min-w-[294px]'>
    <CardHeader className='p-0'>
      <Skeleton className='h-5 w-44 rounded-lg' />
    </CardHeader>
    <CardBody className='gap-2 px-0 pb-0 pt-3'>
      <Skeleton className='h-4 w-24 rounded-lg' />
      <div className='flex gap-6 text-[10px] font-normal text-white'>
        {Array.from({ length: 2 }, (_, index) => (
          <Skeleton className='h-3 w-14 rounded-lg' key={index} />
        ))}
      </div>
    </CardBody>
    <CardFooter className='flex-col items-start px-0 pb-0 pt-4'>
      <Skeleton className='h-4 w-20 rounded-lg' />
      <div className='md:max-0 mx-auto mt-2 flex max-w-[220px] flex-row items-center gap-9 md:max-w-full'>
        <Skeleton className='h-24 w-24 rounded-full' />
        <div className='flex flex-col gap-3'>
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton className='h-3 w-14 rounded-lg' key={index} />
          ))}
        </div>
      </div>
    </CardFooter>
  </Card>
);
