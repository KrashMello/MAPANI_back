import { RequestValidator } from "@RequestValidator/index";

const ruleAdd = {
  name: {
    alpha: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  src: {
    alphanumericSimbol: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  icon: {
    alphaSimbol: {},
    notNull: {},
    length: { min: 7, max: 15 },
  },
  order: {
    notNull: {},
    number: {},
    length: { min: 1, max: 2 },
  },
  unabled: {
    notNull: {},
    boolean: {},
  },
  hasChildren: {
    boolean: {},
    notNull: {},
  },
  fatherCode: {
    alphanumericSimbol: {},
    length: { min: 8, max: 15 },
  },
};
const ruleUpdate = {
  code: {
    alphanumericSimbol: {},
    notNull: {},
    length: { min: 8, max: 15 },
  },
  name: {
    alpha: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  src: {
    alphanumericSimbol: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  icon: {
    alphaSimbol: {},
    notNull: {},
    length: { min: 7, max: 15 },
  },
  order: {
    notNull: {},
    number: {},
    length: { min: 1, max: 2 },
  },
  unabled: {
    notNull: {},
    boolean: {},
  },
  hasChildren: {
    boolean: {},
    notNull: {},
  },
  fatherCode: {
    alphanumericSimbol: {},
    length: { min: 8, max: 15 },
  },
};

const message = {};

export const ModuleAddRequestValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const ModuleUpdateRequestValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
