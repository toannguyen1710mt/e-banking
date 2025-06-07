// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { SubMenu } from '@/components';

const meta = {
  title: 'Components/Common/SubMenu',
  component: SubMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-full max-w-[1200px]'>
        <style>
          {`
            @media (min-width: 800px) {
              .hidden {
                display: block !important;
              }
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SubMenu>;

export default meta;

type Story = StoryObj<typeof SubMenu>;

export const Default: Story = {
  args: {},
};
