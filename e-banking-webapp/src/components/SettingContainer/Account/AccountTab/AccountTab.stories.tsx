import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AccountTab } from '.';

const meta = {
  title: 'Components/AccountTab',
  component: AccountTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `AccountTab` component provides a tabbed interface for managing various account settings, such as changing passwords, updating email settings, managing connected accounts, and deleting the account. Each tab is styled consistently to ensure a seamless user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccountTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <AccountTab />,
};
