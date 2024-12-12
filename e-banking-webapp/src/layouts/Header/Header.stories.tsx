// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { NavbarItem } from '@/constants';
import { MOCK_CUSTOM_OPTIONS } from '@/mocks';

// Components
import { Header } from '.';

// Mock Data
const mockMobileMenuOptions = NavbarItem.map((item) => ({
  key: item.path,
  label: item.text,
}));

const meta = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isMenuOpen: {
      description: 'Toggle state of the mobile menu',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isMenuOpen: true,
    mobileMenuOptions: mockMobileMenuOptions,
    customOptions: MOCK_CUSTOM_OPTIONS,
  },
};
