import { ERROR_MESSAGES } from './messages';
import { REGEX } from './regex';

export const EMAIL_RULES = {
  required: ERROR_MESSAGES.FIELD_REQUIRED,
  pattern: {
    value: REGEX.EMAIL,
    message: ERROR_MESSAGES.EMAIL_INVALID,
  },
};

export const PASSWORD_RULES = {
  required: ERROR_MESSAGES.FIELD_REQUIRED,
  minLength: {
    value: 8,
    message: ERROR_MESSAGES.PASSWORD_INVALID,
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
    message: ERROR_MESSAGES.PASSWORD_PATTERN,
  },
};
