// Libs
import { Skeleton } from '@nextui-org/react';

// Components
import {
  BalanceCardListSkeleton,
  CardOverviewSkeleton,
  MetricsCardListSkeleton,
  MyCalenderSkeleton,
  ServiceCardListSkeleton,
} from '@/components';

export const AnalyticsPageSkeleton = () => (
  <section className='mx-auto flex h-full w-full flex-col gap-6 lg:flex-row'>
    <div className='lg:w-3/4'>
      <Skeleton className='h-7 w-72 rounded-lg' />
      <div className='mt-6 flex flex-col gap-6'>
        <BalanceCardListSkeleton />
        <div className='grid grid-cols-1 gap-y-6 xl:grid-cols-4 xl:gap-x-6'>
          <MetricsCardListSkeleton />
          <CardOverviewSkeleton />
        </div>
        <div className='flex flex-col gap-6'>
          <Skeleton className='h-5 w-24 rounded-lg' />
          <ServiceCardListSkeleton />
        </div>
      </div>
    </div>
    <div className='lg:w-1/4'>
      <MyCalenderSkeleton />
    </div>
  </section>
);
