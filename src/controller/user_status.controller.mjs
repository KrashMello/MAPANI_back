import UserStatus from "#Models/user_status";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new UserStatus();

/**
 * metodo obtener generos
 *
 */
// function socketRoutes(socket) {
//   user.io(socket, (socket) => {
//     // socket.on("getMessage",async (msj)=>{
//     //   msj = await DB.select("*", "view_users")
//     //   socket.emit('getMessage',msj)
//     // })
//   });
// }

model.get(async (_req, res) => {
  await DB.select("*", "view_user_status")
    .then((response) => {
      return res.status(200).json(response.rows);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({ error: "Ah ocurrido un error!! " });
    });
});

let apiRoutes = model.router();

export { apiRoutes };