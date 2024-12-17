'use client';

// Constants
import { TRANSFER_TABS } from '@/constants';

// Components
import { TransferTab, Text, Modal } from '@/components';

interface ITransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferModal = ({ isOpen, onClose }: ITransferModalProps) => {
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
            Pheroxios
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
          panel: 'py-8 pl-6 pr-8 min-h-[560px] bg-background-500 rounded-xl',
        }}
      />
    </Modal>
  );
};
