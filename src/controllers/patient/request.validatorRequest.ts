import { RequestValidator } from "@RequestValidator/index";
const ruleAdd = {
  firstName: {
    notNull: {},
    length: { min: 4, max: 50 },
    alpha: {},
  },
  lastName: {
    notNull: {},
    alpha: {},
    length: { min: 4, max: 50 },
  },
  bornDate: {
    notNull: {},
    alphanumericSimbol: {},
  },
  genderCode: {
    alphanumericSimbol: {},
    notNull: {},
  },
  birthCertificate: {
    boolean: {},
    notNull: {},
  },
  disability: {
    boolean: {},
  },
  disabilityTypes: {
    isArray: {},
  },
};
const ruleUpdate = {
  code: {
    alphanumericSimbol: {},
    notNull: {},
    length: { min: 8, max: 15 },
  },
  firstName: {
    notNull: {},
    length: { min: 4, max: 50 },
    alpha: {},
  },
  lastName: {
    notNull: {},
    alpha: {},
    length: { min: 4, max: 50 },
  },
  bornDate: {
    notNull: {},
    alphanumericSimbol: {},
  },
  genderCode: {
    alphanumericSimbol: {},
    notNull: {},
  },
  birthCertificate: {
    boolean: {},
    notNull: {},
  },
  disability: {
    boolean: {},
  },
  disabilityTypes: {
    isArray: {},
  },
};

const message = {};

export const PatientAddRequestValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const PatientUpdateRequestValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
