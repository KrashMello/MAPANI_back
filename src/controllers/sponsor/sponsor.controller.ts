import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import {
  SponsorAddValidate,
  SponsorUpdateValidate,
} from "./request.validatorRequest";

@Controller("sponsor")
export class Sponsor {
  private DB = new DB();
  @Get("")
  async get(req: Request, res: Response) {
    let { documentTypeCode, rif, name, email } = req.query;
    await this.DB.view("*", "view_sponsor")
      .where([
        `"documentTypeCode" like '%${documentTypeCode}%'`,
        `"rif" like '%${rif}%'`,
        `"name" like '%${name}%'`,
        `"email" like '%${email}%'`,
      ])
      .exec()
      .then((response) => {
        return res.status(200).json(response.rows);
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
  }
  @Post("")
  async create(req: Request, res: Response) {
    // CALL public.add_sponsor(
    // 	<_name character varying>,
    // 	<_contac_number character varying>,
    // 	<_email character varying>,
    // 	<_document_type_code character varying>,
    // 	<_rif character varying>
    // )
    let validate = SponsorAddValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { name, contactNumber, email, documentTypeCode, rif } =
        req.body.params;
      let queryOptions = [
        `'${name}'::character varying`,
        `'${contactNumber}'::character varying`,
        `'${email}'::character varying`,
        `'${documentTypeCode}'::character varying`,
        `'${rif}'::character varying`,
      ];

      // res.json(queryOptions)
      await this.DB.call("add_sponsor", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: "success",
            message: "sponsor agregado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(401)
            .json({ status: "error", message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
  @Put("")
  async update(req: Request, res: Response) {
    // CALL public.update_sponsor(
    // 	<_code character varying>,
    // 	<_name character varying>,
    // 	<_contac_number character varying>,
    // 	<_email character varying>,
    // 	<_document_type_code character varying>,
    // 	<_rif character varying>
    // )

    let validate = SponsorUpdateValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let { code, name, contactNumber, email, documentTypeCode, rif } =
        req.body.params;
      let queryOptions = [
        `'${code}'::character varying`,
        `'${name}'::character varying`,
        `'${contactNumber}'::character varying`,
        `'${email}'::character varying`,
        `'${documentTypeCode}'::character varying`,
        `'${rif}'::character varying`,
      ];

      // res.json(queryOptions)
      await this.DB.call("update_sponsor", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: "success",
            message: "sponsor actualizado exitosamente",
          });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(401)
            .json({ status: "error", message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
}
