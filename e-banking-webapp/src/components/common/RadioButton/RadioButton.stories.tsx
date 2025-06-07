import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { RadioButton } from '.';
import { ACCOUNT_TYPES } from '@/constants';
import { RadioGroup } from '@nextui-org/react';

const meta = {
  title: 'Components/Common/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ACCOUNT_TYPES.MAIN_WALLET,
    onChange: () => {},
    children: 'Main Wallet',
  },
  render: (args) => (
    <RadioGroup>
      <RadioButton {...args} />
    </RadioGroup>
  ),
};
