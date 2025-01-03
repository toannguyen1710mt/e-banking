'use client';

// Libs
import { Card, CardBody, useDisclosure } from '@nextui-org/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Component
import {
  Button,
  Text,
  CreditCard,
  MasterCard,
  AddCreditCardModal,
} from '@/components';
import { Session } from 'next-auth';

interface ICardOverviewProps {
  session: Session;
}

export const CardOverview = ({ session }: ICardOverviewProps) => {
  const {
    isOpen: isOpenAddCardModal,
    onOpen: onOpenAddCardModal,
    onClose: onCloseAddCardModal,
  } = useDisclosure();

  return (
    <>
      <Card className='w-full'>
        <CardBody className='flex flex-row justify-between gap-[58px] p-0'>
          <div className='flex w-full flex-col gap-[14px] pl-4 pt-2'>
            <div className='flex items-center justify-between'>
              <Text as='span' className='text-sm font-semibold text-navyBlue'>
                My Cards
              </Text>
              <Button
                variant='outline'
                color='outline'
                radius='xs'
                className='h-auto w-auto border-navyBlue px-2 py-1 text-[10px] font-medium text-navyBlue'
                onClick={onOpenAddCardModal}
              >
                Add Card
              </Button>
            </div>
            <CreditCard
              cardNumber='537544114540'
              expireDate='06/24'
              holderName='DONALD FLINCH CORTEZ'
              bankName='Universal Bank'
            />
          </div>
          <MasterCard
            series={MASTERCARD_CHART_MOCK}
            totalBalance={createExpenseAnalysisOptions('$540,000')}
          />
        </CardBody>
      </Card>

      {isOpenAddCardModal && (
        <AddCreditCardModal
          session={session}
          isOpen={isOpenAddCardModal}
          onClose={onCloseAddCardModal}
        />
      )}
    </>
  );
};
