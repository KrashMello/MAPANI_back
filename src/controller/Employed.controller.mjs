import Employed from "#Models/Employed";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Employed();

/**
 * metodo optener usuario
 *
 *
 */
function socketRoutes(io,socket){
  model.io(socket,async (socket)=>{
    let searchOption = {
      employedCode : '',
      jopPositionCode: '',
      departamentCode : '',
      dateOfEntry : '',
      dateOfDischarge : '',
      dni : '',
      parrishCode : '',
      municipalityCode : '',
      stadeCode : '',
    }
      socket.on("getEmployed",async (resp)=>{
        resp = await DB.select("*", "view_Employed")
        socket.emit('getEmployed',resp)
      })
      socket.on("searchEmployed",(data) =>{
        searchOption = data
      })
      setInterval(async () => {
        await DB.select("*", "view_employed",`"employedCode" like '%${searchOption.employedCode}%' and "jopPositionCode" like '%${searchOption.jopPositionCode}%' and "departamentCode" like '%${searchOption.departamentCode}%' and "dateOfEntry"::character varying like '%${searchOption.dateOfEntry}%' and "dateOfDischarge"::character varying like '%${searchOption.dateOfDischarge}%' and "dni" like '%${searchOption.dni}%' and "parrishCode" like '%${searchOption.parrishCode}%' and "stadeCode" like '%${searchOption.stadeCode}%' and "municipalityCode" like '%${searchOption.municipalityCode}%'`).then(re =>{
        io.to(socket.id).emit("getEmployeds",re)  
      })
      }, 10000);
      
  })
}

/**
 * metodo crear usuario
 *
 *
 */
model.created(async (_req, res) => {
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
    requestValues.userPersonalDataCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataCode}'::character varying`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'${requestValues.dateOfEntry}'::DATE`,
    `'${requestValues.dateOfDischarge}'::DATE`,
    requestValues.userPersonalDataFirstName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataFirstName}'::character varying`,
    requestValues.userPersonalDataLastName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataLastName}'::character varying`,
    requestValues.userPersonalDataGenderCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataGenderCode}'::character varying`,
    requestValues.userPersonalDataDocumentTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDocumentTypeCode}'::character varying`,
    requestValues.userPersonalDataDni === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDni}'::character varying`,
    requestValues.userPersonalDataBornDate=== null ? `NULL::DATE` : `'${requestValues.userPersonalDataBornDate}'::DATE`,
    requestValues.userPersonalDataMartialStausCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataBornDate}'::character varying`,
    requestValues.userPersonalDataDisability === null ? `NULL::boolean` : `'${requestValues.userPersonalDataMartialStausCode}'::character varying`,
    requestValues.userPersonalDataDisabilityTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDisabilityTypeCode}'::character varying`,
    requestValues.userPersonalDataEthnicGroup === null ? `NULL::BOOLEAN` : `'${requestValues.userPersonalDataEthnicGroup}'::BOOLEAN`,
    requestValues.userPersonalDataEthnicDescription === null ? `NULL::character varying` : `'${requestValues.userPersonalDataEthnicDescription}'::character varying`,
    requestValues.userPersonalDataParrishCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataParrishCode}'::character varying`,
    requestValues.userPersonalDataDirection === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDirection}'::character varying`,
    requestValues.userPersonalDataPhoneNumber === null ? `NULL::character varying` : `'${requestValues.userPersonalDataPhoneNumber}'::character varying`,
  ];
  // console.log(requestValues)
  // console.log(queryOptions)
  await DB.call("add_employed", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: 0, message: "Empleado agregado exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ status: 1, message: "Ah ocurrido un error!! " });
    });
});

/**
 * metodo Actualizar usuario
 *
 *
 */
model.updated(async (_req, res) => {
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
    "'" + requestValues.projectCode + "'::character varying",
    "'" + requestValues.appointmentDate + "'::DATE",
    requestValues.pediatrics,
    requestValues.nutritionist,
    requestValues.psychiatry,
    requestValues.breastfeedingAdvice,
    requestValues.advocacy,
    requestValues.socialPsychology,
    requestValues.clinicalPsychology,
    requestValues.clinicHistoryCode === null ? "NULL::character varying" : "'" + requestValues.clinicHistroryCode + "'::character varying",
    "'" + requestValues.representativeFirstName + "'::character varying",
    "'" + requestValues.representativeLastName + "'::character varying",
    "'" + requestValues.representativeNumberPhone + "'::character varying",
    "'" + requestValues.representativeDirection + "'::character varying",
    "'" + requestValues.patientFirstName + "'::character varying",
    "'" + requestValues.patientLastName + "'::character varying",
    "'" + requestValues.patientBornDate + "'::DATE",
    requestValues.status
  ];
  
  // console.log(queryOptions)
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
model.delete(async (_req, res) => {
  await res.json("delete an model");
});
let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
