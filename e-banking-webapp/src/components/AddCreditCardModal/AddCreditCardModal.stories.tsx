// Libs
import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AddCreditCardModal } from '@/components';

const meta = {
  title: 'Components/AddCreditCardModal',
  component: AddCreditCardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof AddCreditCardModal>;

export default meta;

type Story = StoryObj<typeof AddCreditCardModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
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

    return (
      <AddCreditCardModal {...args} isOpen={isOpen} onClose={handleClose} />
    );
  },
};
