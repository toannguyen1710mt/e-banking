// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Utils
import { GlobalTransferFormSchema } from '@/schemas';

// Mocks
import { useMockFormGlobal } from '@/mocks';

// Components
import { GlobalTransferSuccess } from '@/components';
import * as WizardForm from '@/components/common/WizardForm';

const meta = {
  title: 'Components/Transfers/GlobalTransferSuccess',
  tags: ['autodocs'],
  component: GlobalTransferSuccess,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GlobalTransferSuccess>;

export default meta;

type Story = StoryObj<typeof GlobalTransferSuccess>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <WizardForm.Root
      schema={GlobalTransferFormSchema}
      form={useMockFormGlobal()}
      className='flex grow flex-col'
    >
      <WizardForm.Step
        name='success'
        key='success'
        className='flex grow flex-col items-center justify-center'
      >
        <GlobalTransferSuccess {...args} />
      </WizardForm.Step>
    </WizardForm.Root>
  ),
};
