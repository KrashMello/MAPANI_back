import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import {
  UserAddValidate,
  UserUpdateValidate,
} from "./request.validatorRequest";
import { DB } from "@DB/index";
import bcrypt from "bcrypt";
import { User } from "@src/models/user/user.model";

@Controller("/Users")
export class Users {
  private DB = new DB();
  private user = new User();

  @Get("")
  async get(req: Request, res: Response) {
    let {
      userCode,
      roleCode,
      statusCode,
      username,
      email,
      dni,
      parrishCode,
      stadeCode,
      municipalityCode,
    } = req.query;
    await this.DB.view("*", "view_users")
      .where([
        `"code" like '%${userCode}%'`,
        `"roleCode" like '%${roleCode}%'`,
        `"statusCode" like '%${statusCode}%'`,
        `"username" like '%${username}%'`,
        `"email" like '%${email}%'`,
        `"dni" like '%${dni}%'`,
        `"parrishCode" like '%${parrishCode}%'`,
        `"stadeCode" like '%${stadeCode}%'`,
        `"municipalityCode" like '%${municipalityCode}%'`,
      ])
      .exec()
      .then((re) => {
        let users = re.rows;
        users = users.map((value) => {
          value.password = "";
          value.userSecurityCode = "";
          return value;
        });
        return res.status(200).json(users);
      });
  }

  @Get("/searchPersonalData")
  async searchUserPersonalData(req: Request, res: Response) {
    let { documentTypeCode, firstName, lastName, dni } = req.query;
    await this.DB.view("*", "view_user_personal_data")
      .where([
        `"documentTypeCode" like '%${documentTypeCode}%'`,
        `"firstName" like '%${firstName}%'`,
        `"lastName" like '%${lastName}%'`,
        `dni like '%${dni}%'`,
      ])
      .exec()
      .then((re) => {
        return res.status(200).json(re.rows);
      });
  }

  @Post("")
  async create(req: Request, res: Response) {
    let {
      personalDataCode,
      username,
      password,
      email,
      securityCode,
      statusCode,
      roleCode,
      firstName,
      lastName,
      genderCode,
      documentTypeCode,
      dni,
      bornDate,
      martialStatusCode,
      disability,
      disabilityTypeCode,
      ethnicGroup,
      ethnicDescription,
      parrishCode,
      direction,
      phoneNumber,
    } = req.body.params;
    let validate = UserAddValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let queryOptions = [
        !personalDataCode
          ? `null::character varying`
          : `'${personalDataCode}'::character varying`,
        `'${username}'::character varying`,
        `'${bcrypt.hashSync(password, 11)}'::character varying`,
        `'${email}'::character varying`,
        `'${bcrypt.hashSync(securityCode, 11)}'::character varying`,
        `'${statusCode}'::character varying`,
        `'${roleCode}'::character varying`,
        !firstName || personalDataCode
          ? `null::character varying`
          : `'${firstName}'::character varying`,
        !lastName || personalDataCode
          ? `null::character varying`
          : `'${lastName}'::character varying`,
        !genderCode || personalDataCode
          ? `null::character varying`
          : `'${genderCode}'::character varying`,
        !documentTypeCode || personalDataCode
          ? `null::character varying`
          : `'${documentTypeCode}'::character varying`,
        !dni || personalDataCode
          ? `null::character varying`
          : `'${dni}'::character varying`,
        !bornDate || personalDataCode ? `null::date` : `'${bornDate}'::Date`,
        !martialStatusCode || personalDataCode
          ? `null::character varying`
          : `'${martialStatusCode}'::character varying`,
        disability === null || personalDataCode
          ? `null::boolean`
          : `'${disability}'::boolean`,
        !disabilityTypeCode || personalDataCode
          ? `null::character varying`
          : `'${disabilityTypeCode}'::character varying`,
        ethnicGroup === null || personalDataCode
          ? `null::boolean`
          : `'${ethnicGroup}'::boolean`,
        !ethnicDescription ||
        !ethnicDescription === undefined ||
        !personalDataCode
          ? `null::character varying`
          : `'${ethnicDescription}'::character varying`,
        !parrishCode || personalDataCode
          ? `null::character varying`
          : `'${parrishCode}'::character varying`,
        !direction || personalDataCode
          ? `null::character varying`
          : `'${direction}'::character varying`,
        !phoneNumber || personalDataCode
          ? `null::character varying`
          : `'${phoneNumber}'::character varying`,
      ];
      await this.user.DB.select()
        .where(
          `"username" = '${username}'::character varying or "email" = '${email}'`
        )
        .exec()
        .then((r) => {
          if (r.rows[0].exist >= 0) return;
          res.status(401).json({
            status: 1,
            message: "nombre de usuario o el correo electronico ya existe",
          });
          return null;
        });
      await this.DB.call("add_user", queryOptions.toString())
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ status: 0, message: "Usuario agregado exitosamente" });
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(401)
            .json({ status: 1, message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
  @Put("")
  async update(req: Request, res: Response) {
    let {
      personalDataCode,
      userCode,
      username,
      password,
      email,
      securityCode,
      statusCode,
      roleCode,
      firstName,
      lastName,
      genderCode,
      documentTypeCode,
      dni,
      bornDate,
      martialStatusCode,
      disability,
      disabilityTypeCode,
      ethnicGroup,
      ethnicDescription,
      parrishCode,
      direction,
      phoneNumber,
    } = req.body.params;
    let validate = UserUpdateValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let queryOptions = [
        !personalDataCode
          ? `null::character varying`
          : `'${personalDataCode}'::character varying`,
        `'${userCode}'::character varying`,
        `'${username}'::character varying`,
        !password
          ? `null::character varying`
          : `'${bcrypt.hashSync(password, 11)}'::character varying`,
        `'${email}'::character varying`,
        !securityCode
          ? `null::character varying`
          : `'${bcrypt.hashSync(securityCode, 11)}'::character varying`,
        `'${statusCode}'::character varying`,
        `'${roleCode}'::character varying`,
        !firstName
          ? `null::character varying`
          : `'${firstName}'::character varying`,
        !lastName
          ? `null::character varying`
          : `'${lastName}'::character varying`,
        !genderCode
          ? `null::character varying`
          : `'${genderCode}'::character varying`,
        !documentTypeCode
          ? `null::character varying`
          : `'${documentTypeCode}'::character varying`,
        !dni ? `null::character varying` : `'${dni}'::character varying`,
        !bornDate ? `null::date` : `'${bornDate}'::Date`,
        !martialStatusCode
          ? `null::character varying`
          : `'${martialStatusCode}'::character varying`,
        `'${disability}'::boolean`,
        !disabilityTypeCode
          ? `null::character varying`
          : `'${disabilityTypeCode}'::character varying`,
        `'${ethnicGroup}'::boolean`,
        !ethnicDescription
          ? `null::character varying`
          : `'${ethnicDescription}'::character varying`,
        !parrishCode
          ? `null::character varying`
          : `'${parrishCode}'::character varying`,
        !direction
          ? `null::character varying`
          : `'${direction}'::character varying`,
        !phoneNumber
          ? `null::character varying`
          : `'${phoneNumber}'::character varying`,
      ];
      // console.log(queryOptions);
      // return res.status(401).json({});
      await this.user.DB.select()
        .where(`"userCode" = '${userCode}'::character varying '`)
        .exec()
        .then((r) => {
          if (r.rows[0].exist === 0) return;
          res.status(401).json({
            status: 1,
            message: "nombre de usuario no existe",
          });
          return null;
        });

      await this.DB.call("update_user", queryOptions.toString())
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ status: 0, message: "Usuario Actualizado exitosamente" });
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(401)
            .json({ status: 1, message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
}
