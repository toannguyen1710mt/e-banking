export const ERROR_MESSAGES = {
  DEFAULT:
    'We apologize for the inconvenience. The page you are looking for might have been removed or is temporarily unavailable.',
  FIELD_REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_INVALID: 'Password must be at least 8 characters long',
  PASSWORD_PATTERN:
    'Password must contain at least one uppercase letter and one special character',
  PHONE_INVALID: 'Phone number must be exactly 12 digits',
  PHONE_PATTERN: 'Phone number must only contain digits',
  LOGIN_FAILED: 'Incorrect username or password. Please try again.',
  USERNAME_INVALID: 'Username must be at least 3 characters long',
  IDENTIFIER_INVALID: 'Username or Email must be at least 3 characters long',
  FIELD_NOT_SPACE: 'This field cannot be empty or whitespace',
  PASSWORD_DOES_NOT_MATCH: 'Password does not match',
  SIGN_UP_FAILED: 'Sign up failed. Please try again.',
  SIGN_UP_SUCCESS:
    'Sign up successful. Please check your email to verify your account.',
  SIGN_IN_FAILED: 'Sign in failed. Please try again.',
  SIGN_IN_SUCCESS: 'Sign in successful.',
  SIGN_OUT_FAILED: 'Sign out failed. Please try again.',
  SIGN_OUT_SUCCESS: 'Sign out successful.',
  ADD_CARD_SUCCESS: 'Add card successful.',
  ADD_CARD_FAILED: 'Add card failed. Please try again.',
  CHANGE_PASSWORD_FAILED: 'Change password failed. Please try again.',
  CHANGE_PASSWORD_SUCCESS: 'Change password successful.',
  INVALID_CURRENT_PASSWORD: 'The provided current password is invalid',
  NEW_PASSWORD_SAME_AS_OLD:
    'Your new password must be different than your current password',
  UPDATE_EMAIL_SETTINGS_SUCCESS: 'Update options email settings successful.',
  AMOUNT_MIN: 'Amount must be equal or greater than 0.01',
  AMOUNT_EXCEEDED_BALANCE: 'Amount cannot exceed available balance of',
  CARD_HOLDER_NAME_REQUIRED: 'Holders Name is required',
  CARD_NUMBER_INVALID: 'Card number must be exactly 12 digits',
  CCV_INVALID: 'CCV must be exactly 3 digits',
  EXPIRE_DATE_INVALID: 'Expire date must be in the future.',
  RECIPIENT_ACCOUNT_EXACT_12_DIGITS:
    'Recipient Account must be exactly 12 digits',
  RECIPIENT_ACCOUNT_ONLY_NUMBERS: 'Recipient Account must contain only numbers',
  UPLOAD_IMAGE_ONLY_JPG_PNG: 'You can only upload JPG/PNG file!',
  UPLOAD_IMAGE_SIZE: 'Image upload must smaller than 1MB!',
  GET_BALANCE_FOR_ACCOUNT: 'Error fetching balance for send account:',
  TRANSFER_FAILED: 'Transfer failed. Please try again!',

  // Services
  NETWORK_ERROR: 'Network response was not ok!',
  GET_ERROR: 'The server does not respond. Retrieving data failed!',
  POST_ERROR: 'The server does not respond. Please try again!',
  UPDATE_ERROR: 'Update failed. Please try again!',
  DELETE_ERROR: 'Delete failed. Please try again!',
  INVALID_CREDENTIALS: 'Invalid credentials!',
  INVALID_USER_PERMISSIONS: 'Invalid user permissions!',
  ACCOUNT_AND_PASSWORD_INVALID:
    'Your account or password is incorrect, please try again.',
  SIGN_UP_ERROR: 'Failed to sign up. Please try again later.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',

  // Empty data
  EMPTY_DATA: 'No data available!',
};

export const DESCRIPTIONS = {
  EXPENSE_ANALYSIS:
    'The `ExpenseAnalysis` component is designed to display a credit card interface, showcasing key details such as the card number, cardholder name, expiration date, and associated bank information in a visually structured manner.',
};
