import { RequestValidator } from "@RequestValidator/index";

const ruleAdd = {
  personalDataCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  jobPositionCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  departamentCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  dateOfEntry: {
    alphaSimbol: {},
    notNull: {},
  },
  dateOfDischarge: {
    alphaSimbol: {},
  },
  firstName: {
    alpha: {},
    length: { min: 4, max: 50 },
  },
  lastName: {
    alpha: {},
    length: { min: 4, max: 50 },
  },
  genderCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  documentTypeCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  dni: {
    alpha: {},
  },
  bornDate: {
    alphanumericSimbol: {},
  },
  martialStatusCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  disability: {
    boolean: {},
  },
  disabilityTypeCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  ethnicGroup: {
    boolean: {},
  },
  ethnicDescription: {
    alphaSimbol: {},
    length: { min: 8, max: 150 },
  },
  parrishCode: {
    alphanumericSimbol: {},
    length: { min: 8, max: 15 },
  },
  direction: {
    alphanumericSimbol: {},
    length: { min: 8, max: 150 },
  },
  numberPhone: {
    alpha: {},
  },
};
const ruleUpdate = {
  employedCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  personalDataCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  jobPositionCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  departamentCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  dateOfEntry: {
    alphaSimbol: {},
    notNull: {},
  },
  dateOfDischarge: {
    alphaSimbol: {},
  },
  firstName: {
    alpha: {},
    length: { min: 4, max: 50 },
  },
  lastName: {
    alpha: {},
    length: { min: 4, max: 50 },
  },
  genderCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  documentTypeCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  dni: {
    alpha: {},
  },
  bornDate: {
    alphanumericSimbol: {},
  },
  martialStatusCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  disability: {
    boolean: {},
  },
  disabilityTypeCode: {
    alphanumericSimbol: {},
    length: { min: 7, max: 15 },
  },
  ethnicGroup: {
    boolean: {},
  },
  ethnicDescription: {
    alphaSimbol: {},
    length: { min: 8, max: 150 },
  },
  parrishCode: {
    alphanumericSimbol: {},
    length: { min: 8, max: 15 },
  },
  direction: {
    alphanumericSimbol: {},
    length: { min: 8, max: 150 },
  },
  numberPhone: {
    alpha: {},
  },
};

const ruleAddDepartament = {
  name: {
    alpha: {},
    length: { min: 4, max: 20 },
    notNull: {},
  },
};
const ruleUpdateDepartament = {
  code: {
    alphanumericSimbol: {},
    notNull: {},
    length: { min: 8, max: 15 },
  },
  name: {
    alpha: {},
    length: { min: 4, max: 20 },
    notNull: {},
  },
};

const message = {};

export const EmployedAddRequestValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const EmployedUpdateRequestValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
export const DepartamentAddRequestValidate = new RequestValidator(
  "en-US",
  ruleAddDepartament,
  message
);
export const DepartamentUpdateRequestValidate = new RequestValidator(
  "en-US",
  ruleUpdateDepartament,
  message
);
