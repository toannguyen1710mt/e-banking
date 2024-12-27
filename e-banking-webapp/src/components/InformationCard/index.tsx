'use client';

// Libs
import { Card, CardBody } from '@nextui-org/react';
import { useState } from 'react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks
import { CARD_CREDIT_DATA, MASTERCARD_CHART_MOCK } from '@/mocks';

// Component
import {
  Button,
  Text,
  CreditCard,
  MasterCard,
  ChevronRightIcon,
} from '@/components';

export const InformationCard = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex + 1) % CARD_CREDIT_DATA.length,
    );
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + CARD_CREDIT_DATA.length) % CARD_CREDIT_DATA.length,
    );
  };

  return (
    <>
      <Card className='w-full'>
        <CardBody className='flex flex-row justify-between gap-[58px] p-0'>
          <MasterCard
            series={MASTERCARD_CHART_MOCK}
            totalBalance={createExpenseAnalysisOptions('$540,000')}
          />
          <div className='flex w-full flex-col gap-[14px] pb-5 pr-[22px] pt-2'>
            <div className='flex flex-col gap-[11px]'>
              <div className='flex items-center justify-between'>
                <Text as='span' className='text-sm font-semibold text-navyBlue'>
                  My Cards
                </Text>
                <div className='flex gap-1'>
                  <Button
                    variant='outline'
                    color='outline'
                    className='w-5 min-w-0 border-none p-0'
                    onClick={handlePrevCard}
                  >
                    <ChevronRightIcon customClass='rotate-180' />
                  </Button>
                  <Button
                    variant='outline'
                    color='outline'
                    className='w-5 min-w-0 border-none p-0'
                    onClick={handleNextCard}
                  >
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>
              <Text as='span' className='text-sm font-normal text-navyBlue'>
                Master Card
              </Text>
            </div>

            {/* TODO: This part will get data from API */}
            <CreditCard
              cardNumber={CARD_CREDIT_DATA[currentCardIndex].cardNumber}
              expireDate={CARD_CREDIT_DATA[currentCardIndex].expireDate}
              holderName={CARD_CREDIT_DATA[currentCardIndex].holderName}
              bankName={CARD_CREDIT_DATA[currentCardIndex].bankName}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
