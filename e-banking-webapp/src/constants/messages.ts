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
  CARD_NUMBER_PATTERN: 'Card number must only contain digits',
  CCV_INVALID: 'CCV must be exactly 3 digits',
  EXPIRE_DATE_INVALID: 'Expire date must be in the future.',
  RECIPIENT_ACCOUNT_EXACT_12_DIGITS:
    'Recipient Account must be exactly 12 digits',
  RECIPIENT_ACCOUNT_INVALID: 'Recipient Account does not exist',
  RECIPIENT_ACCOUNT_ONLY_NUMBERS: 'Recipient Account must contain only numbers',
  UPLOAD_IMAGE_ONLY_JPG_PNG: 'You can only upload JPG/PNG file!',
  UPLOAD_IMAGE_SIZE: 'Image upload must smaller than 1MB!',
  GET_BALANCE_FOR_ACCOUNT: 'Error fetching balance for send account:',
  TRANSFER_FAILED: 'Transfer failed. Please try again!',
  USE_USER_CONTEXT: 'useUserContext must be used within a UserProvider',
  ERROR_SIGN_UP: 'Error sign up: ',
  ERROR_CHANGE_PASSWORD: 'Error change password: ',
  ERROR_UPDATE_EMAIL_SETTINGS: 'Error update email settings: ',
  ERROR_CREATE_TRANSACTION: 'Error create transaction: ',
  ERROR_GETTING_SESSION: 'Error getting session: ',
  ERROR_TRANSFER_RECEIVED: 'Error while retrieving receiving transaction: ',
  ERROR_TOTAL_TRANSFER_SENT: 'Error while retrieving sent transaction: ',
  ERROR_LOGIN_FORM: 'Error in login form: ',
  ERROR_UPDATE_AVATAR: 'Error updating avatar: ',
  ERROR_REMOVE_AVATAR: 'Error removing avatar: ',
  ERROR_UPLOAD_IMAGE: 'Error uploading image',
  ERROR_UPLOAD_FILE: 'Error uploading file',
  ERROR_GET_ACCOUNT_USER_BY_ID: 'Error fetching accounts by user ID: ',
  ERROR_GET_GLOBAL_ACCOUNTS: 'Error fetching global accounts: ',
  ERROR_GET_LIST_CARD_BY_ACCOUNT_ID: 'Error fetching cards by account ID: ',
  ERROR_GET_TOTAL_CARD_BY_USER: 'Error fetching total cards by user: ',
  ERROR_GET_MAIN_CARD_BY_USER_ID: 'Error fetching main card by user ID: ',
  ERROR_GET_TRANSACTION_BY_USER_ID: 'Failed to fetch transactions: ',
  ERROR_GET_USER_BY_ID: 'Error fetching user by ID: ',
  ERROR_UPDATE_ACCOUNT_INFO: 'Error updating account info: ',
  ERROR_FETCHING_DATA: 'Error fetching data: ',
  ERROR_SIGN_UP_FORM: 'Error in sign up form: ',

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

export const MESSAGE = {
  CONFIRM_LEAVING: 'You have unsaved changes, are you sure you want to leave?',
};
