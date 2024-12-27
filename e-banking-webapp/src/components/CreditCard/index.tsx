'use client';

import { Card, CardBody, CardHeader, cn, Divider } from '@nextui-org/react';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

// Utils
import { formatCardNumber } from '@/utils';

// Components
import { ChipIcon, MastercardIcon, PayPassIcon } from '../icons';
import { Text } from '../common';

type VariantsCard = 'main' | 'saving' | 'checking';

interface CreditCardProps {
  variant?: VariantsCard;
  expireDate: string;
  cardNumber: string;
  holderName: string;
  bankName: string;
}

const VARIANT_BACKGROUND: Record<VariantsCard, string> = {
  main: 'bg-gradient-to-r from-black to-[#101e24]',
  saving: 'bg-gradient-to-t from-[#885DF5] to-[#29ABE2]',
  checking: 'bg-gradient-to-t from-[#02CAFD] to-[#83F8A6]',
};

export const CreditCard = ({
  variant = 'main',
  expireDate,
  cardNumber,
  holderName,
  bankName,
}: CreditCardProps) => {
  return (
    <Card
      className={cn(
        'w-full min-w-[290px] rounded-[6px] bg-cover bg-no-repeat',
        VARIANT_BACKGROUND[variant],
      )}
    >
      <CardHeader className='flex justify-between gap-2 pb-0'>
        <div className='flex items-center gap-3'>
          <Text className='font-extrabold text-white'>E-Banking</Text>
          <Divider
            orientation='vertical'
            className='h-[20px] w-[1px] bg-secondary-400'
          />
          <Text className='text-xs font-normal text-secondary-400'>
            {bankName}
          </Text>
        </div>
        <PayPassIcon />
      </CardHeader>
      <CardBody className='mb-[18px] mt-[14px] py-0'>
        <div className='flex items-end justify-between'>
          <ChipIcon customClass='mb-[4px]' />
          <Text
            as='span'
            className='mr-[14px] text-right text-2xs text-secondary-400'
          >
            world
          </Text>
        </div>
        <Text
          size={TEXT_SIZE['SM']}
          className='ml-4 mt-1 font-extrabold tracking-[3px] text-secondary-400'
        >
          {formatCardNumber(cardNumber)}
        </Text>
        <div className='mt-2 flex justify-between gap-5'>
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
                className='text-right text-2xs font-extrabold text-secondary-400'
              >
                {expireDate}
              </Text>
            </div>
            <Text
              size={TEXT_SIZE['XS']}
              className='mt-[2px] max-w-[185px] overflow-hidden text-ellipsis whitespace-nowrap text-left uppercase tracking-[1px] text-secondary-400'
            >
              {holderName}
            </Text>
          </div>
          <MastercardIcon />
        </div>
      </CardBody>
    </Card>
  );
};
