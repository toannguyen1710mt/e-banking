import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';

export const ServiceCardSkeleton = () => (
  <Card className='w-full'>
    <CardHeader className='pb-0'>
      <Skeleton className='h-7 w-7 rounded-lg' />
    </CardHeader>
    <CardBody className='gap-3 pb-6 pt-5'>
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${index === 0 ? 'w-36' : 'w-24'} rounded-lg`}
        />
      ))}
    </CardBody>
  </Card>
);
