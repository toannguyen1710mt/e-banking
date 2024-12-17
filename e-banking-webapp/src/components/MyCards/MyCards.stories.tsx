import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MyCards } from '.';

const meta = {
  title: 'Components/MyCards',
  component: MyCards,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `MyCards` is a component that displays information about a card with information such as account type name.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MyCards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <MyCards {...args} />,
};
