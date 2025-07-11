'use client';

// Libs
import { Suspense, useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Session } from 'next-auth';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Interfaces
import { IAccount, ICardsPayloadByAccount } from '@/interfaces';

// Services
import { getAccountsByUserId } from '@/services';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Component
import {
  Button,
  Text,
  CreditCard,
  MasterCard,
  ChevronRightIcon,
  VariantsCard,
  CreditCardSkeleton,
} from '@/components';

interface IInformationCardProps {
  session: Session;
}

export const InformationCard = ({ session }: IInformationCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [cards, setCards] = useState<ICardsPayloadByAccount[]>([]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAccountsByUserId(session.user.id);

        if (result?.length) {
          setAccounts(result);

          try {
            const response = await fetch('/api/cards', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            });
            const totalCard = await response.json();

            setCards(totalCard);
          } catch (_error) {
            setCards([]);
          }
        }
      } catch (error) {
        if (error) {
          return error;
        }
      }
    };

    fetchData();
  }, [session.user.id]);

  const totalBalance = accounts?.reduce(
    (total, account) => total + account.balance,
    0,
  );

  const { accountType, cardNumber, holderName, expireAt } =
    cards[currentCardIndex] || {};

  return (
    <>
      <Card className='w-full'>
        <CardBody className='flex flex-col-reverse justify-between gap-[30px] p-0 md:flex-row'>
          <MasterCard
            series={MASTERCARD_CHART_MOCK}
            totalBalance={createExpenseAnalysisOptions(
              formatNumberWithCommas(totalBalance || 0),
            )}
          />
          <div className='flex w-full flex-col gap-[14px] px-[22px] pb-5 pt-2'>
            <div className='flex flex-col gap-[11px]'>
              <div className='flex items-center justify-between'>
                <Text as='span' className='text-sm font-semibold text-navyBlue'>
                  My Cards
                </Text>
                <div className='flex gap-1'>
                  <Button
                    aria-label='Previous card'
                    variant='outline'
                    color='outline'
                    className='w-5 min-w-0 border-none p-0'
                    isDisabled={currentCardIndex === 0}
                    onClick={handlePrevCard}
                  >
                    <ChevronRightIcon customClass='rotate-180' />
                  </Button>
                  <Button
                    aria-label='Next card'
                    variant='outline'
                    color='outline'
                    className='w-5 min-w-0 border-none p-0'
                    isDisabled={currentCardIndex === cards.length - 1}
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

            <Suspense fallback={<CreditCardSkeleton />}>
              <CreditCard
                variant={accountType?.toLowerCase() as VariantsCard}
                cardNumber={cardNumber}
                holderName={holderName}
                expireDate={expireAt}
              />
            </Suspense>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
