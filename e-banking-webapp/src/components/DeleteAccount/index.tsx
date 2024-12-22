// Component
import { Button, Input, Text } from '@/components';

export const DeleteAccount = () => {
  return (
    <div>
      <Text as='span' className='text-sm font-semibold text-navyBlue'>
        Delete Account
      </Text>
      <div className='mt-[18px] flex gap-4'>
        <Text as='span' className='text-xs font-semibold text-red'>
          Warning :
        </Text>
        <Text as='span' className='text-xs font-normal'>
          Deleting Your Account is irreversible , it deletes all your data and
          information
        </Text>
      </div>
      <div className='mt-8'>
        <Input
          type='Password'
          label='Current Password'
          placeholder=' '
          labelPlacement='outside'
          radius='md'
          classNames={{
            label: 'font-normal text-xs !text-black opacity-100',
            inputWrapper: 'border-semiTransparentNavyBlue',
            mainWrapper: 'w-[680px]',
          }}
        />
      </div>
      <Button
        variant='solid'
        color='danger'
        size='base'
        radius='xs'
        className='mt-7'
      >
        Delete Account
      </Button>
    </div>
  );
};
