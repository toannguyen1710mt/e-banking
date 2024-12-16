// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
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

export const InternalTransferFormDefault: Story = {};
