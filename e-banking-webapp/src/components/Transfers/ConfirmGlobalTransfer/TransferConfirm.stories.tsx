// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

// Utils
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import { ConfirmGlobalTransfer } from '@/components';
import * as WizardForm from '@/components/common/WizardForm';

const meta = {
  title: 'Components/Transfers/ConfirmGlobalTransfer',
  component: ConfirmGlobalTransfer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmGlobalTransfer>;

export default meta;

type Story = StoryObj<typeof ConfirmGlobalTransfer>;

import { useForm } from 'react-hook-form';
import { AccountType, GlobalType } from '@/interfaces';

const useMockForm = () => {
  return useForm({
    defaultValues: {
      globalTransfer: {
        fromAccountType: '' as AccountType,
        fromCountryType: '' as GlobalType,
        recipientAccount: '',
        amount: '',
      },
      fromAccountId: '',
      fromCardName: '',
      fromAccountNumber: '',
      fromAccountBalance: 0,
      recipientName: '',
    },
  });
};

export const Default: Story = {
  args: {
    submitHandler: (data: z.infer<typeof GlobalTransferFormSchema>) => {
      console.log('Form submitted:', data);
    },
    amountInUSD: '500',
  },
  render: (args) => (
    <WizardForm.Root
      schema={GlobalTransferFormSchema}
      form={useMockForm()}
      className='flex grow flex-col'
    >
      <WizardForm.Step
        name='confirm'
        key='confirm'
        className='flex grow flex-col items-center justify-center'
      >
        <ConfirmGlobalTransfer {...args} />
      </WizardForm.Step>
    </WizardForm.Root>
  ),
};
