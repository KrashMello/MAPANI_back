import Users from "#Models/users";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Users();


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
 * metodo mostrar detalles del usuario
 *
 *
 */
model.showDetails((_req, res) => {
  let pass = bcrypt.hashSync('221948722',11)
  let scode = bcrypt.hashSync('asda',11) 
  res.type("json").json({ password: pass , secrectCode: scode});
});

/**
 * metodo crear usuario
 *
 *
 */
model.created(async (_req, response) => {
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
model.updated(async (_req, res) => {
  await res.json("update an user");
});

/**
 * metodo Eiminar usuario
 *
 *
 */
model.delete(async (_req, res) => {
  await res.json("delete an user");
});

let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
