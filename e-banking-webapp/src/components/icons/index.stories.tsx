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
  CarIcon,
  HomeIcon,
  WifiRouterIcon,
  ArrowUpRightIcon,
  AmazonIcon,
  PaymentIcon,
  MoreVerticalIcon,
  PlusIcon,
  ChevronRightIcon,
  SignOutIcon,
  SearchIcon,
  NotificationIcon,
  ChipIcon,
  PayPassIcon,
  MastercardIcon,
} from '@/components';
import { ArrowDownIcon } from './ArrowDownIcon';
import { HouseIcon } from './HouseIcon';

const icons = [
  { component: ChevronDownIcon, label: 'Chevron Down' },
  { component: LockIcon, label: 'Lock' },
  { component: PaypalIcon, label: 'Paypal' },
  { component: EmailIcon, label: 'Email' },
  { component: UserIcon, label: 'User' },
  { component: ArrowRightIcon, label: 'Arrow Right' },
  { component: GlobalIcon, label: 'Global' },
  { component: PhoneIcon, label: 'Phone' },
  { component: CalendarIcon, label: 'Calendar' },
  { component: PlaneIcon, label: 'Plane' },
  { component: GiftIcon, label: 'Gift' },
  { component: CreditCardIcon, label: 'Credit Card' },
  { component: WalletIcon, label: 'Wallet' },
  { component: FocusIcon, label: 'Focus' },
  { component: TransactionIcon, label: 'Transaction' },
  { component: SendIcon, label: 'Send' },
  { component: RefreshIcon, label: 'Refresh' },
  { component: ArrowUpIcon, label: 'Arrow Up' },
  { component: ArrowDownIcon, label: 'Arrow Down' },
  { component: TrashIcon, label: 'Trash' },
  { component: SettingIcon, label: 'Setting' },
  { component: EyeIcon, label: 'Eye' },
  { component: EyeSlashIcon, label: 'Eye Slash' },
  { component: CarIcon, label: 'Car' },
  { component: HomeIcon, label: 'Home' },
  { component: WifiRouterIcon, label: 'Wifi Router' },
  { component: ArrowUpRightIcon, label: 'Arrow Up Right' },
  { component: AmazonIcon, label: 'Amazon' },
  { component: HouseIcon, label: 'House' },
  { component: PaymentIcon, label: 'Payment' },
  { component: MoreVerticalIcon, label: 'More Vertical' },
  { component: PlusIcon, label: 'Plus' },
  { component: ChevronRightIcon, label: 'Chevron Right' },
  { component: SignOutIcon, label: 'Sign Out' },
  { component: SearchIcon, label: 'Search' },
  { component: NotificationIcon, label: 'Notification' },
  { component: ChipIcon, label: 'Chip' },
  { component: PayPassIcon, label: 'Pay Pass' },
  { component: MastercardIcon, label: 'Mastercard' },
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
