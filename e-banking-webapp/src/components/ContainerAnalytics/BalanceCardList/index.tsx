'use client';

import { BalanceCard } from '@/components/BalanceCard';
import { BALANCE_CARD } from '@/mocks';

export const BalanceCardList = () => {
  return (
    <div className='flex h-auto w-full justify-between gap-7'>
      {BALANCE_CARD.map(({ amount }, index) => (
        <BalanceCard key={index} amount={amount} />
      ))}
    </div>
  );
};
