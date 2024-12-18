// Mocks
import {
  ANALYTICS_DATA,
  MOCK_BALANCE_STATISTICS_CHART_DATA,
  MOCK_SPENDING_STATISTIC_CHART_DATA,
} from '@/mocks';

// Interfaces
import { TEXT_VARIANT } from '@/interfaces';

// Components
import { BalanceStatistics, SpendingStatistics } from '@/components/Charts';
import { AnalyticsCard, Button, MenuDropdown, Text } from '@/components/common';
import { ChevronDownIcon } from '@/components/icons';
import { TransactionTable } from '../TransactionTable';

export const MainContent = () => (
  <div className='space-y-4'>
    {/* Header */}
    <div className='flex items-center justify-between'>
      <Text variant={TEXT_VARIANT.DEFAULT} className='font-semibold'>
        My Wallet
      </Text>
      <MenuDropdown
        customTriggerElement={
          <Button
            endContent={<ChevronDownIcon />}
            variant='bordered'
            size='default'
            color='outline'
            radius='sm'
            className='w-[80px] cursor-not-allowed'
          >
            Monthly
          </Button>
        }
        options={[]}
      />
    </div>

    {/* Analytics Cards */}
    <div className='flex gap-4'>
      {ANALYTICS_DATA.map(
        ({ title, subtitle, isPositive, amount, percentageChange }, index) => (
          <AnalyticsCard
            key={index}
            title={title}
            subtitle={subtitle}
            isPositive={isPositive}
            amount={amount}
            percentageChange={percentageChange}
          />
        ),
      )}
    </div>

    {/* Charts */}
    <div className='flex gap-5'>
      <BalanceStatistics {...MOCK_BALANCE_STATISTICS_CHART_DATA} />
      <SpendingStatistics {...MOCK_SPENDING_STATISTIC_CHART_DATA} />
    </div>

    {/* Table */}
    <TransactionTable />
  </div>
);
