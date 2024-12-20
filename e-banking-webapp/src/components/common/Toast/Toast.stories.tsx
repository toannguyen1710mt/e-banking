// Libs
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '@nextui-org/react';

// Components
import { Button, Text, Toast } from '@/components';

// Context
import { useToastContext } from '@/context';

// Types
import { ToastType, ToastPosition } from '@/interfaces';

const meta = {
  title: 'Components/Common/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toast />
      </>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomizableToast: Story = {
  render: () => {
    const { showToast } = useToastContext();

    const [selectedType, setSelectedType] = useState<ToastType>('success');
    const [selectedPosition, setSelectedPosition] =
      useState<ToastPosition>('top-right');

    const handleTypeChange = (value: ToastType) => {
      setSelectedType(value);
    };

    const handlePositionChange = (value: ToastPosition) => {
      setSelectedPosition(value);
    };

    const handleButtonClick = () => {
      showToast('Custom message', selectedType, selectedPosition);
    };

    return (
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <Text as='h3' className='mb-4'>
            Toast Type
          </Text>
          <RadioGroup
            orientation='horizontal'
            value={selectedType}
            onValueChange={(value) => handleTypeChange(value as ToastType)}
          >
            <Radio value='success'>Success</Radio>
            <Radio value='error'>Error</Radio>
            <Radio value='info'>Info</Radio>
          </RadioGroup>
        </div>

        <div className='flex flex-col'>
          <Text as='h3' className='mb-4'>
            Toast Position
          </Text>
          <RadioGroup
            orientation='horizontal'
            value={selectedPosition}
            onValueChange={(value) =>
              handlePositionChange(value as ToastPosition)
            }
          >
            <Radio value='top-left'>Top Left</Radio>
            <Radio value='top-right'>Top Right</Radio>
            <Radio value='top-center'>Top Center</Radio>
            <Radio value='bottom-left'>Bottom Left</Radio>
            <Radio value='bottom-right'>Bottom Right</Radio>
            <Radio value='bottom-center'>Bottom Center</Radio>
          </RadioGroup>
        </div>

        {/* Button to trigger the toast */}
        <Button
          onClick={handleButtonClick}
          className='mt-4 w-[120px] min-w-0 self-center rounded p-2 text-white'
        >
          Show Toast
        </Button>
      </div>
    );
  },
};
