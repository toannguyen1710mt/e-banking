'use client';

import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

// Constants
import { MODAL_STYLES_ADD_CREDIT_CARD } from '@/constants';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

// Utils
import { formatCardNumber } from '@/utils';

// Components
import { ChipIcon, MastercardIcon, PayPassIcon } from '../icons';
import { Text } from '../common';

export type VariantsCard = 'main' | 'savings' | 'checking';

interface CreditCardProps {
  variant?: VariantsCard;
  isModal?: boolean;
  expireDate?: string;
  cardNumber?: string;
  holderName?: string;
  bankName?: string;
}

const VARIANT_BACKGROUND: Record<VariantsCard, string> = {
  main: 'bg-gradient-to-r from-black to-[#101e24]',
  savings: 'bg-gradient-to-t from-[#885DF5] to-[#29ABE2]',
  checking: 'bg-gradient-to-t from-[#02CAFD] to-[#83F8A6]',
};

export const CreditCard = ({
  variant = 'main',
  isModal = false,
  bankName = 'Universal Bank',
  expireDate = '--/--',
  cardNumber = '',
  holderName = '',
}: CreditCardProps) => {
  const {
    cardMaxWidth,
    cardHeaderGap,
    headerContentGap,
    payPassIcon,
    cardBody,
    chipSize,
    worldTextSize,
    cardNumberText,
    detailsGap,
    expireText,
    holderNameText,
    mastercardIconSize,
  } = MODAL_STYLES_ADD_CREDIT_CARD[isModal.toString() as 'true' | 'false'];
  const textSize = isModal ? TEXT_SIZE['2XS'] : TEXT_SIZE.BASE;

  return (
    <Card
      className={`w-full self-center rounded-[6px] bg-cover bg-no-repeat ${cardMaxWidth} ${VARIANT_BACKGROUND[variant]} shadow-none`}
    >
      <CardHeader className={`flex justify-between pb-0 ${cardHeaderGap}`}>
        <div className={`flex items-center ${headerContentGap}`}>
          <Text size={textSize} className='font-extrabold text-white'>
            E-Banking
          </Text>
          <Divider
            orientation='vertical'
            className='h-[20px] w-[1px] bg-secondary-400'
          />
          <Text size={textSize} className='font-normal text-secondary-400'>
            {bankName}
          </Text>
        </div>
        <PayPassIcon customClass={payPassIcon} />
      </CardHeader>
      <CardBody className={`py-0 ${cardBody}`}>
        <div className='flex items-end justify-between'>
          <ChipIcon customClass={`mb-[4px] ${chipSize}`} />
          <Text
            as='span'
            className={`mr-[14px] text-right text-secondary-400 ${worldTextSize}`}
          >
            world
          </Text>
        </div>
        <Text
          className={`font-extrabold tracking-[3px] text-secondary-400 ${cardNumberText}`}
        >
          {formatCardNumber(cardNumber)}
        </Text>
        <div className={`flex justify-between ${detailsGap}`}>
          <div className='flex-1'>
            <div className='flex items-center justify-end gap-1'>
              <Text
                as='span'
                className='max-w-[20px] text-5xs leading-[8px] text-secondary-400'
              >
                VALID THRU
              </Text>
              <Text
                as='span'
                className={`text-right font-extrabold text-secondary-400 ${expireText}`}
              >
                {expireDate}
              </Text>
            </div>
            <Text
              className={`mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-left uppercase tracking-[1px] text-secondary-400 ${holderNameText}`}
            >
              {holderName}
            </Text>
          </div>
          <MastercardIcon customClass={mastercardIconSize} />
        </div>
      </CardBody>
    </Card>
  );
};
