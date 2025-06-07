// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Context
import { FetchedBalancesProvider } from '@/context';

// Utils
import { InternalTransferFormSchema } from '@/schemas';

// Mocks
import { MOCK_SESSION_DATA, useMockFormInternal } from '@/mocks';

// Components
import { InternalTransferForm } from '@/components';
import * as WizardForm from '@/components/common/WizardForm';

const meta = {
  title: 'Components/Transfers/InternalTransferForm',
  tags: ['autodocs'],
  component: InternalTransferForm,
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
} satisfies Meta<typeof InternalTransferForm>;

export default meta;

type Story = StoryObj<typeof InternalTransferForm>;

export const InternalTransferFormDefault: Story = {
  args: {
    session: MOCK_SESSION_DATA,
  },
  render: (args) => (
    <FetchedBalancesProvider>
      <WizardForm.Root
        schema={InternalTransferFormSchema}
        form={useMockFormInternal()}
        className='flex grow flex-col'
      >
        <WizardForm.Step name='internalTransfer' key='internalTransfer'>
          <InternalTransferForm {...args} />
        </WizardForm.Step>
      </WizardForm.Root>
    </FetchedBalancesProvider>
  ),
};
