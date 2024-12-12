import { SettingIcon, SignOutIcon } from '@/components';

export const MOCK_OPTIONS = [
  {
    key: 'Kenya',
    label: 'Kenya',
  },
  {
    key: 'USA',
    label: 'USA',
  },
];

export const MOCK_CUSTOM_OPTIONS = [
  {
    key: 'Pheroxios Yehudi',
    label: '',
    customOptionElement: (
      <div className='flex flex-col gap-2'>
        <span className='text-xs font-semibold'>Pheroxios Yehudi</span>
        <span className='text-3xs font-semibold text-transparentBlack'>
          Pheroxios@yehudi.com
        </span>
      </div>
    ),
  },
  {
    key: 'Settings',
    label: 'Settings',
    startContent: <SettingIcon />,
  },
  {
    key: 'Sign Out',
    label: 'Sign Out',
    startContent: <SignOutIcon />,
  },
];
