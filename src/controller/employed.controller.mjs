import Employed from "#Models/employed";
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

model.get(async (req, resp) => {
  let searchOption = req.query;
  await DB.select(
    "*",
    "view_employed",
    ` "jobPositionCode" like '%${searchOption.jobPositionCode}%' and "departamentCode" like '%${searchOption.departamentCode}%' and "dateOfEntry"::character varying like '%${searchOption.dateOfEntry}%'::character varying and "dateOfDischarge" is null or "dateOfDischarge"::character varying like '%${searchOption.dateOfDischarge}%'::character varying and "dni" like '%${searchOption.dni}%' and "parrishCode" like '%${searchOption.parrishCode}%' and "stadeCode" like '%${searchOption.stadeCode}%' and "municipalityCode" like '%${searchOption.municipalityCode}%'`
  ).then((re) => {
    return resp.status(200).json(re.rows);
  });
});

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
    !requestValues.personalDataCode
      ? `NULL::character varying`
      : `'${requestValues.personalDataCode}'::character varying`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'${requestValues.dateOfEntry}'::DATE`,
    !requestValues.dateOfDischarge
      ? `NULL::date`
      : `'${requestValues.dateOfDischarge}'::DATE`,
    !requestValues.firstName
      ? `NULL::character varying`
      : `'${requestValues.firstName}'::character varying`,
    !requestValues.lastName
      ? `NULL::character varying`
      : `'${requestValues.lastName}'::character varying`,
    !requestValues.genderCode
      ? `NULL::character varying`
      : `'${requestValues.genderCode}'::character varying`,
    !requestValues.documentTypeCode
      ? `NULL::character varying`
      : `'${requestValues.documentTypeCode}'::character varying`,
    !requestValues.dni
      ? `NULL::character varying`
      : `'${requestValues.dni}'::character varying`,
    !requestValues.bornDate
      ? `NULL::DATE`
      : `'${requestValues.bornDate}'::DATE`,
    !requestValues.martialStatusCode
      ? `NULL::character varying`
      : `'${requestValues.martialStatusCode}'::character varying`,
    `${requestValues.disability}::BOOLEAN`,
    !requestValues.disabilityTypeCode
      ? `NULL::character varying`
      : `'${requestValues.disabilityTypeCode}'::character varying`,
    `${requestValues.ethnicGroup}::BOOLEAN`,
    !requestValues.ethnicDescription
      ? `NULL::character varying`
      : `'${requestValues.ethnicDescription}'::character varying`,
    !requestValues.parrishCode
      ? `NULL::character varying`
      : `'${requestValues.parrishCode}'::character varying`,
    !requestValues.direction
      ? `NULL::character varying`
      : `'${requestValues.direction}'::character varying`,
    !requestValues.numberPhone
      ? `NULL::character varying`
      : `'${requestValues.numberPhone}'::character varying`,
  ];
  // console.log(requestValues);
  // console.log(queryOptions);
  await DB.call("add_employed", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: 0, message: "Empleado agregado exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ status: 1, message: "Ah ocurrido un error!! " });
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
    `'${requestValues.personalDataCode}'::character varying`,
    `'${requestValues.employedCode}'::character varying`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'${requestValues.dateOfEntry}'::DATE`,
    !requestValues.dateOfDischarge
      ? `NULL::date`
      : `'${requestValues.dateOfDischarge}'::DATE`,
    `'${requestValues.firstName}'::character varying`,
    `'${requestValues.lastName}'::character varying`,
    `'${requestValues.genderCode}'::character varying`,
    `'${requestValues.documentTypeCode}'::character varying`,
    `'${requestValues.dni}'::character varying`,
    `'${requestValues.bornDate}'::DATE`,
    `'${requestValues.martialStatusCode}'::character varying`,
    `'${requestValues.disability}'::BOOLEAN`,
    !requestValues.disabilityTypeCode
      ? `null::character varying`
      : `'${requestValues.disabilityTypeCode}'::character varying`,
    `'${requestValues.ethnicGroup}'::BOOLEAN`,
    `'${requestValues.ethnicDescription}'::character varying`,
    `'${requestValues.parrishCode}'::character varying`,
    `'${requestValues.direction}'::character varying`,
    `'${requestValues.numberPhone}'::character varying`,
  ];

  // console.log(queryOptions)
  await DB.call("update_employed", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: 0, message: "Cita agregada exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ status: 1, message: "Ah ocurrido un error!! " });
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
let apiRoutes = model.router();

export { apiRoutes };
