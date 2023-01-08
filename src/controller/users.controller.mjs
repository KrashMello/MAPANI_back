import Users from "#Models/users";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Users();

/**
 * metodo optener usuario
 *
 *
 */
// function socketRoutes(io, socket) {
//   model.io(socket, async (socket) => {
//     //   let searchOption = {
//     //     userCode: "",
//     //     roleCode: "",
//     //     statusCode: "",
//     //     email: "",
//     //     username: "",
//     //     dni: "",
//     //     parrishCode: "",
//     //     municipalityCode: "",
//     //     stadeCode: "",
//     //   };
//     //   let getInterval = null;
//     //   socket.on("searchUserPersonalData", async (data) => {
//     //   });
//   });
// }
model.searchUserPersonalData(async (req, resp) => {
  let data = req.query;
  await DB.select(
    "*",
    "view_user_personal_data",
    `"documentTypeCode" like '%${data.documentTypeCode}%' and "firstName" like '%${data.firstName}%' and "lastName" like '%${data.lastName}%' and dni like '%${data.dni}%'`
  ).then((re) => {
    return resp.status(200).json(re.rows);
  });
});

model.get(async (req, resp) => {
  let searchOption = req.query;
  await DB.select(
    "*",
    "view_users",
    `"code" like '%${searchOption.userCode}%' and "roleCode" like '%${searchOption.roleCode}%' and "statusCode" like '%${searchOption.statusCode}%' and "username" like '%${searchOption.username}%' and "email" like '%${searchOption.email}%' and "dni" like '%${searchOption.dni}%' and "parrishCode" like '%${searchOption.parrishCode}%' and "stadeCode" like '%${searchOption.stadeCode}%' and "municipalityCode" like '%${searchOption.municipalityCode}%'`
  ).then((re) => {
    let users = re.rows;
    users = users.map((value) => {
      value.password = "";
      value.userSecurityCode = "";
      return value;
    });
    return resp.status(200).json(users);
  });
});
/**
 * metodo crear usuario
 *
 *
 */
model.created(async (_req, res) => {
  //   CALL  public.add_user(
  // _user_personal_data_code character varying,
  // _username character varying,
  // _password character varying,
  // _email character varying,
  // _security_code character varying,
  // _status_code character varying,
  // _role_code character varying,
  // _first_name character varying,
  // _last_name character varying,
  // _gender_code character varying,
  // _document_type_code character varying,
  // _dni character varying,
  // _born_date date,
  // _martial_status_code character varying,
  // _disability boolean,
  // _disability_type_code character varying,
  // _ethnic_group boolean,
  // _ethnic_description character varying,
  // _parrish_code character varying,
  // _direction character varying,
  // _phone_number character varying
  // )

  let requestValues = _req.body.params;
  let queryOptions = [
    !requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.personalDataCode}'::character varying`,
    `'${requestValues.username}'::character varying`,
    `'${bcrypt.hashSync(requestValues.password, 11)}'::character varying`,
    `'${requestValues.email}'::character varying`,
    `'${bcrypt.hashSync(requestValues.securityCode, 11)}'::character varying`,
    `'${requestValues.statusCode}'::character varying`,
    `'${requestValues.roleCode}'::character varying`,
    !requestValues.firstName || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.firstName}'::character varying`,
    !requestValues.lastName || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.lastName}'::character varying`,
    !requestValues.genderCode || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.genderCode}'::character varying`,
    !requestValues.documentTypeCode || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.documentTypeCode}'::character varying`,
    !requestValues.dni || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.dni}'::character varying`,
    !requestValues.bornDate || requestValues.personalDataCode
      ? `null::date`
      : `'${requestValues.bornDate}'::Date`,
    !requestValues.martialStatusCode || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.martialStatusCode}'::character varying`,
    requestValues.disability === null || requestValues.personalDataCode
      ? `null::boolean`
      : `'${requestValues.disability}'::boolean`,
    !requestValues.disabilityTypeCode || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.disabilityTypeCode}'::character varying`,
    requestValues.ethnicGroup === null || requestValues.personalDataCode
      ? `null::boolean`
      : `'${requestValues.ethnicGroup}'::boolean`,
    !requestValues.ethnicDescription ||
    !requestValues.ethnicDescription === "undefined" ||
    !requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.ethnicDescription}'::character varying`,
    !requestValues.parrishCode || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.parrishCode}'::character varying`,
    !requestValues.direction || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.direction}'::character varying`,
    !requestValues.phoneNumber || requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.phoneNumber}'::character varying`,
  ];
  // console.log(queryOptions);
  // console.log(requestValues);
  // return res.status(401).json({});
  await DB.call("add_user", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: 0, message: "Usuario agregado exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ status: 1, message: "Ah ocurrido un error!! " });
    });
});

/**
 * metodo Actualizar usuario
 *
 *
 */
model.updated(async (_req, res) => {
  //  call public.update_user(
  // _user_personal_data_code character varying,
  // _user_code character varying,
  // _username character varying,
  // _password character varying,
  // _email character varying,
  // _security_code character varying,
  // _status_code character varying,
  // _role_code character varying,
  // _first_name character varying,
  // _last_name character varying,
  // _gender_code character varying,
  // _document_type_code character varying,
  // _dni character varying,
  // _born_date date,
  // _martial_status_code character varying,
  // _disability boolean,
  // _disability_type_code character varying,
  // _ethnic_group boolean,
  // _ethnic_description character varying,
  // _parrish_code character varying,
  // _direction character varying,
  // _phone_number character varying)

  let requestValues = _req.body.params;
  let queryOptions = [
    !requestValues.personalDataCode
      ? `null::character varying`
      : `'${requestValues.personalDataCode}'::character varying`,
    `'${requestValues.userCode}'::character varying`,
    `'${requestValues.username}'::character varying`,
    !requestValues.password
      ? `null::character varying`
      : `'${bcrypt.hashSync(requestValues.password, 11)}'::character varying`,
    `'${requestValues.email}'::character varying`,
    !requestValues.securityCode
      ? `null::character varying`
      : `'${bcrypt.hashSync(
          requestValues.securityCode,
          11
        )}'::character varying`,
    `'${requestValues.statusCode}'::character varying`,
    `'${requestValues.roleCode}'::character varying`,
    !requestValues.firstName
      ? `null::character varying`
      : `'${requestValues.firstName}'::character varying`,
    !requestValues.lastName
      ? `null::character varying`
      : `'${requestValues.lastName}'::character varying`,
    !requestValues.genderCode
      ? `null::character varying`
      : `'${requestValues.genderCode}'::character varying`,
    !requestValues.documentTypeCode
      ? `null::character varying`
      : `'${requestValues.documentTypeCode}'::character varying`,
    !requestValues.dni
      ? `null::character varying`
      : `'${requestValues.dni}'::character varying`,
    !requestValues.bornDate
      ? `null::date`
      : `'${requestValues.bornDate}'::Date`,
    !requestValues.martialStatusCode
      ? `null::character varying`
      : `'${requestValues.martialStatusCode}'::character varying`,
    `'${requestValues.disability}'::boolean`,
    !requestValues.disabilityTypeCode
      ? `null::character varying`
      : `'${requestValues.disabilityTypeCode}'::character varying`,
    `'${requestValues.ethnicGroup}'::boolean`,
    !requestValues.ethnicDescription
      ? `null::character varying`
      : `'${requestValues.ethnicDescription}'::character varying`,
    !requestValues.parrishCode
      ? `null::character varying`
      : `'${requestValues.parrishCode}'::character varying`,
    !requestValues.direction
      ? `null::character varying`
      : `'${requestValues.direction}'::character varying`,
    !requestValues.phoneNumber
      ? `null::character varying`
      : `'${requestValues.phoneNumber}'::character varying`,
  ];
  // console.log(queryOptions);
  // return res.status(401).json({});
  await DB.call("update_user", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: 0, message: "Usuario Actualizado exitosamente" });
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
  await res.json("delete an user");
});

let apiRoutes = model.router();

export { apiRoutes };
