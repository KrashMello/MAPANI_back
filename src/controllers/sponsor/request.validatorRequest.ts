import { RequestValidator } from "@RequestValidator/index";
const ruleAdd = {
  name: { alpha: {}, notNull: {} },
  email: { email: {}, notNull: {} },
  contactNumber: { alphanumeric: {}, notNull: {} },
  documentTypeCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
    notNull: {},
  },
  rif: { alphanumeric: {}, length: { min: 8, max: 15 }, notNull: {} },
};

const ruleUpdate = {
  code: { notNull: {}, alphanumericsimbols: {}, length: { min: 8, max: 15 } },
  name: { alpha: {}, notNull: {} },
  email: { email: {}, notNull: {} },
  contactNumber: { alphanumeric: {}, notNull: {} },
  documentTypeCode: {
    alphanumericsimbols: {},
    length: { min: 8, max: 15 },
    notNull: {},
  },
  rif: { alphanumeric: {}, length: { min: 8, max: 15 }, notNull: {} },
};
const message = {};

export const SponsorAddValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const SponsorUpdateValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
