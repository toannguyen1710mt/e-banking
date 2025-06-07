'use client';

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Chip } from '.';

const meta = {
  title: 'Components/Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `Chip` is a small block of essential information that represents an input, attribute, or action. This component supports customizable sizes and colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the Chip.',
      defaultValue: 'sm',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger'],
      description: 'Controls the color of the Chip.',
      defaultValue: 'primary',
    },
    children: {
      control: 'text',
      description: 'The content displayed inside the Chip.',
      defaultValue: 'Chip',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    size: 'sm',
    color: 'primary',
    children: 'Chip',
  },
};

// Variants by size
export const Sizes: Story = {
  render: (args) => (
    <div className='flex gap-2'>
      <Chip {...args} size='sm'>
        Small
      </Chip>
      <Chip {...args} size='md'>
        Medium
      </Chip>
      <Chip {...args} size='lg'>
        Large
      </Chip>
    </div>
  ),
  args: {
    color: 'primary',
  },
};

// Variants by color
export const Colors: Story = {
  render: (args) => (
    <div className='flex gap-2'>
      <Chip {...args} color='primary'>
        Primary
      </Chip>
      <Chip {...args} color='secondary'>
        Secondary
      </Chip>
      <Chip {...args} color='success'>
        Success
      </Chip>
      <Chip {...args} color='danger'>
        Danger
      </Chip>
    </div>
  ),
  args: {
    size: 'md',
  },
};
