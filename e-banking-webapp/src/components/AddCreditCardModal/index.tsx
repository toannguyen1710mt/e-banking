import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Constants
import { IMAGES } from '@/constants';

// Schemas
import { CreditCardSchema } from '@/schemas';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { Modal } from '../common';
import { AddCreditCard } from './AddCreditCard';
import { ConfirmAddCard } from './ConfirmAddCard';

interface IAddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = z.infer<typeof CreditCardSchema>;

export const AddCreditCardModal = ({
  isOpen,
  onClose,
}: IAddCreditCardModalProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreditCardSchema),
    defaultValues: {
      fullName: '',
      cardNumber: '',
      expireAt: '',
      ccv: '',
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  // TODO: Will integrating api later
  const submitHandler = async () => {
    return;
  };

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
          <WizardForm.Root
            schema={CreditCardSchema}
            form={form}
            className='flex grow flex-col'
          >
            <WizardForm.Step name='addCreditCard' key='addCreditCard'>
              <AddCreditCard />
            </WizardForm.Step>
            <WizardForm.Step name='addCreditCard' key='addCreditCard'>
              <ConfirmAddCard
                schema={CreditCardSchema}
                submitHandler={submitHandler}
              />
            </WizardForm.Step>
          </WizardForm.Root>
        </div>
      </div>
    </Modal>
  );
};
