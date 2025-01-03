import { Session } from 'next-auth';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { InformationCard, Text, TransactionHistory } from '@/components';
import { ActionCenter } from './ActionCenter';

// Services
import {
  getTotalTransferReceived,
  getTotalTransferSent,
  getTransactionsByUserId,
} from '@/services';

interface IContainerTransactionsProps {
  session: Session;
}

export const ContainerTransactions = async ({
  session,
}: IContainerTransactionsProps) => {
  const totalTransferSent = await getTotalTransferSent(session.user.id);
  const totalTransferReceived = await getTotalTransferReceived(session.user.id);

  const transactionHistory = await getTransactionsByUserId(session.user.id, {
    sort: 'createdAt',
    order: 'desc',
    pagination: {
      pageSize: 6,
    },
  });

  return (
    <div className='flex w-full gap-8'>
      <div className='flex w-2/3 flex-col'>
        <Text
          as='h4'
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE['2XL']}
          className='mb-[18px] font-medium'
        >
          Welcome Back,&nbsp;
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            size={TEXT_SIZE['2XL']}
            className='font-normal'
          >
            {session?.user?.username || ''}
          </Text>
        </Text>

        <div className='mb-[23px] max-w-[659px]'>
          <InformationCard session={session} />
        </div>

        <TransactionHistory
          totalTransaction={transactionHistory?.meta?.pagination?.total || 0}
          transactionHistory={transactionHistory?.data || []}
        />
      </div>

      <div className='w-1/3'>
        <ActionCenter
          session={session}
          totalTransferSent={totalTransferSent}
          totalTransferReceived={totalTransferReceived}
        />
      </div>
    </div>
  );
};
