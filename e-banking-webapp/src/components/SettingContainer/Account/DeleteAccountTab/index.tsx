// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Component
import { Button, Input, Text } from '@/components';

export const DeleteAccountTab = () => (
  <>
    <div className='flex flex-col gap-[18px]'>
      <Text as='span' className='text-sm font-semibold text-navyBlue'>
        Delete Account
      </Text>

      <div className='mb-8 flex gap-4'>
        <Text
          as='span'
          className='whitespace-nowrap text-xs font-semibold text-red'
        >
          Warning :
        </Text>
        <Text
          as='span'
          size={TEXT_SIZE.XS}
          variant={TEXT_VARIANT.DEFAULT}
          className='font-normal'
        >
          Deleting Your Account is irreversible , it deletes all your data and
          information
        </Text>
      </div>
    </div>

    <div className='flex max-w-[680px] flex-col gap-[27px]'>
      <Input
        type='Password'
        label='Current Password'
        placeholder=' '
        labelPlacement='outside'
        classNames={{
          input: 'm-0 text-sm',
          label: 'font-normal text-xs !text-black opacity-100',
        }}
      />

      <Button variant='solid' color='danger' size='base' radius='xs' isDisabled>
        Delete Account
      </Button>
    </div>
  </>
);
