// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { GlobalIcon, TransferTab, UserIcon } from '@/components';

const meta = {
  title: 'Components/Transfers/TransferTab',
  component: TransferTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransferTab>;

export default meta;

type Story = StoryObj<typeof TransferTab>;

export const Default: Story = {
  args: {
    TransferTabs: [
      {
        keyTab: 'tab1',
        title: 'Tab 1',
        description: 'Description for Tab 1',
        icon: <UserIcon />,
        content: <div>Content for Tab 1</div>,
      },
      {
        keyTab: 'tab2',
        title: 'Tab 2',
        description: 'Description for Tab 2',
        icon: <GlobalIcon />,
        content: <div>Content for Tab 2</div>,
      },
    ],
  },
};
