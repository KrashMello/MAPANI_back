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

  // CALL public.add_employed(
  // : _user_personal_data_code character varying,
  // : _job_position_code character varying,
  // : _departament_code character varying,
  // : _date_of_entry date,
  // : _date_of_discharge date,
  // : _userpersonaldatafirstname charater varying,
  // : _userpersonaldatalastname character varying,
  // : _userpersonaldatagendercode character varying,
  // : _usepersonaldatadocumenttypecode character varying,
  // : _userpersonaldatadin character varying,
  // : _userpersonaldataborndate date,
  // : _userpersonaldatamartialstatuscode character varying,
  // : _userpersonaldatadisability boolean,
  // : _userpersonaldatadisabilitytypecode character varying,
  // : _userpersonaldataethnicgroup boolean,
  // : _userpersonaldataethnicdesciption character varying,
  // : _userpersonaldatadirection character varying,
  // : _userpersonaldataphonenumber character varying);


  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.personalDataCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataCode}'::character varying`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'${requestValues.dateOfEntry}'::DATE`,
    `'${requestValues.dateOfDischarge}'::DATE`,
    requestValues.firstName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataFirstName}'::character varying`,
    requestValues.lastName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataLastName}'::character varying`,
    requestValues.genderCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataGenderCode}'::character varying`,
    requestValues.documentTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDocumentTypeCode}'::character varying`,
    requestValues.dni === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDni}'::character varying`,
    requestValues.bornDate=== null ? `NULL::DATE` : `'${requestValues.userPersonalDataBornDate}'::DATE`,
    requestValues.martialStausCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataBornDate}'::character varying`,
    requestValues.disability === null ? `NULL::boolean` : `'${requestValues.userPersonalDataMartialStausCode}'::character varying`,
    requestValues.disabilityTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDisabilityTypeCode}'::character varying`,
    requestValues.ethnicGroup === null ? `NULL::BOOLEAN` : `'${requestValues.userPersonalDataEthnicGroup}'::BOOLEAN`,
    requestValues.ethnicDescription === null ? `NULL::character varying` : `'${requestValues.userPersonalDataEthnicDescription}'::character varying`,
    requestValues.parrishCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataParrishCode}'::character varying`,
    requestValues.direction === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDirection}'::character varying`,
    requestValues.phoneNumber === null ? `NULL::character varying` : `'${requestValues.userPersonalDataPhoneNumber}'::character varying`,
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
// public.udate_employed(
// _userPersonalDataCode character varying,
// _employedCode character varying,
// _job_position_code character varying,
// _departament_code character varying,
// _date_of_entry date,
// _date_of_discharge date,
// _userpersonaldatafirstname character varying,
// _userpersonaldatalastname character varying,
// _userpersonaldatagendercode character varying,
// _usepersonaldatadocumenttypecode character varying,
// _userpersonaldatadin character varying,
// _userpersonaldataborndate date,
// _userpersonaldatamartialstatuscode character varying,
// _userpersonaldatadisability boolean,
// _userpersonaldatadisabilitytypecode character varying,
// _userpersonaldataethnicgroup boolean,
// _userpersonaldataethnicdesciption character varying,
// _userpersonaldatadirection character varying,
// _userpersonaldataphonenumber character varying)

  
  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.personalDataCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataCode}'::character varying`,
    `'${requestValues.employedCode}'::character varying`, 
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'${requestValues.dateOfEntry}'::DATE`,
    `'${requestValues.dateOfDischarge}'::DATE`,
    requestValues.firstName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataFirstName}'::character varying`,
    requestValues.lastName === null ? `NULL::character varying` : `'${requestValues.userPersonalDataLastName}'::character varying`,
    requestValues.genderCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataGenderCode}'::character varying`,
    requestValues.documentTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDocumentTypeCode}'::character varying`,
    requestValues.dni === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDni}'::character varying`,
    requestValues.bornDate=== null ? `NULL::DATE` : `'${requestValues.userPersonalDataBornDate}'::DATE`,
    requestValues.martialStausCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataBornDate}'::character varying`,
    requestValues.disability === null ? `NULL::boolean` : `'${requestValues.userPersonalDataMartialStausCode}'::character varying`,
    requestValues.disabilityTypeCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDisabilityTypeCode}'::character varying`,
    requestValues.ethnicGroup === null ? `NULL::BOOLEAN` : `'${requestValues.userPersonalDataEthnicGroup}'::BOOLEAN`,
    requestValues.ethnicDescription === null ? `NULL::character varying` : `'${requestValues.userPersonalDataEthnicDescription}'::character varying`,
    requestValues.parrishCode === null ? `NULL::character varying` : `'${requestValues.userPersonalDataParrishCode}'::character varying`,
    requestValues.direction === null ? `NULL::character varying` : `'${requestValues.userPersonalDataDirection}'::character varying`,
    requestValues.phoneNumber === null ? `NULL::character varying` : `'${requestValues.userPersonalDataPhoneNumber}'::character varying`,
  ];
  
  // console.log(queryOptions)
  await DB.call("update_employed", queryOptions.toString())
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
