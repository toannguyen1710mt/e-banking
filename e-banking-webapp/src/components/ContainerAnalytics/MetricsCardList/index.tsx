import { MetricsCard } from '@/components';
import { METRICS_CARD } from '@/mocks';

export const MetricsCardList = () => (
  // TODO: call API to get totalTransfers data
  <div className='flex flex-col gap-[10px]'>
    {METRICS_CARD.map(
      ({ title, totalTransfers, isPositive, percentageChange }, index) => (
        <MetricsCard
          key={index}
          title={title}
          totalTransfers={totalTransfers}
          isPositive={isPositive}
          percentageChange={percentageChange}
        />
      ),
    )}
  </div>
);
