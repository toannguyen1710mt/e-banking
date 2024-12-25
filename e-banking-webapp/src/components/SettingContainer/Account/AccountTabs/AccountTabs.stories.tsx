import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AccountTabs } from '.';
import { MOCK_SESSION_DATA } from '@/mocks';

const meta = {
  title: 'Components/AccountTabs',
  component: AccountTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `AccountTabs` component provides a tabbed interface for managing various account settings, such as changing passwords, updating email settings, managing connected accounts, and deleting the account. Each tab is styled consistently to ensure a seamless user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccountTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    session: MOCK_SESSION_DATA,
  },
};
