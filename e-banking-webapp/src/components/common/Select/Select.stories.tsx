// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_OPTIONS } from '@/mocks';

// Components
import { Select } from '@/components';

const meta = {
  title: 'Components/Common/Select',
  tags: ['autodocs'],
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const SelectDefault: Story = {
  args: {
    options: MOCK_OPTIONS,
    classNames: { mainWrapper: 'w-[200px]' },
  },
};
