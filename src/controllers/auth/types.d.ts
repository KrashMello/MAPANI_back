import { JwtPayload } from "jsonwebtoken";
export interface userData {
  code?: string;
  username?: string;
  password?: string | null | undefined;
  email?: string;
  userSecurityCode?: string;
  recuperatePasswordToken?: string | null;
  personalDataCode?: string;
  firstName?: string;
  lastName?: string;
  genderCode?: string;
  genderName?: string;
  documentTypeCode?: string;
  documentTypeName?: string;
  documentTypeAcronym?: string;
  dni?: string;
  bornDate?: string;
  martialStatusCode?: string;
  martialStatusName?: string;
  disability?: boolean;
  disabilityTypeCode?: string | null;
  disabilityTypeName?: string | null;
  ethnicGroup?: boolean;
  ethnicDescription?: string | null;
  parrishCode?: string;
  parrishName?: string;
  municipalityCode?: string;
  municipalityName?: string;
  stadeCode?: string;
  stadeName?: string;
  regionCode?: string;
  regionName?: string;
  direction?: string;
  phoneNumber?: string;
  statusCode?: string;
  statusName?: string;
  roleCode?: string;
  roleName?: string;
  departamentCode?: string;
  departamentName?: string;
  jobPositionCode?: string;
  jobPositionName?: string;
}
export interface decodedJWT {
  username: string;
  ait: number;
  exp: number;
}
