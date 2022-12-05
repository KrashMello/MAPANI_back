import Parrish from "#Models/parrish";
// import {  modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Parrish();

/**
 * metodo obtener generos
 *
 */
function socketRoutes(socket){
  user.io(socket,(socket)=>{
      // socket.on("getMessage",async (msj)=>{
      //   msj = await DB.select("*", "view_users")
      //   socket.emit('getMessage',msj)
      // })
  })
}

model.get(async (_req, res) => {
  let requestValues = _req.query;
  await DB.select("code,name", "view_parrish",`"municipalityCode" = '${requestValues.municipalityCode}'`)
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

let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
