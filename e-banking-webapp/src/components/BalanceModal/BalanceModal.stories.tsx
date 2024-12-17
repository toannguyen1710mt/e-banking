// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BalanceModal } from '.';
import { useEffect, useState } from 'react';

const meta = {
  title: 'Components/BalanceModal',
  component: BalanceModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    currentBalance: '90,000',
    totalInvestment: '80,000',
    username: 'Pheroxios',
  },
} satisfies Meta<typeof BalanceModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    currentBalance: '90,000',
    onClose: () => {},
    totalInvestment: '80,000',
    username: 'Pheroxios',
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
