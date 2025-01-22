'use client';

import { useEffect, useState } from 'react';
import { AuthError, Session } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { IAccount, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Services
import { getAccountsByUserId, getTransactionsByUserId } from '@/services';

// Utils
import { getGreeting } from '@/utils';

// Components
import { CardOverview } from '../CardOverview';
import { Text } from '../common';
import { TasksWithCalendar } from '../TasksWithCalendar';
import { BalanceCardList } from './BalanceCardList';
import { MetricsCardList } from './MetricsCardList';
import { ServiceCardList } from './ServiceCardList';

interface IContainerAnalyticsProps {
  session: Session;
}

export const ContainerAnalytics = ({ session }: IContainerAnalyticsProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [totalTransfer, setTotalTransfer] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          meta: {
            pagination: { total },
          },
        } = await getTransactionsByUserId(session.user.id);
        const result = await getAccountsByUserId(session.user.id);

        setTotalTransfer(total);
        setAccounts(result);
      } catch (error) {
        if (error instanceof AuthError) {
          throw ERROR_MESSAGES.GET_ERROR;
        }
      }
    };

    fetchData();
  }, [session?.user?.accounts, session?.user?.id]);

  return (
    <section className='mx-auto flex h-full w-full flex-col gap-6 lg:flex-row'>
      <div className='lg:w-3/4'>
        <Text
          as='h2'
          className='text-2xl font-semibold leading-[29px] !text-black'
        >
          {getGreeting()},
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            size={TEXT_SIZE['2XL']}
            className='ml-1 font-medium leading-[29px]'
          >
            {session?.user?.username || ''}
          </Text>
        </Text>
        <div className='mt-6 flex flex-col gap-6'>
          <BalanceCardList accounts={accounts} />
          <div className='grid grid-cols-1 gap-y-6 xl:grid-cols-4 xl:gap-x-6'>
            <MetricsCardList totalTransfer={totalTransfer} />
            <CardOverview session={session} />
          </div>
          <div className='flex flex-col gap-6'>
            <Text as='span'>My Services</Text>
            <ServiceCardList />
          </div>
        </div>
      </div>
      <div className='lg:w-1/4'>
        <TasksWithCalendar />
      </div>
    </section>
  );
};
