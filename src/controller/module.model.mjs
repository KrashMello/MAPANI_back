import Module from "#Models/module";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Module();

/**
 * metodo optener usuario
 *
 *
 */
model.get(async (_req, res) => {
  await DB.select("*", "amodule")
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
// CALL public.add_module(
// 	<_name character varying>, 
// 	<_src character varying>, 
// 	<_icon character varying>, 
// 	<_unabled boolean>
// )
jj
  let requestValues = _req.body.params;
  let queryOptions = [
    "'" + requestValues.name + "'::character varying",
    "'" + requestValues.src + "'::character varying",
    "'" + requestValues.icon + "'::character varying",
    "'" + requestValues.unabled + "'::boolean",
  ];
  
  // res.json(queryOptions)
  await DB.call("add_module", queryOptions.toString())
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
