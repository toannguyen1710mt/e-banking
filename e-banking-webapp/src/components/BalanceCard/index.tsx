import { Card } from '@nextui-org/react';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text, ArrowUpRightIcon, PaymentIcon } from '@/components';

interface BalanceCardProps {
  amount: number;
}

export const BalanceCard = ({ amount }: BalanceCardProps) => (
  <Card className='h-[155px] w-full pl-[14px] pr-4 pt-[13px]'>
    <div className='mb-10 flex justify-between text-primary-200'>
      <PaymentIcon />
      <ArrowUpRightIcon />
    </div>

    <div className='flex flex-col gap-3'>
      <Text className='text-2xl font-extrabold text-primary-200' as='span'>
        ${formatNumberWithCommas(amount)}
      </Text>

      <Text size={TEXT_SIZE['2XS']} variant={TEXT_VARIANT.INFO}>
        Your total balance
      </Text>
    </div>
  </Card>
);
