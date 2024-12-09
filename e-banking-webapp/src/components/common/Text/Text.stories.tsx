import type { Meta, StoryObj } from '@storybook/react';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '.';

const meta = {
  title: 'Components/Common/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'primary', 'secondary', 'tertiary'],
    },

    size: {
      control: 'inline-radio',
      options: ['2xl', 'xl', 'lg', 'base', 'md', 'sm', 'xs', '2xs'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    children: 'Default',
    variant: TEXT_VARIANT.DEFAULT,
    size: TEXT_SIZE.BASE,
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: TEXT_VARIANT.PRIMARY,
    size: TEXT_SIZE.XS,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: TEXT_VARIANT.SECONDARY,
    size: TEXT_SIZE.SM,
  },
};

export const Tertiary: Story = {
  render: () => (
    <div className='bg-amber-400'>
      <Text variant={TEXT_VARIANT.TERTIARY} size={TEXT_SIZE.LG}>
        Tertiary
      </Text>
    </div>
  ),
};
