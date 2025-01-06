const REGEX_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const REGEX_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
);

const REGEX_SETTINGS = new RegExp(/\/settings/);

const REGEX_NUMERIC_12_DIGITS = new RegExp(/^\d{12}$/);

export const REGEX = {
  EMAIL: REGEX_EMAIL,
  PASSWORD: REGEX_PASSWORD,
  SETTINGS: REGEX_SETTINGS,
  NUMERIC_12_DIGITS: REGEX_NUMERIC_12_DIGITS,
};
