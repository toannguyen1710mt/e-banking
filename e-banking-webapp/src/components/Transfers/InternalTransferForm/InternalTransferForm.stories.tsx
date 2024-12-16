// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InternalTransferForm } from '@/components';

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

export const InternalTransferFormDefault: Story = {};
