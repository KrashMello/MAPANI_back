import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { Modules, PermissionsDB, Permissions } from "./types";
import { DB } from "@DB/index";
import { UserDepartamentPermissionsAddValidate } from "./request.validatorRequest";

@Controller("/user_departament_permissions")
export class UserDepartamentPermissions {
  private DB = new DB();
  @Get("")
  async get(req: Request, resp: Response) {
    let { jobPositionCode, departamentCode } = req.query;
    let modules: Modules[] = [];
    let dbPermissions: PermissionsDB[];
    let permissions: Permissions = {
      modules: [],
      departamentCode: "",
      jobPositionCode: "",
      show: [],
      create: [],
      update: [],
      print: [],
      report: [],
    };

    await this.DB.view(`code,"name"`, "view_modules")
      .exec()
      .then((re) => {
        modules = re.rows;
      });
    await this.DB.view(
      `"moduleCode","moduleName","show","create","update","print","report"`,
      "view_permissions"
    )
      .where([
        `"jobPositionCode" like '%${jobPositionCode}%'`,
        `"departamentCode" like '%${departamentCode}%'`,
      ])
      .exec()
      .then((re) => {
        dbPermissions = re.rows;
      });
    if (jobPositionCode && departamentCode)
      modules.map((mod) => {
        let aux = dbPermissions.filter((v) => mod.code === v.moduleCode)[0];
        if (aux) {
          permissions.modules.push({ code: mod.code, name: mod.name });
          permissions.show.push(aux.show);
          permissions.create.push(aux.create);
          permissions.update.push(aux.update);
          permissions.print.push(aux.print);
          permissions.report.push(aux.report);
        } else {
          permissions.modules.push({ code: mod.code, name: mod.name });
          permissions.show.push(false);
          permissions.create.push(false);
          permissions.update.push(false);
          permissions.print.push(false);
          permissions.report.push(false);
        }
        permissions.departamentCode = departamentCode as string;
        permissions.jobPositionCode = jobPositionCode as string;
      });
    return resp.status(200).json(permissions);
  }
  @Post("")
  async create(req: Request, res: Response) {
    //   call public.add_permission_modules_by_departament(
    // _modules_codes character varying[],
    // _job_position_code character varying,
    // _departament_code character varying,
    // _show boolean[],
    // _create boolean[],
    // _update boolean[],
    // _print boolean[],
    // _report boolean[]
    // )
    let {
      modules,
      jobPositionCode,
      departamentCode,
      show,
      create,
      update,
      print,
      report,
    } = req.body.params as Permissions;

    let validate = UserDepartamentPermissionsAddValidate.getResult(
      req.body.params
    );
    if (Object.values(validate).length === 0) {
      let queryOptions = [
        `'{${modules
          .map((v) => {
            return `${v.code}`;
          })
          .toString()}}'::character varying[]`,
        `'${jobPositionCode}'::character varying`,
        `'${departamentCode}'::character varying`,
        `'{${show.toString()}}'::boolean[]`,
        `'{${create.toString()}}'::boolean[]`,
        `'{${update.toString()}}'::boolean[]`,
        `'{${print.toString()}}'::boolean[]`,
        `'{${report.toString()}}'::boolean[]`,
      ];
      // return res.status(200).json(queryOptions.toString());
      // console.log(queryOptions);
      // return res.status(401).json("error");
      // res.json(queryOptions);
      await this.DB.call(
        "add_permission_modules_by_departament",
        queryOptions.toString()
      )
        .exec()
        .then(() => {
          return res.status(200).json({
            status: 0,
            message: "Permisos por departamentos agregado exitosamente",
          });
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
    //   call public.add_permission_modules_by_departament(
    // _modules_codes character varying[],
    // _job_position_code character varying,
    // _departament_code character varying,
    // _show boolean[],
    // _create boolean[],
    // _update boolean[],
    // _print boolean[],
    // _report boolean[]
    // )
    let {
      modules,
      jobPositionCode,
      departamentCode,
      show,
      create,
      update,
      print,
      report,
    } = req.body.params as Permissions;

    let validate = UserDepartamentPermissionsAddValidate.getResult(
      req.body.params
    );
    if (Object.values(validate).length === 0) {
      let queryOptions = [
        `'{${modules
          .map((v) => {
            return `${v.code}`;
          })
          .toString()}}'::character varying[]`,
        `'${jobPositionCode}'::character varying`,
        `'${departamentCode}'::character varying`,
        `'{${show.toString()}}'::boolean[]`,
        `'{${create.toString()}}'::boolean[]`,
        `'{${update.toString()}}'::boolean[]`,
        `'{${print.toString()}}'::boolean[]`,
        `'{${report.toString()}}'::boolean[]`,
      ];
      console.log(queryOptions);
      // return res.status(200).json(queryOptions.toString());
      // console.log(queryOptions);
      // return res.status(401).json("error");
      // res.json(queryOptions);
      await this.DB.call(
        "add_permission_modules_by_departament",
        queryOptions.toString()
      )
        .exec()
        .then(() => {
          return res.status(200).json({
            status: 0,
            message: "Permisos por departamentos actualizados exitosamente",
          });
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
