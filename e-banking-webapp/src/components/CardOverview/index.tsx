'use client';

// Libs
import { Card, CardBody } from '@nextui-org/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Component
import { Button, Text, CreditCard, MasterCard } from '@/components';

export const CardOverview = () => {
  return (
    <Card>
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
              isDisabled
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
  );
};
