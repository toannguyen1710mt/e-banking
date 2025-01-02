import { Session } from 'next-auth';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { InformationCard, Text, TransactionHistory } from '@/components';
import { ActionCenter } from './ActionCenter';
import { MOCK_TRANSACTIONS } from '@/mocks';

interface IContainerTransactionsProps {
  session: Session;
}

export const ContainerTransactions = ({
  session,
}: IContainerTransactionsProps) => (
  <div className='flex w-full gap-[38px] px-[34px]'>
    <div className='w-2/3 pt-[17px]'>
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
        totalTransaction={0}
        transactionHistory={MOCK_TRANSACTIONS}
      />
    </div>

    <div className='w-1/3 pt-6'>
      <ActionCenter />
    </div>
  </div>
);
