import { Controller, Post } from "@Controller/decorators";
import { User } from "@src/models/user/user.model";
import { Modules } from "@src/models/modules/modules.model";
import { Request, Response } from "express";
import { AuthValidate } from "./request.validatorRequest";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { decodedJWT, userData } from "./types";

@Controller("/Auth")
export class Auth {
  private user = new User();
  private modules = new Modules();
  private JWT_TOKEN: string = process.env.JWT_TOKEN
    ? process.env.JWT_TOKEN
    : "token jwt";
  @Post("/signIn", false)
  async singIn(req: Request, res: Response) {
    const { username, password } = req.body.params;
    let validate = AuthValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      // let ip = req.header("x-forwarded-for") || req.ip;
      let userData: userData = {
        code: "",
        username: "",
        password: "",
        email: "",
        userSecurityCode: "",
        recuperatePasswordToken: "",
        personalDataCode: "",
        firstName: "",
        lastName: "",
        genderCode: "",
        genderName: "",
        documentTypeCode: "",
        documentTypeName: "",
        documentTypeAcronym: "",
        dni: "",
        bornDate: "",
        martialStatusCode: "",
        martialStatusName: "",
        disability: false,
        disabilityTypeCode: null,
        disabilityTypeName: null,
        ethnicGroup: false,
        ethnicDescription: null,
        parrishCode: "",
        parrishName: "",
        municipalityCode: "",
        municipalityName: "",
        stadeCode: "",
        stadeName: "",
        regionCode: "",
        regionName: "",
        direction: "",
        phoneNumber: "",
        statusCode: "",
        statusName: "",
        roleCode: "",
        roleName: "",
        departamentCode: "",
        departamentName: "",
        jobPositionCode: "",
        jobPositionName: "",
      };
      // search the existen of user
      await this.user.findOne(username).then((r) => {
        userData = r;
      });
      if (userData === undefined)
        return res
          .status(401)
          .json({ code: 1, message: "Usuario no encontrado" });
      // comparing password
      let passwordIsValid = bcrypt.compareSync(
        password,
        userData.password as string
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).json({
          code: 1,
          message: "Clave invalida!",
        });
      }
      delete userData.password;
      delete userData.userSecurityCode;
      const token = jsonwebtoken.sign(
        { username: userData.username },
        this.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json(validate);
    }
  }

  @Post("/userData")
  async getUserData(req: Request, res: Response) {
    try {
      const token = req.header("x-access-token")?.replace("Bearer ", "");

      if (!token) {
        return res.status(403).send({
          message: "No token provided!",
        });
      }

      let permissions;
      let userData: userData;
      const jwtVerify = jsonwebtoken.verify(token, this.JWT_TOKEN);
      let decoded: decodedJWT = jwtVerify as decodedJWT;
      userData = await this.user.findOne(decoded.username);
      delete userData.userSecurityCode;
      delete userData.password;
      permissions = await this.modules.findUserModules(
        userData.roleCode as string,
        userData.jobPositionCode as string,
        userData.departamentCode as string
      );
      return res.status(200).json({ userData, permissions });
    } catch (err) {
      console.log(err);
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
  }
}
