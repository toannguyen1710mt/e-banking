// Libs
import { Meta, StoryObj } from '@storybook/react';

// Components
import { GlobalTransferForm } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

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
  args: {
    session: MOCK_SESSION_DATA,
  },
};
