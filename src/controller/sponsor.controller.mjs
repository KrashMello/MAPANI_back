import Sponsor from "#Models/sponsor";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Sponsor();

/**
 * metodo optener usuario
 *
 *
 */
model.get(async (_req, res) => {
  await DB.select("*", "asponsor")
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
model.created(async (_req, res) => {
// CALL public.add_sponsor(
// 	<_code character varying>, 
// 	<_name character varying>, 
// 	<_contac_number character varying>, 
// 	<_email character varying>
// )

  let requestValues = _req.body.params;
  let queryOptions = [
    "'" + requestValues.code + "'::character varying",
    "'" + requestValues.name + "'::character varying",
    "'" + requestValues.contacNumber + "'::character varying",
    "'" + requestValues.email + "'::character varying",
    requestValues.oneDay,
  ];
  
  // res.json(queryOptions)
  await DB.call("add_sponsor", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "sponsor agregado exitosamente" });
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
  await res.json("update an model");
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
