import Patient from "#Models/patient";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Patient();

/**
 * metodo optener usuario
 *
 *
 */
model.get(async (_req, res) => {
  await DB.select("*", "apatient")
    .then((response) => {
      res.json(
          response.rows.map(value =>{
            value.disabilityTypes = {
            motor: value.motor,
            visual: value.visual,
            cognitive: value.cognitive,
            auditive: value.auditive,
        }
        delete value.motor
        delete value.visual
        delete value.cognitive
        delete value.auditive

        return value
        })
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
model.created(async (_req, res) => {

// CALL public.add_patient(
// 	<_code character varying>, 
// 	<"_firstName" character varying>, 
// 	<"_lastName" character varying>, 
// 	<_born_date date>, 
// 	<_gender_code character varying>>, 
// 	<_birt_certificate boolean>, 
// 	<_disability boolean>, 
// 	<_disability_type character varying[]>
// )

  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.code !== null ? "'" + requestValues.code + "'::character varying" : "NULL::character varying",
    "'" + requestValues.firstName + "'::character varying",
    "'" + requestValues.lastName + "'::character varying",
    "'" + requestValues.bornDate + "'::DATE",
    "'" + requestValues.genderCode + "'::character varying",
    requestValues.birthCertificate + "::boolean",
    requestValues.disability + "::boolean",
    requestValues.disabilityTypes.motor + "::boolean",
    requestValues.disabilityTypes.visual + "::boolean",
    requestValues.disabilityTypes.cognitive + "::boolean",
    requestValues.disabilityTypes.auditive + "::boolean",
  ];
  await DB.call("add_patient", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "paciente agregado exitosamente" });
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
model.updated(async (_req, res) => {
  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.code !== null ? "'" + requestValues.code + "'::character varying" : "NULL::character varying",
    "'" + requestValues.firstName + "'::character varying",
    "'" + requestValues.lastName + "'::character varying",
    "'" + requestValues.bornDate + "'::DATE",
    "'" + requestValues.genderCode + "'::character varying",
    requestValues.birthCertificate + "::boolean",
    requestValues.disability + "::boolean",
    requestValues.disabilityTypes.motor + "::boolean",
    requestValues.disabilityTypes.visual + "::boolean",
    requestValues.disabilityTypes.cognitive + "::boolean",
    requestValues.disabilityTypes.auditive + "::boolean",
  ];
  await DB.call("update_patient", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "paciente actualizado exitosamente" });
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
export default model.router();
