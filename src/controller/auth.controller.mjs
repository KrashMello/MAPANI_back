import Users from "#Models/users";
import Auth from "#Models/auth";
import Modules from "#Models/module";
import { userRequestValidate } from "#Request/users";
import dbpg from "#Class/database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const DB = new dbpg();
const user = new Users();
const model = new Auth();
const modules = new Modules();

// function socketRoutes(io, socket) {
//   model.io(socket, (socket) => {
//     socket.on("verifyToken", async (token) => {
//       let permissions;
//       let userData;
//       let errors = false;
//       if (
//         user.getSingUpUsers().filter((v) => v.token === token) &&
//         user.getSingUpUsers().filter((v) => v.socketID === null)
//       )
//         user.setRegisterUsers(
//           user.getSingUpUsers().map((value) => {
//             if (value.token === token && value.socketID === null)
//               value.socketID = socket.id;
//             return value;
//           })
//         );
//       if (user.getSingUpUsers().filter((v) => v.token === token))
//         try {
//           jsonwebtoken.verify(token, process.env.JWT_TOKEN);
//           userData = await user.findOne(
//             user.getSingUpUsers().filter((v) => v.token === token)[0].username
//           );
//           delete userData.userSecurityCode;
//           delete userData.password;
//           permissions = await modules.findUserModules(
//             userData.roleCode,
//             userData.jobPositionCode,
//             userData.departamentCode
//           );
//           io.to(socket.id).emit("getUserData", {
//             userData: userData,
//             permissions: permissions,
//           });
//         } catch (err) {
//           console.log(err);
//           user.setRegisterUsers(
//             user.getSingUpUsers().splice(
//               user.getSingUpUsers().findIndex((v) => v.token === token),
//               1
//             )
//           );
//         }
//       io.to(socket.id).emit("verifyToken", errors);
//     });
//   });
// }
model.getUserData(async (req, resp) => {
  let permissions;
  let userData;
  jsonwebtoken.verify(
    req.body.params.token,
    process.env.JWT_TOKEN,
    async (err, decode) => {
      if (err) {
        return resp.status(401).json(err);
      }

      userData = await user.findOne(decode.data.username);
      delete userData.userSecurityCode;
      delete userData.password;
      permissions = await modules.findUserModules(
        userData.roleCode,
        userData.jobPositionCode,
        userData.departamentCode
      );
      return resp.status(200).json({ userData, permissions });
    }
  );
});

model.singIn(async (req, response) => {
  const { username, password } = req.body.params;
  let validate = userRequestValidate.getResult(req.body.params);
  if (!Object.values(validate).find((v) => v.status === 1)) {
    // let ip = req.header("x-forwarded-for") || req.ip;
    let userData;
    // search the existen of user

    userData = await user.findOne(username).then((res) => {
      return res;
    });
    if (userData === undefined)
      return response
        .status(401)
        .json({ code: 1, message: "Usuario no encontrado" });
    // comparing password
    let passwordIsValid = bcrypt.compareSync(password, userData.password);
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return response.status(401).json({
        code: 1,
        message: "Clave invalida!",
      });
    }
    delete userData.password;
    delete userData.userSecurityCode;

    const token = jsonwebtoken.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { username: userData.username },
      },
      process.env.JWT_TOKEN
    );
    return response.status(200).json({ token: token });
  } else {
    return response.status(401).json(validate);
  }
});

let apiRoutes = model.router();

export { apiRoutes };
