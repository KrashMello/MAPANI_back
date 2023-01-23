import { RequestValidator } from "@RequestValidator/index";

const ruleAdd = {
  pediatrics: {
    boolean: {},
  },
  nutritionist: { boolean: {} },
  psychiatry: { boolean: {} },
  breastfeedingAdvice: { boolean: {} },
  advocacy: { boolean: {} },
  socialPsychology: { boolean: {} },
  clinicalPsychology: { boolean: {} },
  clinicHistoryCode: { alphanumericsimbols: {}, length: { min: 10, max: 15 } },
  representativeFirstName: { alpha: {}, length: { min: 8, max: 150 } },
  representativeLastName: { alpha: {}, length: { min: 8, max: 150 } },
  representativeDirection: { alpha: {}, length: { min: 8, max: 150 } },
  representativeNumberPhone: { alphanumeric: {}, length: { min: 8, max: 150 } },
  patientFirstName: { alpha: {}, length: { min: 8, max: 150 } },
  patientLastName: { alpha: {}, length: { min: 8, max: 150 } },
  patientBornDate: { alphanumericsimbols: {}, length: { min: 8, max: 150 } },
};

const ruleUpdate = {
  code: {
    notNull: {},
    alphanumericsimbols: {},
  },
  pediatrics: {
    boolean: {},
  },
  nutritionist: { boolean: {} },
  psychiatry: { boolean: {} },
  breastfeedingAdvice: { boolean: {} },
  advocacy: { boolean: {} },
  socialPsychology: { boolean: {} },
  clinicalPsychology: { boolean: {} },
  clinicHistoryCode: { alphanumericsimbols: {}, length: { min: 10, max: 15 } },
  representativeFirstName: { alpha: {}, length: { min: 8, max: 150 } },
  representativeLastName: { alpha: {}, length: { min: 8, max: 150 } },
  representativeDirection: { alpha: {}, length: { min: 8, max: 150 } },
  representativeNumberPhone: { alphanumeric: {}, length: { min: 8, max: 150 } },
  patientFirstName: { alpha: {}, length: { min: 8, max: 150 } },
  patientLastName: { alpha: {}, length: { min: 8, max: 150 } },
  patientBornDate: { alphanumericsimbols: {}, length: { min: 8, max: 150 } },
};
const message = {};

export const AppoinmentAddValidate = new RequestValidator(
  "en-US",
  ruleAdd,
  message
);
export const AppoinmentUpdateValidate = new RequestValidator(
  "en-US",
  ruleUpdate,
  message
);
