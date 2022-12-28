import Project from "#Models/project";
// import { modelRequestValidate } from "#Request/users";
import { projectRequestValidate } from "#Request/project";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Project();

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
/**
 * metodo crear usuario
 *
 *
 */
model.get(async (req, res) => {
  let searchOption = req.query;
  await DB.select(
    "*",
    "view_project",
    `"acronym" like '%${searchOption.acronym}%' and "name" like '%${searchOption.name}%' and "startDate"::text like '%${searchOption.startDate}%' and "dueDate"::text like '${searchOption.dueDate}' and "minYearsOld"::text like '%${searchOption.minYearsOld}%' and "maxYearsOld"::text like '%${searchOption.maxYearsOld}%' and "fromDay" like '%${searchOption.fromDay}%' and  "toDay" like '%${searchOption.toDay}%'`
  )
    .then((resp) => {
      res.status(200).json(resp.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

model.created(async (req, res) => {
  //  CALL public.add_project(
  // 	<_name character varying>,
  // 	<_acronym character varying>,
  // 	<"_startDate" date>,
  // 	<"_dueDate" date>,
  // 	<"_minYearsOlds" character varying>,
  // 	<"_maxYearsOlds" character varying>,
  // 	<"_fromDay" character>,
  // 	<"_toDay" character>,
  // 	<"_oneDay" boolean>
  // )
  let validate = projectRequestValidate.getResult(req.body.params);
  if (!Object.values(validate).find((v) => v.status === 1)) {
    let requestValues = req.body.params;
    let queryOptions = [
      `'${requestValues.name}'::character varying`,
      `'${requestValues.acronym}'::character varying`,
      `'${requestValues.startDate}'::DATE`,
      `'${requestValues.dueDate}'::DATE`,
      `'${requestValues.minYearsOld}'::character varying`,
      `'${requestValues.maxYearsOld}'::character varying`,
      `'${requestValues.fromDay}'::character`,
      `'${requestValues.toDay}'::character`,
      `'${requestValues.isJustOneDay}'::boolean`,
      `'{${requestValues.sponsors
        .map((v) => {
          return v.code;
        })
        .toString()}}'::character varying[]`,
    ];

    await DB.call("add_project", queryOptions.toString())
      .then((response) => {
        res.status(200).json({
          status: 0,
          message: "proyecto agregado exitosamente",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ status: 1, message: "Ah ocurrido un error!! " });
      });
  } else {
    return res.status(401).json(validate);
  }
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
let apiRoutes = model.router();

export { apiRoutes };
