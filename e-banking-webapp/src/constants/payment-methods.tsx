import { AppleIcon, GoogleIcon, MobileIcon, PaypalIcon } from '@/components';

export const PAYMENT_METHODS = [
  { label: 'PayPal', icon: PaypalIcon, buttonText: 'Connected To PayPal' },
  {
    label: 'Google Pay',
    icon: GoogleIcon,
    buttonText: 'Connected To Google Pay',
  },
  { label: 'Apple Pay', icon: AppleIcon, buttonText: 'Connect to Apple Pay' },
  { label: 'Mpesa', icon: MobileIcon, buttonText: 'Connect to Mobile Pay' },
];
