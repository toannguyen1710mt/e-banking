// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CreditCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/CreditCardSkeleton',
  component: CreditCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof CreditCardSkeleton>;

export default meta;

type Story = StoryObj<typeof CreditCardSkeleton>;

export const Default: Story = {
  args: {},
};
