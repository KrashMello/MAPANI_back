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
// function socketRoutes(socket){
//   model.io(socket,(socket)=>{
//       socket.on("getMessage",async (msj)=>{
//         msj = await DB.select("*", "view_users")
//         socket.emit('getMessage',msj)
//       })
//   })
// }
model.get(async (req, resp) => {
  let searchOption = req.query;
  await DB.select(
    "*",
    "view_modules",
    `"code" like '%${searchOption.code}%' and "name" like '%${searchOption.name}%' and "unabled" = '${searchOption.unabled}'::boolean and coalesce("fatherCode",'')  like '%${searchOption.fatherCode}%'`
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
  //   call public.update_module(
  // _name character varying,
  // _src character varying,
  // _icon character varying,
  // _order int4,
  // _unabled boolean,
  // _has_children boolean,
  // _father_code character varying
  // )
  let requestValues = _req.body.params;
  let queryOptions = [
    `'${requestValues.name}'::character varying`,
    `'${requestValues.src}'::character varying`,
    `'${requestValues.icon}'::character varying`,
    `${requestValues.order}::int4`,
    `'${requestValues.unabled}'::boolean`,
    `'${requestValues.hasChildren}'::boolean`,
    !requestValues.fatherCode
      ? `NULL::character varying`
      : `'${requestValues.fatherCode}'::character varying`,
  ];
  // console.log(queryOptions);
  // return res.status(401).json("error");
  res.json(queryOptions);
  await DB.call("add_module", queryOptions.toString())
    .then(() => {
      return res
        .status(200)
        .json({ status: 0, message: "Modulo agregado exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(401)
        .json({ status: 1, message: "Ah ocurrido un error!! " });
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
    `'${requestValues.code}'::character varying`,
    `'${requestValues.name}'::character varying`,
    `'${requestValues.src}'::character varying`,
    `'${requestValues.icon}'::character varying`,
    `${requestValues.order}::int4`,
    `'${requestValues.unabled}'::boolean`,
    `'${requestValues.hasChildren}'::boolean`,
    !requestValues.fatherCode
      ? `NULL::character varying`
      : `'${requestValues.fatherCode}'::character varying`,
  ];
  // console.log(queryOptions);
  // return res.status(401).json("error");
  // res.json(queryOptions);
  await DB.call("update_module", queryOptions.toString())
    .then(() => {
      return res
        .status(200)
        .json({ status: 0, message: "Modulo Actualizado exitosamente" });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(401)
        .json({ status: 1, message: "Ah ocurrido un error!! " });
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
