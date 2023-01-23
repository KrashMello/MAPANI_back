export interface Modules {
  code: string;
  name: string;
}
export interface Permissions {
  modules: Modules[];
  departamentCode: string;
  jobPositionCode: string;
  show: boolean[];
  create: boolean[];
  update: boolean[];
  print: boolean[];
  report: boolean[];
}
export interface PermissionsDB {
  moduleCode: string;
  moduleName: string;
  show: boolean;
  create: boolean;
  update: boolean;
  print: boolean;
  report: boolean;
}
