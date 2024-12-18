'use client';

import { CircularProgress } from '@nextui-org/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Mocks
import { MOCK_SERIES_EXPENSE_ANALYSIS } from '@/mocks';

// Components
import { Modal, Text } from '../common';
import { MyCards } from '../MyCards';
import { ExpenseAnalysis } from '../ExpenseAnalysis';

interface BalanceModalProps {
  username?: string;
  currentBalance?: string;
  totalInvestment?: string;
  totalBalance?: string;
  totalIncome?: string;
  percent?: number;
  isOpen?: boolean;
  onClose: () => void;
}

const BalanceModal = ({
  username = '',
  currentBalance = '',
  totalInvestment = '',
  totalBalance = '',
  totalIncome = '',
  percent = 0,
  isOpen = false,
  onClose,
}: BalanceModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      placement='center'
      classNames={{ base: 'p-0 rounded-xl' }}
    >
      <div className='absolute left-4 top-4'>
        <Text as='h4' className='text-base font-medium text-primary-200'>
          Good Evening,{' '}
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            className='font-normal'
          >
            {username}
          </Text>
        </Text>
      </div>
      <div className='flex rounded-xl bg-lightGraySolid'>
        <div className='flex flex-1 flex-col rounded-xl bg-white pb-[48px] pl-3 pr-[23px] pt-[56px]'>
          <div className='flex items-center justify-between'>
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
                ${currentBalance}
                <Text
                  as='span'
                  size={TEXT_SIZE['XS']}
                  className='font-semibold text-black/50'
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

          <div className='relative mx-auto mt-9 flex h-[200px] w-[200px] items-center justify-center'>
            <CircularProgress
              classNames={{
                svg: 'w-[200px] h-[200px] drop-shadow-md',
                indicator: 'stroke-[#2A9D8F]',
                track: 'stroke-[#2A9D8F]/10',
                value: 'text-medium font-extrabold text-black',
              }}
              showValueLabel={false}
              strokeWidth={3}
              value={percent}
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
                {percent}%
              </Text>
            </div>
          </div>
        </div>

        {/* My Cards and Expense Analysis */}
        <div className='flex flex-1 flex-col pb-[28px] pl-4 pr-3 pt-[56px]'>
          <Text as='h4' variant={TEXT_VARIANT.DEFAULT}>
            My Cards
          </Text>
          <div className='my-4'>
            <MyCards />
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
              ${totalBalance}
            </Text>{' '}
            available in your wallet
          </Text>

          <div className='mt-2.5'>
            <ExpenseAnalysis
              options={createExpenseAnalysisOptions('220 000')}
              series={MOCK_SERIES_EXPENSE_ANALYSIS}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BalanceModal;
