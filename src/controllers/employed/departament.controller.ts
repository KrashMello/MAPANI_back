import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import {
  DepartamentAddRequestValidate,
  DepartamentUpdateRequestValidate,
} from "./request.validatorRequest";
@Controller("/departament")
export class Departament {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let { code, name, limit, page } = req.query;
    let result: any = {
      pagination: 0,
      departaments: [],
    };
    await this.DB.view(`count(*)::int as "paginationCount"`, "view_departament")
      .where([`"code" like '%${code}%'`, `"name" like '%${name}%'`])
      .exec()
      .then((re) => {
        let limitPage =
          limit !== undefined || (limit !== null && typeof limit === "number")
            ? Number(limit)
            : 5;
        result.pagination = Math.ceil(re.rows[0].paginationCount / limitPage);
      });

    await this.DB.view("*", "view_departament")
      .where([
        `"code" like '%${code}%'::character varying`,
        `"name" like '%${name}%'::character varying`,
      ])
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit))

      .exec()
      .then((re) => {
        result.departaments = re.rows;
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
    return res.status(200).json(result);
  }
  @Post("")
  async post(req: Request, res: Response) {
    let validate = DepartamentAddRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { name } = req.body.params;
      let queryOptions = [`'${name}'::character varying`];
      await this.DB.call("add_departament", queryOptions.toString())
        .exec()
        .then(() => {
          return res.status(200).json({
            model: true,
            status: 0,
            message: "Departamento agregado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(401).json({
            model: true,
            status: 1,
            message: "Ah ocurrido un error!! ",
          });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }

  @Put("")
  async update(req: Request, res: Response) {
    let validate = DepartamentUpdateRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { code, name } = req.body.params;
      let queryOptions = [
        `'${code}'::character varying`,
        `'${name}'::character varying`,
      ];
      await this.DB.call("update_departament", queryOptions.toString())
        .exec()
        .then(() => {
          return res.status(200).json({
            model: true,
            status: 0,
            message: "Departamento agregado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(401).json({
            model: true,
            status: 1,
            message: "Ah ocurrido un error!! ",
          });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
}
