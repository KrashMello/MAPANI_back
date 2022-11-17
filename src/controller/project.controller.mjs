import Project from "#Models/project";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Project();

/**
 * metodo optener usuario
 *
 *
 */
function socketRoutes(socket){
  model.io(socket,(socket)=>{
      socket.on("getMessage",async (msj)=>{
        msj = await DB.select("*", "view_users")
        socket.emit('getMessage',msj)
      })
  })
}
/**
 * metodo crear usuario
 *
 *
 */
model.created(async (_req, res) => {
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

  let requestValues = _req.body.params;
  let queryOptions = [
    "'" + requestValues.name + "'::character varying",
    "'" + requestValues.acronym + "'::character varying",
    "'" + requestValues.startDate + "'::DATE",
    "'" + requestValues.dueDate + "'::DATE",
    "'" + requestValues.minYearsOlds + "'::character varying",
    "'" + requestValues.maxYearsOlds + "'::character varying",
    "'" + requestValues.fromDay + "'::character",
    "'" + requestValues.toDay + "'::character",
    requestValues.oneDay,
  ];
  
  // res.json(queryOptions)
  await DB.call("add_project", queryOptions.toString())
    .then((response) => {
      res
        .status(200)
        .json({ status: "success", message: "proyecto agregado exitosamente" });
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
let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
