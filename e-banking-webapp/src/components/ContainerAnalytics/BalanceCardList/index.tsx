'use client';

// Interfaces
import { AccountType, IAccount } from '@/interfaces';

// Components
import { BalanceCard } from '@/components/BalanceCard';

interface IBalanceCardListProps {
  accounts?: IAccount[];
}
export const BalanceCardList = ({ accounts }: IBalanceCardListProps) => {
  const totalBalance = accounts?.reduce(
    (total, account) => total + account.balance,
    0,
  );

  const savingsAccount = accounts?.find(
    (account) => account.type === AccountType.SAVINGS,
  );

  const checkingAccount = accounts?.find(
    (account) => account.type === AccountType.CHECKING,
  );

  const BALANCE_CARD = [
    {
      amount: totalBalance || 0,
      title: 'Your total balance',
    },
    {
      amount: savingsAccount?.balance || 0,
      title: 'Your Savings balance',
    },
    {
      amount: checkingAccount?.balance || 0,
      title: 'Your Checkings balance',
    },
    {
      amount: 40000,
      title: 'Total Spend',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
      {BALANCE_CARD.map(({ amount, title }, index) => (
        <BalanceCard key={index} amount={amount} title={title} />
      ))}
    </div>
  );
};
