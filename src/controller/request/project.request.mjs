import { RequestValidator } from "#Class/validator";
const rule = {
  name: {
    alpha: {},
    length: { min: 5, max: 15 },
    notNull: {},
  },
  acronym: {
    alphanumeric: {},
    length: { min: 3, max: 15 },
    notNull: {},
  },

  startDate: {
    notNull: {},
  },

  dueDate: {
    notNull: {},
  },

  minYearsOld: {
    alphanumeric: {},
    length: { min: 14, max: 15 },
    notNull: {},
  },

  maxYearsOld: {
    alphanumeric: {},
    length: { min: 14, max: 15 },
    notNull: {},
  },

  fromDay: {
    alphanumeric: {},
    length: { min: 1, max: 1 },
    notNull: {},
  },

  toDay: {
    alphanumeric: {},
    length: { min: 1, max: 1 },
    notNull: {},
  },

  isJustOneDay: {
    notNull: {},
  },

  sponsors: {
    notNull: {},
  },
};

const updateRule = {
  code: {
    alpha: {},
    length: { min: 6, max: 15 },
    notNull: {},
  },

  name: {
    alpha: {},
    length: { min: 5, max: 15 },
    notNull: {},
  },
  acronym: {
    alphanumeric: {},
    length: { min: 3, max: 15 },
    notNull: {},
  },

  startDate: {
    notNull: {},
  },

  dueDate: {
    notNull: {},
  },

  minYearsOld: {
    alphanumeric: {},
    length: { min: 14, max: 15 },
    notNull: {},
  },

  maxYearsOld: {
    alphanumeric: {},
    length: { min: 14, max: 15 },
    notNull: {},
  },

  fromDay: {
    alphanumeric: {},
    length: { min: 1, max: 1 },
    notNull: {},
  },

  toDay: {
    alphanumeric: {},
    length: { min: 1, max: 1 },
    notNull: {},
  },

  isJustOneDay: {
    notNull: {},
  },

  sponsors: {
    notNull: {},
  },
};

const message = {
  alpha: "las letras no coinciden",
  length: "debe meter mas digitos ",
  alphanumeric: "debe haber solo letras y numeros",
};

export const projectRequestValidate = new RequestValidator(
  "en-US",
  rule,
  message
);
export const projectUpdateRequestValidate = new RequestValidator(
  "en-US",
  updateRule,
  message
);
