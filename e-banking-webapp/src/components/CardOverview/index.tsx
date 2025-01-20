'use client';

// Libs
import { useEffect, useState } from 'react';
import { Card, CardBody, useDisclosure } from '@nextui-org/react';
import { AuthError, Session } from 'next-auth';

// Constants
import { createExpenseAnalysisOptions, ERROR_MESSAGES } from '@/constants';

// Interface
import { ICard } from '@/interfaces';

// Services
import { getMainCardByUserId } from '@/services';

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

interface ICardOverviewProps {
  session: Session;
}

export const CardOverview = ({ session }: ICardOverviewProps) => {
  const [card, setCard] = useState<ICard>({} as ICard);
  const {
    isOpen: isOpenAddCardModal,
    onOpen: onOpenAddCardModal,
    onClose: onCloseAddCardModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const card = await getMainCardByUserId(Number(session?.user.id));

        setCard(card);
      } catch (error) {
        if (error instanceof AuthError) {
          throw ERROR_MESSAGES.GET_ERROR;
        }
      }
    };

    fetchData();
  }, [session?.user?.id]);

  const { cardNumber, expireAt, holderName } = card;

  return (
    <>
      <Card className='col-span-3'>
        <CardBody className='flex flex-col justify-between gap-6 p-0 sm:flex-row'>
          <div className='flex w-full max-w-full flex-col gap-4 px-4 py-2 md:max-w-[325px]'>
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
              cardNumber={cardNumber}
              expireDate={expireAt}
              holderName={holderName}
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
