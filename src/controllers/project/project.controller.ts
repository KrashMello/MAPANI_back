import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import { ProjectIf, SponsorsByProject } from "./types";
import {
  ProjectAddRequestValidate,
  ProjectUpdateRequestValidate,
} from "./request.validatorRequest";
@Controller("/project")
export class Project {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let {
      acronym,
      startDate,
      name,
      dueDate,
      minYearsOld,
      maxYearsOld,
      fromDay,
      toDay,
    } = req.query;
    let project: ProjectIf[] = [];
    let sponsorsByProject: SponsorsByProject[] = [];
    await this.DB.view("*", "view_project")
      .where([
        `"acronym" like '%${acronym}%'`,
        `"name" like '%${name}%'`,
        `"startDate"::character varying like '%${startDate}%'`,
        `"dueDate"::character varying like '%${dueDate}%'`,
        `"minYearsOld"::character varying like '%${minYearsOld}%'`,
        `"maxYearsOld"::character varying like '%${maxYearsOld}%'`,
        `"fromDay"::character like '%${fromDay}%'::character`,
        `"toDay"::character like '%${toDay}%'::character`,
      ])
      .exec()
      .then((resp) => {
        project = resp.rows;
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ error: "ah ocurrido un error!!" });
      });
    await this.DB.view("*", "view_sponsor_by_project")
      .exec()
      .then((response) => {
        sponsorsByProject = response.rows;
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
    return res.status(200).json(
      project.map((p) => {
        p.sponsors = sponsorsByProject.filter(
          (sbp) => sbp.projectCode === p.code
        );
        return p;
      })
    );
  }

  @Post("")
  async create(req: Request, res: Response) {
    //  CALL public.add_project(
    // 	<_name character varying>,
    // 	<_acronym character varying>,
    // 	<"_startDate" date>,
    // 	<"_dueDate" date>,
    // 	<"_minYearsOlds" character varying>,
    // 	<"_maxYearsOlds" character varying>,
    // 	<"_fromDay" character>,
    // 	<"_toDay" character>,
    // 	<"_oneDay" boolean>
    // )
    let validate = ProjectAddRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        name,
        acronym,
        startDate,
        dueDate,
        minYearsOld,
        maxYearsOld,
        fromDay,
        toDay,
        isJustOneDay,
        sponsors,
      }: ProjectIf = req.body.params as ProjectIf;
      let queryOptions = [
        `'${name}'::character varying`,
        `'${acronym}'::character varying`,
        `'${startDate}'::DATE`,
        `'${dueDate}'::DATE`,
        `'${minYearsOld}'::character varying`,
        `'${maxYearsOld}'::character varying`,
        `'${fromDay}'::character`,
        `'${toDay}'::character`,
        `'${isJustOneDay}'::boolean`,
        `'{${sponsors
          .map((v) => {
            return v.code;
          })
          .toString()}}'::character varying[]`,
      ];

      await this.DB.call("add_project", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: 0,
            message: "proyecto agregado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          res
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
    let validate = ProjectUpdateRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        code,
        name,
        acronym,
        startDate,
        dueDate,
        minYearsOld,
        maxYearsOld,
        fromDay,
        toDay,
        isJustOneDay,
        sponsors,
      }: ProjectIf = req.body.params as ProjectIf;
      let queryOptions = [
        `'${code}'::character varying`,
        `'${name}'::character varying`,
        `'${acronym}'::character varying`,
        `'${startDate}'::DATE`,
        `'${dueDate}'::DATE`,
        `'${minYearsOld}'::character varying`,
        `'${maxYearsOld}'::character varying`,
        `'${fromDay}'::character`,
        `'${toDay}'::character`,
        `'${isJustOneDay}'::boolean`,
        `'{${sponsors
          .map((v) => {
            return v.code;
          })
          .toString()}}'::character varying[]`,
      ];

      await this.DB.call("update_project", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: 0,
            message: "proyecto actualizado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(401)
            .json({ status: 1, message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
}
