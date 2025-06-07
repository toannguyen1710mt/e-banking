// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@nextui-org/react';

// Components
import { Button, Modal } from '@/components';

const meta = {
  title: 'Components/Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
      defaultOpen: args.isOpen,
    });

    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose} />
      </>
    );
  },
  args: {
    children: 'This is the content of a modal',
  },
  argTypes: {
    onClose: { action: 'closed' },
  },
};
