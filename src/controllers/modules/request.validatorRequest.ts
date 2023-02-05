import { RequestValidator } from "@RequestValidator/index";

const ruleAdd = {
  name: {
    alpha: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  src: {
    alphanumericSimbols: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  icon: {
    alphaSimbols: {},
    notNull: {},
    length: { min: 7, max: 50 },
  },
  order: {
    notNull: {},
    numeric: {},
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
    alphanumericSimbols: {},
    length: { min: 8, max: 15 },
  },
};
const ruleUpdate = {
  code: {
    alphanumericSimbols: {},
    notNull: {},
    length: { min: 8, max: 15 },
  },
  name: {
    alpha: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  src: {
    alphanumericSimbols: {},
    notNull: {},
    length: { min: 4, max: 50 },
  },
  icon: {
    alphaSimbols: {},
    notNull: {},
    length: { min: 7, max: 50 },
  },
  order: {
    notNull: {},
    numeric: {},
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
    alphanumericSimbols: {},
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
