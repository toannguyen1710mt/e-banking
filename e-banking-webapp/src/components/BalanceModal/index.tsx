'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@nextui-org/react';
import { Session } from 'next-auth';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Interfaces
import { IAccount, ICard, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Services
import { getAccountsByUserId, getListCardByAccountId } from '@/services';

// Mocks
import { MOCK_SERIES_EXPENSE_ANALYSIS } from '@/mocks';

// Components
import { Modal, Text } from '../common';
import { MyCards } from '../MyCards';
import { ExpenseAnalysis } from '../ExpenseAnalysis';

interface BalanceModalProps {
  session: Session;
  isOpen?: boolean;
  totalInvestment?: string;
  totalIncome?: string;
  onClose: () => void;
}

const BalanceModal = ({
  session,
  totalInvestment = '170,000',
  totalIncome = '670,000',
  isOpen = false,
  onClose,
}: BalanceModalProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [cardData, setCardData] = useState<ICard>({} as ICard);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(
    {} as IAccount,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAccountsByUserId(session.user.id);

        if (result?.length) {
          setAccounts(result);
          setSelectedAccount(result[0]);
          const documentId = result[0]?.documentId;

          if (documentId) {
            const { cards } = await getListCardByAccountId(
              documentId as string,
            );

            setCardData(cards[0] || {});
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session?.user?.accounts, session?.user?.id]);

  const handleCardSelect = useCallback((account: IAccount) => {
    setSelectedAccount(account);
  }, []);

  const totalBalance = useMemo(
    () => accounts?.reduce((total, account) => total + account.balance, 0),
    [accounts],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement='center'
      classNames={{
        base: 'max-w-xs lg:max-w-4xl p-0 rounded-xl',
        closeButton: 'z-50',
      }}
    >
      <div className='absolute left-4 top-4'>
        <Text as='h4' className='text-base font-medium text-primary-200'>
          Good Evening,{' '}
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            className='font-normal'
          >
            {session?.user?.username || ''}
          </Text>
        </Text>
      </div>
      <div className='flex flex-col rounded-xl bg-lightGraySolid lg:flex-row'>
        <div className='flex flex-1 flex-col rounded-xl bg-white pb-[48px] pl-3 pr-[23px] pt-[56px]'>
          <div className='flex flex-col items-start justify-between gap-2 md:flex-row'>
            <div className='flex flex-col gap-2'>
              <Text
                as='h5'
                className='text-sm font-semibold'
                variant={TEXT_VARIANT.DEFAULT}
              >
                Current Balance
              </Text>
              <Text
                as='span'
                className='font-extrabold'
                variant={TEXT_VARIANT.DEFAULT}
              >
                ${formatNumberWithCommas(selectedAccount?.balance || 0)}
                <Text
                  as='span'
                  size={TEXT_SIZE['XS']}
                  variant={TEXT_VARIANT.DEFAULT}
                  className='font-semibold opacity-50'
                >
                  /${totalIncome}
                </Text>
              </Text>
            </div>
            <div className='flex flex-col gap-2'>
              <Text
                as='h5'
                className='text-sm font-semibold'
                variant={TEXT_VARIANT.DEFAULT}
              >
                Total Investments
              </Text>
              <Text
                as='span'
                className='font-extrabold'
                variant={TEXT_VARIANT.DEFAULT}
              >
                ${totalInvestment}
              </Text>
            </div>
          </div>

          <div className='relative mx-auto mt-9 flex h-[100px] w-[100px] items-center justify-center'>
            <CircularProgress
              classNames={{
                svg: 'w-full h-full drop-shadow-md',
                indicator: 'stroke-[#2A9D8F]',
                track: 'stroke-[#2A9D8F]/10',
                value: 'text-medium font-extrabold text-black',
              }}
              showValueLabel={false}
              strokeWidth={3}
              value={70}
            />
            <div className='absolute flex flex-col items-center'>
              <Text
                className='text-center text-sm font-medium'
                variant={TEXT_VARIANT.DEFAULT}
              >
                Spend
              </Text>
              <Text
                as='span'
                className='text-center font-extrabold'
                variant={TEXT_VARIANT.DEFAULT}
              >
                70%
              </Text>
            </div>
          </div>
        </div>

        {/* My Cards and Expense Analysis */}
        <div className='flex flex-1 flex-col py-8 pl-4 pr-3'>
          <Text as='h4' variant={TEXT_VARIANT.DEFAULT}>
            My Cards
          </Text>
          <div className='my-4'>
            <MyCards
              expireDate={cardData?.expireAt}
              accounts={accounts as IAccount[]}
              onCardSelect={handleCardSelect}
            />
          </div>
          <Text
            size={TEXT_SIZE['XS']}
            variant={TEXT_VARIANT.DEFAULT}
            className='max-w-[180px] font-normal'
          >
            You have a total of{' '}
            <Text
              as='span'
              size={TEXT_SIZE['XS']}
              variant={TEXT_VARIANT.DEFAULT}
              className='font-bold'
            >
              ${formatNumberWithCommas(totalBalance || 0)}
            </Text>{' '}
            available in your wallet
          </Text>

          <div className='mt-2.5'>
            <ExpenseAnalysis
              options={createExpenseAnalysisOptions(
                formatNumberWithCommas(totalBalance || 0),
              )}
              series={MOCK_SERIES_EXPENSE_ANALYSIS}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BalanceModal;
