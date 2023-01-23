import { RequestValidator } from "@RequestValidator/index";

const ruleAdd = {
  personalDataCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  username: {
    alpha: {},
    length: { min: 5, max: 15 },
    notNull: {},
  },
  email: {
    email: {},
    length: { min: 10, max: 150 },
    notNull: {},
  },
  password: {
    alphanumeric: {},
    length: { min: 4, max: 15 },
    notNull: {},
  },
  securityCode: {
    alphanumeric: {},
    length: { min: 8, max: 50 },
    notNull: {},
  },
  statusCode: {
    alphanumericsimbols: {},
    length: { min: 9, max: 15 },
  },
  roleCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  firstName: {
    alphaSimbols: {},
    length: { min: 8, max: 50 },
  },
  lastName: {
    alphaSimbols: {},
    length: { min: 8, max: 50 },
  },
  genderCode: {
    alphanumericsimbols: {},
    length: { min: 7, max: 15 },
  },
  documentTypeCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  dni: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
  bornDate: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  martialStatusCode: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  disability: {
    boolean: {},
  },
  disabilityTypeCode: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  ethnicGroup: {
    boolean: {},
  },
  ethnicDescription: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
  parrishCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  direction: {
    alphanumericsimbols: {},
    length: { min: 8, max: 150 },
  },
  phoneNumber: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
};

const ruleUpdate = {
  personalDataCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  userCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },

  username: {
    alpha: {},
    length: { min: 5, max: 15 },
    notNull: {},
  },
  email: {
    email: {},
    length: { min: 10, max: 150 },
    notNull: {},
  },
  password: {
    alphanumeric: {},
    length: { min: 4, max: 15 },
    notNull: {},
  },
  securityCode: {
    alphanumeric: {},
    length: { min: 8, max: 50 },
    notNull: {},
  },
  statusCode: {
    alphanumericsimbols: {},
    length: { min: 9, max: 15 },
  },
  roleCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  firstName: {
    alphaSimbols: {},
    length: { min: 8, max: 50 },
  },
  lastName: {
    alphaSimbols: {},
    length: { min: 8, max: 50 },
  },
  genderCode: {
    alphanumericsimbols: {},
    length: { min: 7, max: 15 },
  },
  documentTypeCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  dni: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
  bornDate: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  martialStatusCode: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  disability: {
    boolean: {},
  },
  disabilityTypeCode: {
    alphanumericsimbols: {},
    length: { min: 10, max: 15 },
  },
  ethnicGroup: {
    boolean: {},
  },
  ethnicDescription: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
  parrishCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
  },
  direction: {
    alphanumericsimbols: {},
    length: { min: 8, max: 150 },
  },
  phoneNumber: {
    alphanumeric: {},
    length: { min: 8, max: 15 },
  },
};

const ruleAddUserDepartamentPermissons = {
  modules: {
    isArray: {},
    notNull: {},
  },
  departamentCode: {
    notNull: {},
    alphanumericsimbols: {},
  },
  jobPositionCode: {
    notNull: {},
    alphanumericsimbols: {},
  },
  show: {
    isArray: {},
    notNull: {},
  },
  create: {
    isArray: {},
    notNull: {},
  },
  update: {
    isArray: {},
    notNull: {},
  },
  print: {
    isArray: {},
    notNull: {},
  },
  report: {
    isArray: {},
    notNull: {},
  },
};

const message = {
  alphanumeric: "debe haber solo letras y numeros",
};

export const UserAddValidate = new RequestValidator("en-US", ruleAdd, message);
export const UserUpdateValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
export const UserDepartamentPermissionsAddValidate = new RequestValidator(
  "en-US",
  ruleAddUserDepartamentPermissons,
  message
);
