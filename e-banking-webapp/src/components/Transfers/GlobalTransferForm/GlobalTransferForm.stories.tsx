// Libs
import { Meta, StoryObj } from '@storybook/react';

// Constants
import { MOCK_SESSION_DATA, useMockFormGlobal } from '@/mocks';

// Context
import { FetchedBalancesProvider } from '@/context';

// Utils
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { GlobalTransferForm } from '@/components';

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

export const InternalTransferFormDefault: Story = {
  render: () => (
    <FetchedBalancesProvider>
      <WizardForm.Root
        schema={GlobalTransferFormSchema}
        form={useMockFormGlobal()}
        className='flex grow flex-col'
      >
        <WizardForm.Step name='transfer' key='transfer'>
          <GlobalTransferForm session={MOCK_SESSION_DATA} />
        </WizardForm.Step>
      </WizardForm.Root>
    </FetchedBalancesProvider>
  ),
};
