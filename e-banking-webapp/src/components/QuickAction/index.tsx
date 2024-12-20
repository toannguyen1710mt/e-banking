'use client';

// Libs
import { Card, useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { Session } from 'next-auth';

// Components
import {
  Button,
  FocusIcon,
  RefreshIcon,
  SendIcon,
  Text,
  TransactionIcon,
} from '@/components';

interface Action {
  icon: () => JSX.Element;
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const TransferModal = dynamic(
  () => import('@/components/Transfers/TransferModal'),
  {
    ssr: false,
  },
);

const BalanceModal = dynamic(() => import('@/components/BalanceModal'), {
  ssr: false,
});

interface QuickActionProps {
  session: Session;
}

export const QuickAction = ({ session }: QuickActionProps) => {
  const {
    isOpen: isOpenTransferModal,
    onOpen: onOpenTransferModal,
    onClose: onCloseTransferModal,
  } = useDisclosure();
  const {
    isOpen: isOpenBalanceModal,
    onOpen: onOpenBalanceModal,
    onClose: onCloseBalanceModal,
  } = useDisclosure();

  const QUICK_ACTIONS: Action[] = [
    {
      icon: FocusIcon,
      label: 'Top Up',
      isDisabled: true,
      onClick: () => {},
    },
    {
      icon: SendIcon,
      label: 'Transfer',
      onClick: onOpenTransferModal,
    },
    {
      icon: RefreshIcon,
      label: 'Request',
      isDisabled: true,
      onClick: () => {},
    },
    {
      icon: TransactionIcon,
      label: 'Balance',
      onClick: onOpenBalanceModal,
    },
  ];

  return (
    <>
      <Card className='flex flex-col gap-2 rounded-md bg-background-500 px-[6px] py-2'>
        <Text as='h3' className='text-xs font-semibold'>
          Quick Action
        </Text>
        <ul className='grid grid-cols-4 rounded-md bg-softWhite'>
          {QUICK_ACTIONS.map((action) => {
            const { icon, label, isDisabled, onClick } = action;

            const ActionIcon = icon;

            return (
              <li key={label}>
                <Button
                  className='flex h-full !max-h-none min-w-0 flex-col gap-2 !bg-transparent px-0 text-foreground-100'
                  isDisabled={isDisabled}
                  onClick={onClick}
                >
                  <ActionIcon />
                  <Text as='span' className='text-2xs'>
                    {label}
                  </Text>
                </Button>
              </li>
            );
          })}
        </ul>
      </Card>
      {isOpenTransferModal && (
        <TransferModal
          session={session}
          isOpen={isOpenTransferModal}
          onClose={onCloseTransferModal}
        />
      )}
      {isOpenBalanceModal && (
        <BalanceModal
          session={session}
          isOpen={isOpenBalanceModal}
          onClose={onCloseBalanceModal}
        />
      )}
    </>
  );
};
