import Module from "#Models/user_departament_permissions";
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
  let modules;
  let dbPermissions;
  let permissions = {
    modules: [],
    departamentCode: "",
    jobPositionCode: "",
    show: [],
    create: [],
    update: [],
    print: [],
    report: [],
  };

  await DB.select(`code,"name"`, "view_modules").then((re) => {
    modules = re.rows;
  });
  await DB.select(
    `"moduleCode","moduleName","show","create","update","print","report"`,
    "view_permissions",
    `"jobPositionCode" like '%${searchOption.jobPositionCode}%' and "departamentCode" like '%${searchOption.departamentCode}%'`
  ).then((re) => {
    dbPermissions = re.rows;
  });
  modules.forEach((mod, i) => {
    dbPermissions.forEach((v) => {
      if (
        mod.code === v.moduleCode &&
        searchOption.jobPositionCode &&
        searchOption.departamentCode
      ) {
        permissions.modules.push({ code: mod.code, name: mod.name });
        permissions.show.push(v.show);
        permissions.create.push(v.create);
        permissions.update.push(v.update);
        permissions.print.push(v.print);
        permissions.report.push(v.report);
      }
    });
    if (
      permissions.modules.length <= modules.length &&
      !permissions.modules[i]
    ) {
      permissions.modules.push({ code: mod.code, name: mod.name });
      permissions.show.push(false);
      permissions.create.push(false);
      permissions.update.push(false);
      permissions.print.push(false);
      permissions.report.push(false);
    }
  });
  permissions.departamentCode = searchOption.departamentCode;
  permissions.jobPositionCode = searchOption.jobPositionCode;
  return resp.status(200).json(permissions);
});
/**
 * metodo crear usuario
 *
 *
 */
model.created(async (_req, res) => {
  //   call public.add_permission_modules_by_departament(
  // _modules_codes character varying[],
  // _job_position_code character varying,
  // _departament_code character varying,
  // _show boolean[],
  // _create boolean[],
  // _update boolean[],
  // _print boolean[],
  // _report boolean[]
  // )
  let requestValues = _req.body.params;
  let queryOptions = [
    `'{${requestValues.modules
      .map((v) => {
        return `${v.code}`;
      })
      .toString()}}'::character varying[]`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'{${requestValues.show.toString()}}'::boolean[]`,
    `'{${requestValues.create.toString()}}'::boolean[]`,
    `'{${requestValues.update.toString()}}'::boolean[]`,
    `'{${requestValues.print.toString()}}'::boolean[]`,
    `'{${requestValues.report.toString()}}'::boolean[]`,
  ];
  // return res.status(200).json(queryOptions.toString());
  // console.log(queryOptions);
  // return res.status(401).json("error");
  // res.json(queryOptions);
  await DB.call(
    "add_permission_modules_by_departament",
    queryOptions.toString()
  )
    .then(() => {
      return res.status(200).json({
        status: 0,
        message: "Permisos por departamentos agregado exitosamente",
      });
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
  //   call public.add_permission_modules_by_departament(
  // _modules_codes character varying[],
  // _job_position_code character varying,
  // _departament_code character varying,
  // _show boolean[],
  // _create boolean[],
  // _update boolean[],
  // _print boolean[],
  // _report boolean[]
  // )
  let requestValues = _req.body.params;
  let queryOptions = [
    `'{${requestValues.modules
      .map((v) => {
        return `${v.code}`;
      })
      .toString()}}'::character varying[]`,
    `'${requestValues.jobPositionCode}'::character varying`,
    `'${requestValues.departamentCode}'::character varying`,
    `'{${requestValues.show.toString()}}'::boolean[]`,
    `'{${requestValues.create.toString()}}'::boolean[]`,
    `'{${requestValues.update.toString()}}'::boolean[]`,
    `'{${requestValues.print.toString()}}'::boolean[]`,
    `'{${requestValues.report.toString()}}'::boolean[]`,
  ];
  // return res.status(200).json(queryOptions.toString());
  // console.log(queryOptions);
  // return res.status(401).json("error");
  // res.json(queryOptions);
  await DB.call(
    "add_permission_modules_by_departament",
    queryOptions.toString()
  )
    .then(() => {
      return res.status(200).json({
        status: 0,
        message: "Permisos por departamentos actualizados exitosamente",
      });
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
