// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CreditCard } from '@/components';

const meta = {
  title: 'Components/Common/CreditCard',
  component: CreditCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CreditCard` component visually represents a credit card with essential details like card number, cardholder name, validity date, and bank information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    variant: 'main',
  },
} satisfies Meta<typeof CreditCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    variant: 'main',
    cardNumber: '537544114540',
    expireDate: '06/28',
    holderName: 'DONALD FLINCH CORTEZ',
    bankName: 'Universal Bank',
  },
  render: (args) => <CreditCard {...args} />,
};

export const Saving: Story = {
  args: {
    ...Main.args,
    variant: 'savings',
  },
  render: (args) => <CreditCard {...args} />,
};

export const Checking: Story = {
  args: {
    ...Main.args,
    variant: 'checking',
  },
  render: (args) => <CreditCard {...args} />,
};
