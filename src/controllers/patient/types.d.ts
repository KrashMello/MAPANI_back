export interface PatientIf {
  code?: string;
  firstName: string;
  lastName: string;
  bornDate: string;
  genderCode: string;
  birthCertificate: boolean;
  disability: boolean;
  disabilityTypes: DisabilityTypes;
}
export interface DisabilityTypes {
  motor: boolean;
  visual: boolean;
  cognitive: boolean;
  auditive: boolean;
}
