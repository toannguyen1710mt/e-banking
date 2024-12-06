import { Meta, StoryObj } from '@storybook/react';

// Components
import {
  ChevronDownIcon,
  PaypalIcon,
  LockIcon,
  EmailIcon,
  UserIcon,
  ArrowRightIcon,
  GlobalIcon,
  PhoneIcon,
  CalendarIcon,
  PlaneIcon,
  GiftIcon,
  CreditCardIcon,
  WalletIcon,
  FocusIcon,
  TransactionIcon,
  SendIcon,
  RefreshIcon,
  ArrowUpIcon,
  TrashIcon,
  SettingIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@/components';
import { ArrowDownIcon } from './ArrowDownIcon';

const icons = [
  { component: ChevronDownIcon, label: '' },
  { component: LockIcon, label: '' },
  { component: PaypalIcon, label: '' },
  { component: EmailIcon, label: '' },
  { component: UserIcon, label: '' },
  { component: ArrowRightIcon, label: '' },
  { component: GlobalIcon, label: '' },
  { component: PhoneIcon, label: '' },
  { component: CalendarIcon, label: '' },
  { component: PlaneIcon, label: '' },
  { component: GiftIcon, label: '' },
  { component: CreditCardIcon, label: '' },
  { component: WalletIcon, label: '' },
  { component: FocusIcon, label: '' },
  { component: TransactionIcon, label: '' },
  { component: SendIcon, label: '' },
  { component: RefreshIcon, label: '' },
  { component: ArrowUpIcon, label: '' },
  { component: ArrowDownIcon, label: '' },
  { component: TrashIcon, label: '' },
  { component: SettingIcon, label: '' },
  { component: EyeIcon, label: '' },
  { component: EyeSlashIcon, label: '' },
];

const meta: Meta = {
  title: 'Components/IconGallery',
  component: LockIcon,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    customClass: {
      control: { type: 'text' },
      description: 'Custom CSS class via TailwindCSS for styling the icon',
    },
  },
};

export default meta;

type Story = StoryObj<{ customClass: string }>;

const IconGallery = () => (
  <div className='grid grid-cols-6 gap-4'>
    {icons.map(({ component: IconComponent, label }, index) => (
      <div
        key={index}
        className='flex cursor-pointer flex-col items-center gap-2'
      >
        <IconComponent />
        <span className='mt-2 text-base text-foreground-100'>{label}</span>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {},
  render: () => <IconGallery />,
};
