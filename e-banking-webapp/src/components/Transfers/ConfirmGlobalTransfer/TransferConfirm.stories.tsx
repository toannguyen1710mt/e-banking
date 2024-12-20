// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

// Utils
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import { ConfirmGlobalTransfer } from '@/components';

const meta = {
  title: 'Components/ConfirmGlobalTransfer',
  component: ConfirmGlobalTransfer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmGlobalTransfer>;

export default meta;

type Story = StoryObj<typeof ConfirmGlobalTransfer>;

export const Default: Story = {
  args: {
    submitHandler: (data: z.infer<typeof GlobalTransferFormSchema>) => {
      console.log('Form submitted:', data);
    },
    amountInUSD: '500',
  },
  render: (args) => <ConfirmGlobalTransfer {...args} />,
};
