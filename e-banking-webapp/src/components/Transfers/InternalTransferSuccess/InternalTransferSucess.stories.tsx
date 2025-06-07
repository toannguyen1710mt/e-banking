// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Utils
import { InternalTransferFormSchema } from '@/schemas';

// Mocks
import { useMockFormInternal } from '@/mocks';

// Components
import { InternalTransferSuccess } from '@/components';
import * as WizardForm from '@/components/common/WizardForm';

const meta = {
  title: 'Components/Transfers/InternalTransferSuccess',
  tags: ['autodocs'],
  component: InternalTransferSuccess,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InternalTransferSuccess>;

export default meta;

type Story = StoryObj<typeof InternalTransferSuccess>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <WizardForm.Root
      schema={InternalTransferFormSchema}
      form={useMockFormInternal()}
      className='flex grow flex-col'
    >
      <WizardForm.Step
        name='success'
        key='success'
        className='flex grow flex-col items-center justify-center'
      >
        <InternalTransferSuccess {...args} />
      </WizardForm.Step>
    </WizardForm.Root>
  ),
};
