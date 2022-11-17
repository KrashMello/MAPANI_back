import Users from "#Models/users";
import Auth from "#Models/auth";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";

const DB = new dbpg();
const user = new Users();
const model = new Auth();

function socketRoutes(socket){
  model.io(socket,(socket)=>{
      socket.on("getMessage",async (msj)=>{
        msj = await DB.select("*", "view_users")
        socket.emit('getMessage',msj)
      })
  })
}


model.singIn(async (req, response) => {
  let validate = userRequestValidate.getResult(req.query);
  if (validate.status === "ok" && req.query.token) {
    let ip = req.header("x-forwarded-for") || req.ip;
    let userData;
    // search the existen of user

    userData = await user.findOne(req.query.username).then((res) => {
      return res;
    });
    delete userData.delete;
    console.log(userData);
    if (userData === undefined)
      return response.status(401).json({ message: "User not found" });
    // comparing password
    let passwordIsValid = bcrypt.compareSync(
      req.query.password,
      userData.password
    );
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return response.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    return response.status(200).json("todo correcto");
  } else if (validate.status === "error") {
    return response.status(401).json(validate);
  }
});

let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
