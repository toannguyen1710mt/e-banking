import { GlobalType } from '@/interfaces';

export const GLOBAL_TYPES = {
  SOUTH_AFRICA: 'South Africa',
  KENYA: 'Kenya',
  GERMANY: 'Germany',
  UK: 'UK',
};

export const TRANSFER_FORM_GLOBAL_OPTIONS = [
  {
    key: GlobalType.SOUTH_AFRICA,
    label: 'South Africa',
  },
  {
    key: GlobalType.KENYA,
    label: 'Kenya',
  },
  {
    key: GlobalType.GERMANY,
    label: 'Germany',
  },
  {
    key: GlobalType.UK,
    label: 'UK',
  },
];

export const OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL = [
  {
    key: GlobalType.SOUTH_AFRICA,
    label: 'ZAR',
  },
  {
    key: GlobalType.KENYA,
    label: 'KSH',
  },
  {
    key: GlobalType.GERMANY,
    label: 'EUR',
  },
  {
    key: GlobalType.UK,
    label: 'GPB',
  },
];
