import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import { PatientIf } from "./types";
import {
  PatientAddRequestValidate,
  PatientUpdateRequestValidate,
} from "./request.validatorRequest";
@Controller("/patient")
export class Patient {
  private DB = new DB();

  @Get("")
  async get(_req: Request, res: Response) {
    // code
    // firstName
    // lastName
    // bornDate
    // gender
    // genderCode
    // birthCertificate
    // disability
    // motor
    // visual
    // cognitive
    // auditive
    await this.DB.view("*", "view_patient")
      .exec()
      .then((response) => {
        res.json(
          response.rows.map((value) => {
            value.disabilityTypes = {
              motor: value.motor,
              visual: value.visual,
              cognitive: value.cognitive,
              auditive: value.auditive,
            };
            delete value.motor;
            delete value.visual;
            delete value.cognitive;
            delete value.auditive;

            return value;
          })
        );
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
  }

  @Post("")
  async create(req: Request, res: Response) {
    // CALL public.add_patient(
    // 	<_code character varying>,
    // 	<"_firstName" character varying>,
    // 	<"_lastName" character varying>,
    // 	<_born_date date>,
    // 	<_gender_code character varying>>,
    // 	<_birt_certificate boolean>,
    // 	<_disability boolean>,
    // 	<_disability_type character varying[]>
    // )
    let validate = PatientAddRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        code,
        firstName,
        lastName,
        bornDate,
        genderCode,
        birthCertificate,
        disability,
        disabilityTypes,
      }: PatientIf = req.body.params as PatientIf;
      let queryOptions = [
        code !== null
          ? `'${code}'::character varying`
          : `NULL::character varying`,
        `'${firstName}'::character varying`,
        `'${lastName}'::character varying`,
        `'${bornDate}'::DATE`,
        `'${genderCode}'::character varying`,
        `'${birthCertificate}::boolean`,
        `${disability}::boolean`,
        `${disabilityTypes.motor}::boolean`,
        `${disabilityTypes.visual}::boolean`,
        `${disabilityTypes.cognitive}::boolean`,
        `${disabilityTypes.auditive}::boolean`,
      ];
      await this.DB.call("add_patient", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: "success",
            message: "paciente agregado exitosamente",
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
    let validate = PatientUpdateRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        code,
        firstName,
        lastName,
        bornDate,
        genderCode,
        birthCertificate,
        disability,
        disabilityTypes,
      } = req.body.params;
      let queryOptions = [
        code !== null
          ? `'${code}'::character varying`
          : "NULL::character varying",
        `'${firstName}'::character varying`,
        `'${lastName}'::character varying`,
        `'${bornDate}'::DATE`,
        `'${genderCode}'::character varying`,
        `${birthCertificate}::boolean`,
        `${disability}::boolean`,
        `${disabilityTypes.motor}::boolean`,
        `${disabilityTypes.visual}::boolean`,
        `${disabilityTypes.cognitive}::boolean`,
        `${disabilityTypes.auditive}::boolean`,
      ];
      await this.DB.call("update_patient", queryOptions.toString())
        .exec()
        .then(() => {
          res.status(200).json({
            status: "success",
            message: "paciente actualizado exitosamente",
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
