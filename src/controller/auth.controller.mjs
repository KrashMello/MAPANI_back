import Users from "#Models/users";
import Auth from "#Models/auth";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

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
  const {username,password} = req.body.params
  console.log(`${username}: ${password}`)
  let validate = userRequestValidate.getResult(req.body.params);
  console.log(validate)
  if (validate.status === "ok") {
    // let ip = req.header("x-forwarded-for") || req.ip;
    let userData;
    // search the existen of user

    userData = await user.findOne(username).then((res) => {
      return res;
    });
    if (userData === undefined)
      return response.status(401).json({ code: 1, message: "User not found" });
    // comparing password
    let passwordIsValid = bcrypt.compareSync(
      password,
      userData.password
    );
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return response.status(401).send({
        code: 1,
        message: "Invalid Password!",
      });
    }
    const token = jsonwebtoken.sign({username: username}, process.env.JWT_TOKEN)
    return response.status(200).json({token: token});
  } else if (validate.status === "error") {
    return response.status(401).json(validate);
  }
});

let apiRoutes = model.router()

export {
  apiRoutes,
  socketRoutes
}
