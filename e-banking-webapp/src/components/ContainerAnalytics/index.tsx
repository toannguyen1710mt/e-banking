import { CardOverview } from '../CardOverview';
import { Text } from '../common';
import { MyCalender } from '../MyCalender';
import { BalanceCardList } from './BalanceCardList';
import { MetricsCardList } from './MetricsCardList';
import { ServiceCardList } from './ServiceCardList';

export const ContainerAnalytics = () => (
  <section className='mx-auto flex h-full w-full max-w-[1440px] gap-[34px] px-6 py-4'>
    <div className='w-[75%]'>
      <Text as='h2' className='text-2xl font-semibold !text-black'>
        Good Evening,
        <Text as='span' className='font-medium !text-black'>
          Pheroxios
        </Text>
      </Text>
      <div className='mt-6 flex flex-col gap-6'>
        <BalanceCardList />
        <div className='flex gap-7'>
          <MetricsCardList />
          <CardOverview />
        </div>
        <div className='flex flex-col gap-8'>
          <Text as='span'>My Services</Text>
          <ServiceCardList />
        </div>
      </div>
    </div>
    <div className='w-[25%]'>
      <MyCalender />
    </div>
  </section>
);
