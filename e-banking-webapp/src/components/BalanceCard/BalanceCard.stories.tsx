// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BalanceCard } from '.';

const meta = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      description: 'Amount displayed on the card',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    amount: 670000,
  },
} satisfies Meta<typeof BalanceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
