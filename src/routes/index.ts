import { Auth } from "@src/controllers/auth/auth.controller";
import { Users } from "@src/controllers/user/user.controller";
import { Modules } from "@src/controllers/modules/modules.controller";
import { UserStatus } from "@src/controllers/user/userStatus.controller";
import { UserRoles } from "@src/controllers/user/userRole.controller";
import { UserDepartamentPermissions } from "@src/controllers/user/userDepartamentPermisions.controller";
import { Parrish } from "@src/controllers/regions/parrish.controller";
import { Stade } from "@src/controllers/regions/stade.controller";
import { Municipality } from "@src/controllers/regions/municipality.controller";
import { Region } from "@src/controllers/regions/region.controller";
import { Sponsor } from "@src/controllers/sponsor/sponsor.controller";
import { Project } from "@src/controllers/project/project.controller";
import { Disability } from "@src/controllers/personalData/disability.controller";
import { Gender } from "@src/controllers/personalData/gender.controller";
import { DocumentType } from "@src/controllers/personalData/documentType.controller";
import { MartialStatus } from "@src/controllers/personalData/martialStatus.controller";
import { Patient } from "@src/controllers/patient/patient.controller";
import { Departament } from "@src/controllers/employed/departament.controller";
import { Employed } from "@src/controllers/employed/employed.controller";
import { JobPosition } from "@src/controllers/employed/jobPosition.controller";
import { Appointment } from "@src/controllers/appointments/appointment.controller";
export const controllers = [
  Users,
  Auth,
  Modules,
  UserStatus,
  UserRoles,
  UserDepartamentPermissions,
  Parrish,
  Stade,
  Municipality,
  Region,
  Sponsor,
  Project,
  Disability,
  Gender,
  MartialStatus,
  Patient,
  Departament,
  Employed,
  JobPosition,
  DocumentType,
  Appointment,
];
