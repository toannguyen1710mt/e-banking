// Libs
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

// Constants
import { MOCK_SESSION_DATA } from '@/mocks';

// Models
import { AccountType, GlobalType } from '@/interfaces';
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { GlobalTransferForm } from '@/components';
import { FetchedBalancesProvider } from '@/context';

const meta = {
  title: 'Components/Transfers/GlobalTransferForm',
  tags: ['autodocs'],
  component: GlobalTransferForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-[300px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalTransferForm>;

export default meta;

type Story = StoryObj<typeof GlobalTransferForm>;

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

export const InternalTransferFormDefault: Story = {
  render: () => (
    <FetchedBalancesProvider>
      <WizardForm.Root
        schema={GlobalTransferFormSchema}
        form={useMockForm()}
        className='flex grow flex-col'
      >
        <WizardForm.Step name='transfer' key='transfer'>
          <GlobalTransferForm session={MOCK_SESSION_DATA} />
        </WizardForm.Step>
      </WizardForm.Root>
    </FetchedBalancesProvider>
  ),
};
