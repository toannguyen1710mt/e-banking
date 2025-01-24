// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

// Interfaces
import { AccountType } from '@/interfaces';

// Utils
import { InternalTransferFormSchema } from '@/schemas';

// Components
import { ConfirmInternalTransfer } from '@/components';
import * as WizardForm from '@/components/common/WizardForm';

const meta = {
  title: 'Components/Transfers/ConfirmInternalTransfer',
  tags: ['autodocs'],
  component: ConfirmInternalTransfer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmInternalTransfer>;

export default meta;

type Story = StoryObj<typeof ConfirmInternalTransfer>;

const useMockForm = () => {
  return useForm({
    defaultValues: {
      fromAccountId: '',
      fromCardName: '',
      fromAccountNumber: '',
      fromAccountBalance: 0,
      toAccountId: '',
      internalTransfer: {
        amount: '500',
        fromAccountType: '' as AccountType,
        toAccountType: '' as AccountType,
      },
      toCardName: '',
      toAccountNumber: '',
      toAccountBalance: 0,
    },
  });
};

export const Default: Story = {
  render: (args) => (
    <WizardForm.Root
      schema={InternalTransferFormSchema}
      form={useMockForm()}
      className='flex grow flex-col'
    >
      <WizardForm.Step
        name='confirm'
        key='confirm'
        className='flex grow flex-col items-center justify-center'
      >
        <ConfirmInternalTransfer {...args} />
      </WizardForm.Step>
    </WizardForm.Root>
  ),
};
