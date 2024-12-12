// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ArrowUpIcon, Chip } from '@/components';

const meta = {
  title: 'Components/Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `Chip` is a small block of essential information that represent an input, attribute, or action.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'The text content of the Chip.',
    },
  },
  args: {
    startContent: <ArrowUpIcon />,
    text: '8%',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startContent: <ArrowUpIcon />,
    text: '8%',
    bgColor: 'bg-lightAqua',
    fontColor: 'text-primary-200',
    fontSize: 'text-4xs',
    fontWeight: 'font-extrabold',
    customClass: 'h-4',
  },
  render: (args) => <Chip {...args} />,
};

export const Success: Story = {
  args: {
    ...Default.args,
    bgColor: 'bg-lightGreen',
    fontColor: 'text-green',
  },
  render: (args) => <Chip {...args} />,
};

export const Danger: Story = {
  args: {
    ...Default.args,
    bgColor: 'bg-lightRed',
    fontColor: 'text-red',
  },
  render: (args) => <Chip {...args} />,
};
