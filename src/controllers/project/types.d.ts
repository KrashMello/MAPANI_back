export interface ProjectIf {
  code?: string;
  name: string;
  acronym: string;
  startDate: string;
  dueDate: string;
  minYearsOld: string;
  maxYearsOld: string;
  fromDay: string;
  toDay: string;
  isJustOneDay: boolean;
  sponsors: SponsorsByProject[];
}
export interface SponsorsByProject {
  code: string;
  projectCode: string;
  name: string;
  email: string;
  delete: boolean;
}
