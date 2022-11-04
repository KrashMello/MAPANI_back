import Gender from "#Models/gender";
// import { modelRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
// import bcrypt from "bcrypt";

const DB = new dbpg();
const model = new Gender();

/**
 * metodo obtener generos
 *
 */
model.get(async (_req, res) => {
  await DB.select("*", "agender")
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

export default model.router();
