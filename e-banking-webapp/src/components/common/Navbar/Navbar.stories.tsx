// Libs
import { NavbarContent, Navbar as NavbarNextUI } from '@nextui-org/react';
import { Meta, StoryObj } from '@storybook/react';

// Constants
import { NavbarList } from '@/constants';

// Components
import { Navbar } from '.';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Common/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavbarNextUI>
        <NavbarContent className='gap-[59px] font-normal text-transparentBlack'>
          <Story />
        </NavbarContent>
      </NavbarNextUI>
    ),
  ],
  argTypes: {
    navbarItem: {
      description:
        'An array of objects representing the navigation items, each containing `text` (the label of the tab) and `url` (the link to navigate to).',
      control: {
        type: 'object',
      },
    },
  },
  args: {
    navbarItem: NavbarList,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbarItem: NavbarList,
  },
};
