// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TargetTile, GiftIcon } from '@/components';

const meta = {
  title: 'Components/TargetTile',
  tags: ['autodocs'],
  component: TargetTile,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-[300px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TargetTile>;

export default meta;

type Story = StoryObj<typeof TargetTile>;

export const TargetTileDefault: Story = {
  args: {
    icon: GiftIcon,
    title: 'Self Reward',
    targetAmount: 45000,
    deposit: 100000,
    currencyUnit: '$',
  },
};
