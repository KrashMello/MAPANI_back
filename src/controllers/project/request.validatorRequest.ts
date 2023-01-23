import { RequestValidator } from "@RequestValidator/index";
const ruleAdd = {
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
const ruleUpdate = {
  code: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
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

const message = {};

export const ProjectAddRequestValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const ProjectUpdateRequestValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
