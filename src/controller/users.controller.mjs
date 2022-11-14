import Users from "#Models/users";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";

const DB = new dbpg();
const user = new Users();

/**
 * metodo optener usuario
 *
 *
 */
user.get((_req, res) => {
  await DB.select("*", "view_users")
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
 * metodo mostrar detalles del usuario
 *
 *
 */
user.showDetails((_req, res) => {
  res.type("json").json({ name: "joel", nickname: "krashmello" });
});

/**
 * metodo crear usuario
 *
 *
 */
user.created(async (_req, response) => {
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
  await DB.call("add_user", queryOptions.toString())
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
