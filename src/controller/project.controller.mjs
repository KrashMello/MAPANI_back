import Project from "#Models/project";
// import { modelRequestValidate } from "#Request/users";
import {
  projectRequestValidate,
  projectUpdateRequestValidate,
} from "#Request/project";
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
  let project = [];
  let sponsorsByProject;
  await DB.select(
    "*",
    "view_project",
    `"acronym" like '%${searchOption.acronym}%' and "name" like '%${searchOption.name}%' and "startDate"::character varying like '%${searchOption.startDate}%' and "dueDate"::character varying like '%${searchOption.dueDate}%' and "minYearsOld"::character varying like '%${searchOption.minYearsOld}%' and "maxYearsOld"::character varying like '%${searchOption.maxYearsOld}%' and "fromDay"::character like '%${searchOption.fromDay}%'::character and  "toDay"::character like '%${searchOption.toDay}%'::character`
  )
    .then((resp) => {
      project = resp.rows;
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ error: "ah ocurrido un error!!" });
    });
  await DB.select("*", "view_sponsor_by_project")
    .then((response) => {
      sponsorsByProject = response.rows;
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({ error: "Ah ocurrido un error!! " });
    });
  return res.status(200).json(
    project.map((v) => {
      v.sponsors = sponsorsByProject.filter((va) => va.projectCode === v.code);
      return v;
    })
  );
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
model.updated(async (req, res) => {
  //  CALL public.update_project(
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
  let validate = projectUpdateRequestValidate.getResult(req.body.params);
  if (!Object.values(validate).find((v) => v.status === 1)) {
    let requestValues = req.body.params;
    let queryOptions = [
      `'${requestValues.code}'::character varying`,
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
      `'{${requestValues.sponsors
        .map((v) => {
          return v.delete;
        })
        .toString()}}'::Boolean[]`,
    ];

    await DB.call("update_project", queryOptions.toString())
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
 * metodo Eiminar usuario
 *
 *
 */
model.delete(async (_req, res) => {
  await res.json("delete an model");
});
let apiRoutes = model.router();

export { apiRoutes };
