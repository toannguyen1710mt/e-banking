import { MetricsCard } from '@/components';

interface IMetricsCardListProps {
  totalTransfer?: number;
}

export const MetricsCardList = ({ totalTransfer }: IMetricsCardListProps) => {
  const METRICS_CARD = [
    {
      title: 'Transfer Request',
      totalTransfers: totalTransfer || 0,
      isPositive: true,
      percentageChange: 8,
    },
    {
      title: 'Invoices Overdue',
      totalTransfers: 5,
      isPositive: false,
      percentageChange: 8,
    },
  ];

  return (
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
};
