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
  /**
   * CALL public.addappointment(
   * <_pediatrics boolean>,
   * <_nutritionist boolean>,
   * <_psychiatry boolean>,
   * <_breastfeeding_advice boolean>,
   * <_def boolean>,
   * <"_representative_firstName" character varying>,
   * <"_representative_lastName" character varying>,
   * <"_representative_numberPhone" character varying>,
   * <_representative_direction character varying>,
   * <"_patient_firstName" character varying>,
   * <"_patient_lastName" character varying>,
   * <"_patient_bornDate" date>
   * )
   */

  let requestValues = _req.body.params;
  let queryOptions = [
    requestValues.pediatrics,
    requestValues.nutritionist,
    requestValues.psychiatry,
    requestValues.breastfeedingAdvice,
    requestValues.def,
    "'" + requestValues.representativeFirstName + "'::character varying",
    "'" + requestValues.representativeLastName + "'::character varying",
    "'" + requestValues.representativeNumberPhone + "'::character varying",
    "'" + requestValues.representativeDirection + "'::character varying",
    "'" + requestValues.patientFirstName + "'::character varying",
    "'" + requestValues.patientLastName + "'::character varying",
    "'" + requestValues.patientBornDate + "'::DATE",
  ];
  
  // res.json(queryOptions)
  await DB.call("addappointment", queryOptions.toString())
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
  await res.json("update an user");
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
