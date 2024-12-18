// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@nextui-org/react';

// Components
import { Button, SendIcon, Text } from '@/components';
import TransferModal from '@/components/Transfers/TransferModal';

const meta = {
  title: 'Components/Transfers/TransferModal',
  tags: ['autodocs'],
  component: TransferModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransferModal>;

export default meta;

type Story = StoryObj<typeof TransferModal>;

export const Default: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
      defaultOpen: args.isOpen,
    });

    return (
      <>
        <Button
          className='flex h-full !max-h-none flex-col gap-2 !bg-transparent text-foreground-100'
          onClick={onOpen}
        >
          <SendIcon />
          <Text as='span' className='text-2xs'>
            Transfers
          </Text>
        </Button>
        <TransferModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  },
};
