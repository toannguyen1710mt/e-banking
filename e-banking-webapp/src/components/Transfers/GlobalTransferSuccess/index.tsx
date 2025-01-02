'use client';

// Components
import { Button, CheckIcon, Text } from '@/components';

interface IGlobalTransferSuccess {
  amount: string;
  userName: string;
  onClose?: () => void;
}

export const GlobalTransferSuccess = ({
  amount,
  userName,
  onClose,
}: IGlobalTransferSuccess) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-background-300'>
        <CheckIcon />
      </div>
      <Text as='h4' className='text-sm font-semibold'>
        Transaction was Successful
      </Text>
      <Text className='max-w-[220px] text-center text-xs font-medium text-primary-200 opacity-50'>
        A sum of ${amount} was transferred to {userName}
      </Text>

      <Button
        color='tertiary'
        radius='xs'
        size='md'
        className='mt-8'
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};
