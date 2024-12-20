'use client';

// Libs
import { Session } from 'next-auth';

// Components
import {
  TransferTab,
  Text,
  Modal,
  UserIcon,
  GlobalIcon,
  GlobalTransferSteps,
  InternalTransferSteps,
} from '@/components';

interface ITransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const TransferModal = ({ isOpen, onClose, session }: ITransferModalProps) => {
  const TRANSFER_TABS = [
    {
      keyTab: 'account',
      title: 'To my Account',
      description: 'Instant transfer between your own accounts',
      icon: <UserIcon width={32} height={32} />,
      content: <InternalTransferSteps session={session} onClose={onClose} />,
    },
    {
      keyTab: 'global',
      title: 'Global Tranfer',
      description: 'Transfer Money across the globe',
      icon: <GlobalIcon width={32} height={32} />,
      content: <GlobalTransferSteps session={session} onClose={onClose} />,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      placement='center'
      classNames={{ base: 'p-0 rounded-xl' }}
    >
      <div className='absolute left-4 top-4 flex flex-col gap-4'>
        <Text as='h4' className='text-base font-medium text-primary-200'>
          Good Evening,{' '}
          <Text as='span' className='font-normal'>
            {session.user?.username}
          </Text>
        </Text>
        <Text as='h5' className='text-sm font-semibold text-primary-200'>
          Transfer Funds
        </Text>
      </div>

      <TransferTab
        TransferTabs={TRANSFER_TABS}
        classNames={{
          base: 'px-4 py-24 bg-lightGraySolid flex-1 rounded-xl min-w-[460px]',
          tabList: 'p-0',
          panel:
            'py-8 pl-6 pr-8 min-h-[560px] bg-background-500 rounded-xl flex',
        }}
      />
    </Modal>
  );
};

export default TransferModal;
