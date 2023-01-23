import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
// import { UserValidate } from "./request.validatorRequest";
import { DB } from "@DB/index";
import {
  ModuleAddRequestValidate,
  ModuleUpdateRequestValidate,
} from "./request.validatorRequest";

@Controller("/modules")
export class Modules {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let { code, name, unabled, fatherCode } = req.query;
    await this.DB.view("*", "view_modules")
      .where([
        `"code" like '%${code}%'`,
        `"name" like '%${name}%'`,
        `"unabled" = '${unabled}'::boolean`,
        `coalesce("fatherCode",'')  like '%${fatherCode}%'`,
      ])
      .exec()
      .then((re) => {
        return res.status(200).json(re.rows);
      });
  }

  @Post("")
  async create(req: Request, res: Response) {
    let validate = ModuleAddRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { name, src, icon, order, unabled, hasChildren, fatherCode } =
        req.body.params;
      let queryOptions = [
        `'${name}'::character varying`,
        `'${src}'::character varying`,
        `'${icon}'::character varying`,
        `${order}::int4`,
        `'${unabled}'::boolean`,
        `'${hasChildren}'::boolean`,
        !fatherCode
          ? `NULL::character varying`
          : `'${fatherCode}'::character varying`,
      ];
      // console.log(queryOptions);
      // return res.status(401).json("error");
      await this.DB.call("add_module", queryOptions.toString())
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ status: 0, message: "Modulo agregado exitosamente" });
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
    let validate = ModuleUpdateRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { code, name, src, icon, order, unabled, hasChildren, fatherCode } =
        req.body.params;
      let queryOptions = [
        `'${code}'::character varying`,
        `'${name}'::character varying`,
        `'${src}'::character varying`,
        `'${icon}'::character varying`,
        `${order}::int4`,
        `'${unabled}'::boolean`,
        `'${hasChildren}'::boolean`,
        !fatherCode
          ? `NULL::character varying`
          : `'${fatherCode}'::character varying`,
      ];

      await this.DB.call("update_module", queryOptions.toString())
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ status: 0, message: "Modulo Actualizado exitosamente" });
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
