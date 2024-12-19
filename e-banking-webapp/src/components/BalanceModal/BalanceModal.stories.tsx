// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

// Mocks data
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import BalanceModal from '.';

const meta = {
  title: 'Components/BalanceModal',
  component: BalanceModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BalanceModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    session: MOCK_SESSION_DATA,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    const handleClose = () => {
      setIsOpen(false);
      if (args.onClose) {
        args.onClose();
      }
    };

    return <BalanceModal {...args} isOpen={isOpen} onClose={handleClose} />;
  },
};
