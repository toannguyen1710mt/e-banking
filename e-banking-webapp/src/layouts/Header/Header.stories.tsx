// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Layouts
import { Header } from '@/layouts';
import { MOCK_SESSION_DATA } from '@/mocks';

const meta = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    session: MOCK_SESSION_DATA,
  },
};
