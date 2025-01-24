// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Utils
import { InternalTransferFormSchema } from '@/schemas';

// Mocks
import { useMockFormInternal } from '@/mocks';

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

export const Default: Story = {
  render: (args) => (
    <WizardForm.Root
      schema={InternalTransferFormSchema}
      form={useMockFormInternal()}
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
