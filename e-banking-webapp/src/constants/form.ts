export const SIGNUP_FORM_DEFAULT_VALUES = {
  user: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  contact: {
    phone: '',
    country: 'United States',
    postal: '344',
  },
  card: {
    holderName: '',
    cardNumber: '',
    expireAt: '',
    ccv: '',
  },
};

export const ACCOUNT_DEFAULT_VALUES = [
  {
    accountNumber: '123456789208',
    balance: 3438800,
    type: 'Main',
    currency: '$',
    name: 'OCB',
  },
  {
    accountNumber: '999332289888',
    balance: 84438800,
    type: 'Checkings',
    currency: '$',
    name: 'ACB',
  },
  {
    accountNumber: '106868929357',
    balance: 9238800,
    type: 'Savings',
    currency: '$',
    name: 'VID',
  },
];

export const PASSWORD_DEFAULT_VALUES = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
