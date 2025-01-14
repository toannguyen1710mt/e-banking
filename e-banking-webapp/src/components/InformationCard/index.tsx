'use client';

// Libs
import { Suspense, useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { AuthError, Session } from 'next-auth';

// Constants
import { createExpenseAnalysisOptions, ERROR_MESSAGES } from '@/constants';

// Mocks
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Interfaces
import { IAccount, ICardsPayloadByAccount } from '@/interfaces';

// Services
import { getAccountsByUserId, getTotalCardsByAccounts } from '@/services';

// Utils
import { formatNumberWithCommas, formatQueryParamsFromAccounts } from '@/utils';

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
          const queryString = formatQueryParamsFromAccounts(result);

          try {
            const { totalCard } = await getTotalCardsByAccounts(queryString);

            setCards(totalCard);
          } catch (_error) {
            setCards([]);
          }
        }
      } catch (error) {
        if (error instanceof AuthError) {
          throw ERROR_MESSAGES.GET_ERROR;
        }
      }
    };

    fetchData();
  }, [session.user.id]);

  const totalBalance = accounts?.reduce(
    (total, account) => total + account.balance,
    0,
  );

  const {
    account: { type } = {},
    cardNumber,
    holderName,
    expireAt,
  } = cards[currentCardIndex] || {};

  return (
    <>
      <Card className='w-full'>
        <CardBody className='flex flex-row justify-between gap-[53px] p-0'>
          <MasterCard
            series={MASTERCARD_CHART_MOCK}
            totalBalance={createExpenseAnalysisOptions(
              formatNumberWithCommas(totalBalance || 0),
            )}
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
                    isDisabled={currentCardIndex === 0}
                    onClick={handlePrevCard}
                  >
                    <ChevronRightIcon customClass='rotate-180' />
                  </Button>
                  <Button
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
                variant={type?.toLowerCase() as VariantsCard}
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
