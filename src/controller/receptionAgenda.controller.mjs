import receptionAgenga from "#Models/receptionAgenda";
// import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const user = new receptionAgenga();

/**
 * metodo optener usuario
 *
 *
 */
user.get(async (_req, res) => {
  await DB.select("*", "appointment", '"aggregateIn" = date (now())')
    .then((response) => {
      res.json(
          response.rows
      );
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: "Ah ocurrido un error!! " });
    });
});

/**
 * metodo crear usuario
 *
 *
 */
user.created(async (_req, res) => {
//   CALL public.add_appointment(
// 	<_pediatrics boolean>, 
// 	<_nutritionist boolean>, 
// 	<_psychiatry boolean>, 
// 	<_breastfeeding_advice boolean>, 
// 	<_advocacy boolean>, 
// 	<_social_psychology boolean>, 
// 	<_clinical_psychology boolean>, 
// 	<_clinic_history_code character varying>, 
// 	<"_representative_firstName" character varying>, 
// 	<"_representative_lastName" character varying>, 
// 	<"_representative_numberPhone" character varying>, 
// 	<_representative_direction character varying>, 
// 	<"_patient_firstName" character varying>, 
// 	<"_patient_lastName" character varying>, 
// 	<"_patient_bornDate" date>
// )
  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.pediatrics,
    requestValues.nutritionist,
    requestValues.psychiatry,
    requestValues.breastfeedingAdvice,
    requestValues.advocacy,
    requestValues.socialPsychology,
    requestValues.clinicalPsychology,
    requestValues.clinicHistroryCode === null ? "NULL::character varying" : "'" + requestValues.clinicHistroryCode + "'::character varying",
    "'" + requestValues.representativeFirstName + "'::character varying",
    "'" + requestValues.representativeLastName + "'::character varying",
    "'" + requestValues.representativeNumberPhone + "'::character varying",
    "'" + requestValues.representativeDirection + "'::character varying",
    "'" + requestValues.patientFirstName + "'::character varying",
    "'" + requestValues.patientLastName + "'::character varying",
    "'" + requestValues.patientBornDate + "'::DATE",
  ];
  
  // res.json(queryOptions)
  await DB.call("add_appointment", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "Cita agregada exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(401)
        .json({ status: "error", message: "Ah ocurrido un error!! " });
    });
});

/**
 * metodo Actualizar usuario
 *
 *
 */
user.updated(async (_req, res) => {
//   CALL public.update_appointment(
// 	<_code character varying>, 
// 	<"_appointmentDate" date>, 
// 	<_pediatrics boolean>, 
// 	<_nutritionist boolean>, 
// 	<_psychiatry boolean>, 
// 	<"_breastfeedingAdvice" boolean>, 
// 	<_advocacy boolean>, 
// 	<"_socialPsychology" boolean>, 
// 	<"_clinicalPsychology" boolean>, 
// 	<"_clinicHistoryCode" character varying>, 
// 	<"_representativeFirstName" character varying>, 
// 	<"_representativeLastName" character varying>, 
// 	<"_representativeNumberPhone" character varying>, 
// 	<"_representativeDirection" character varying>, 
// 	<"_patientFirstName" character varying>, 
// 	<"_patientLastName" character varying>, 
// 	<"_patientBornDate" date>, 
// 	<_status integer>
// )
  
  let requestValues = _req.body.params;
  let queryOptions = [
    "'" + requestValues.code + "'::character varying",
    "'" + requestValues.appointmentDate + "'::character varying",
    requestValues.pediatrics,
    requestValues.nutritionist,
    requestValues.psychiatry,
    requestValues.breastfeedingAdvice,
    requestValues.advocacy,
    requestValues.socialPsychology,
    requestValues.clinicalPsychology,
    requestValues.clinicHistroryCode === null ? "NULL::character varying" : "'" + requestValues.clinicHistroryCode + "'::character varying",
    "'" + requestValues.representativeFirstName + "'::character varying",
    "'" + requestValues.representativeLastName + "'::character varying",
    "'" + requestValues.representativeNumberPhone + "'::character varying",
    "'" + requestValues.representativeDirection + "'::character varying",
    "'" + requestValues.patientFirstName + "'::character varying",
    "'" + requestValues.patientLastName + "'::character varying",
    "'" + requestValues.patientBornDate + "'::DATE",
    requestValues.status
  ];
  
  // res.json(queryOptions)
  await DB.call("update_appointment", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "Cita agregada exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(401)
        .json({ status: "error", message: "Ah ocurrido un error!! " });
    });

});

/**
 * metodo Eiminar usuario
 *
 *
 */
user.delete(async (_req, res) => {
  await res.json("delete an user");
});
export default user.router();
