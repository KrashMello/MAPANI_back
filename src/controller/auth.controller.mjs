import Users from "#Models/users";
import Auth from "#Models/auth";
import Modules from "#Models/module";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

const DB = new dbpg();
const user = new Users();
const model = new Auth();
const modules = new Modules();

function socketRoutes(io,socket){
  model.io(socket,(socket)=>{
      socket.on("getMessage",async (msj)=>{
        msj = await DB.select("*", "view_users")
        socket.emit('getMessage',msj)
      })
    socket.on("verifyToken",async (token) =>{
        let permissions;
        let userData;
        await jsonwebtoken.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
          if (err) {
            return {status: 1, message: 'error'}
          }
          userData = await user.findOne(decoded.data.username);
          delete userData.password;
          delete userData.userSecurityCode;
          permissions = await modules.findUserModules(userData.roleCode,userData.jobPositionCode, userData.departamentCode);
        });
        socket.emit("verifyToken", {userData: userData , permissions: permissions})
    })
  })
}


model.singIn(async (req, response) => {
  const {username,password} = req.body.params
  let validate = userRequestValidate.getResult(req.body.params);
  if (validate.status === 0) {
    // let ip = req.header("x-forwarded-for") || req.ip;
    let userData;
    // search the existen of user

    userData = await user.findOne(username).then((res) => {
      return res;
    });
    if (userData === undefined)
      return response.status(401).json({ code: 1, message: "Usuario no encontrado" });
    // comparing password
    let passwordIsValid = bcrypt.compareSync(
      password,
      userData.password
    );
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return response.status(401).json({
        code: 1,
        message: "Clave invalida!",
      });
    }
    delete userData.password
    delete userData.userSecurityCode
    
    const token = jsonwebtoken.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),data:{username: userData.username}}, process.env.JWT_TOKEN)
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
