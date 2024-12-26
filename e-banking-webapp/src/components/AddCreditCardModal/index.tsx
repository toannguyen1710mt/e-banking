import Image from 'next/image';

// Constants
import { IMAGES } from '@/constants';

// Components
import { Modal, Text } from '../common';

interface IAddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCreditCardModal = ({
  isOpen,
  onClose,
}: IAddCreditCardModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      placement='center'
      classNames={{
        base: 'p-0 rounded-xl bg-primary-200',
      }}
    >
      <div className='flex items-center justify-between'>
        <Image
          className='max-w-[50%] flex-1 px-[31px] py-[87px]'
          src={IMAGES.ADD_CREDIT_CARD_IMAGE}
          width={333}
          height={280}
          alt='Add Credit Card'
        />
        <div className='min-h-[500px] flex-1 rounded-xl bg-white px-4 py-8'>
          {/* TODO: Will update form Add Credit Card later */}
          <Text>Add Credit Card</Text>
        </div>
      </div>
    </Modal>
  );
};
