'use client';

// Libs
import { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { AuthError, Session } from 'next-auth';

// Constants
import { createExpenseAnalysisOptions, ERROR_MESSAGES } from '@/constants';

// Mocks
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Interfaces
import { IAccount, ICard } from '@/interfaces';

// Services
import { getBalanceAccount, getCardById } from '@/services';

// Utils
import { formatNumberWithCommas, formatYearMonthToShortDate } from '@/utils';

// Component
import {
  Button,
  Text,
  CreditCard,
  MasterCard,
  ChevronRightIcon,
  VariantsCard,
} from '@/components';

interface IInformationCardProps {
  session: Session;
}

interface ICardWithState extends ICard {
  type: string;
  error?: boolean;
}

export const InformationCard = ({ session }: IInformationCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [cards, setCards] = useState<ICardWithState[]>([]);

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
        const { user } = await getBalanceAccount(String(session.user.id));

        setAccounts(user?.accounts || []);

        if (user?.accounts?.length) {
          const listCard: ICardWithState[] = [];

          for (const account of user.accounts) {
            try {
              const { card } = await getCardById(account.documentId);

              const enrichedCards = card.cards.map((card: ICard) => ({
                ...card,
                type: account.type,
                error: false,
              }));

              listCard.push(...enrichedCards);
            } catch (_error) {
              listCard.push({
                id: account.documentId,
                type: account.type,
                error: true,
                cardNumber: '',
                holderName: '',
                ccv: '',
                expireAt: '',
              });
            }
          }

          setCards(listCard);
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

  return (
    <>
      <Card className='w-full'>
        <CardBody className='flex flex-row justify-between gap-[58px] p-0'>
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

            <CreditCard
              variant={
                cards[currentCardIndex]?.type.toLowerCase() as VariantsCard
              }
              cardNumber={cards[currentCardIndex]?.cardNumber}
              holderName={cards[currentCardIndex]?.holderName}
              expireDate={formatYearMonthToShortDate(
                cards[currentCardIndex]?.expireAt,
              )}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
