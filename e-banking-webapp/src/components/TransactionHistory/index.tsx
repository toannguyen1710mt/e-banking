// Libs
import { Session } from 'next-auth';

// Components
import { TransactionTable } from '@/components';

// Services
import { getTransactionsByUserId } from '@/services';

interface ITransactionHistoryProps {
  currentPage: number;
  session: Session;
}

export const TransactionHistory = async ({
  currentPage,
  session,
}: ITransactionHistoryProps) => {
  // Get all transfers
  const {
    data: transactions,
    meta: {
      pagination: { pageCount, total },
    },
  } = await getTransactionsByUserId(session.user.id, {
    sort: 'createdAt',
    order: 'desc',
    pagination: {
      page: currentPage,
      pageSize: 10,
    },
  });

  return (
    <TransactionTable
      currentPage={currentPage}
      totalPage={pageCount}
      totalTransaction={total}
      transactions={transactions}
    />
  );
};
