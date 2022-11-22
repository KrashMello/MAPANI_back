import receptionAgenga from "#Models/receptionAgenda";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new receptionAgenga();

/**
 * metodo optener usuario
 *
 *
 */
function socketRoutes(io,socket){
  model.io(socket,async (socket)=>{
    let searchOption = {
      code : '',
      representativeFirstName: '',
      representativeLastName : '',
      patientFirstName: '',
      patientLastName: '',
      appointmentDate: '',
    }
      socket.on("getAppointment",async (resp)=>{
        resp = await DB.select("*", "view_appointment")
        socket.emit('getAppointment',resp)
      })
      socket.on("searchAppointment",(data) =>{
        searchOption = data
      })
      setInterval(async () => {
        await DB.select("*", "view_appointment",`code like '%${searchOption.code}%' and "representativeFirstName" like '%${searchOption.representativeFirstName}%' and "representativeLastName" like '%${searchOption.representativeLastName}%' and "patientFirstName" like '%${searchOption.patientFirstName}%' and "patientLastName" like '%${searchOption.patientLastName}%' and "patientBornDate"::character varying like '%${searchOption.appointmentDate}%'`).then(re =>{
        io.to(socket.id).emit("getAppointments",re)
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
  ];
  // console.log(requestValues)
  // console.log(queryOptions)
  await DB.call("add_appointment", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "Cita agregada exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ status: "error", message: "Ah ocurrido un error!! " });
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
