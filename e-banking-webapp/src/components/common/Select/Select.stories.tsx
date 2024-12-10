// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Select } from '@/components';

const countries = [
  {
    key: 'Kenya',
    label: 'Kenya',
  },
  {
    key: 'USA',
    label: 'USA',
  },
];

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
    options: countries,
    classNames: { mainWrapper: 'w-[200px]' },
  },
};
