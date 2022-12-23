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
// function socketRoutes(socket){
//   model.io(socket,(socket)=>{
//       socket.on("getMessage",async (msj)=>{
//         msj = await DB.select("*", "view_users")
//         socket.emit('getMessage',msj)
//       })
//   })
// }

model.get(async (req, res) => {
  let searchOptions = req.query;
  await DB.select(
    "*",
    "view_sponsor",
    `"documentTypeCode" like '%${searchOptions.documentTypeCode}%' and "rif" like '%${searchOptions.rif}%' and "name" like '%${searchOptions.name}%' and "email" like '%${searchOptions.email}%'`
  )
    .then((response) => {
      return res.status(200).json(response.rows);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({ error: "Ah ocurrido un error!! " });
    });
});

/**
 * metodo crear usuario
 *
 *
 */
model.created(async (req, res) => {
  // CALL public.add_sponsor(
  // 	<_name character varying>,
  // 	<_contac_number character varying>,
  // 	<_email character varying>,
  // 	<_document_type_code character varying>,
  // 	<_rif character varying>
  // )

  let requestValues = req.body.params;
  let queryOptions = [
    `'${requestValues.name}'::character varying`,
    `'${requestValues.contactNumber}'::character varying`,
    `'${requestValues.email}'::character varying`,
    `'${requestValues.documentTypeCode}'::character varying`,
    `'${requestValues.rif}'::character varying`,
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
model.updated(async (req, res) => {
  // CALL public.update_sponsor(
  // 	<_code character varying>,
  // 	<_name character varying>,
  // 	<_contac_number character varying>,
  // 	<_email character varying>,
  // 	<_document_type_code character varying>,
  // 	<_rif character varying>
  // )

  let requestValues = req.body.params;
  let queryOptions = [
    `'${requestValues.code}'::character varying`,
    `'${requestValues.name}'::character varying`,
    `'${requestValues.contactNumber}'::character varying`,
    `'${requestValues.email}'::character varying`,
    `'${requestValues.documentTypeCode}'::character varying`,
    `'${requestValues.rif}'::character varying`,
  ];

  // res.json(queryOptions)
  await DB.call("update_sponsor", queryOptions.toString())
    .then((response) => {
      res.status(200).json({
        status: "success",
        message: "sponsor actualizado exitosamente",
      });
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
let apiRoutes = model.router();

export { apiRoutes };
