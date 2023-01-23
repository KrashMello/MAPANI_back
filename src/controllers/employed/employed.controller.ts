import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import {
  EmployedAddRequestValidate,
  EmployedUpdateRequestValidate,
} from "./request.validatorRequest";
@Controller("/employed")
export class Employed {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let {
      jobPositionCode,
      departamentCode,
      dateOfEntry,
      dateOfDischarge,
      dni,
      parrishCode,
      stadeCode,
      municipalityCode,
    } = req.query;
    await this.DB.view("*", "view_employed")
      .where([
        `"jobPositionCode" like '%${jobPositionCode}%'`,
        `"departamentCode" like '%${departamentCode}%'`,
        `"dateOfEntry"::character varying like '%${dateOfEntry}%'::character varying`,
        `"dateOfDischarge" is null or "dateOfDischarge"::character varying like '%${dateOfDischarge}%'::character varying`,
        `"dni" like '%${dni}%'`,
        `"parrishCode" like '%${parrishCode}%'`,
        `"stadeCode" like '%${stadeCode}%'`,
        `"municipalityCode" like '%${municipalityCode}%'`,
      ])
      .exec()
      .then((re) => {
        return res.status(200).json(re.rows);
      });
  }
  @Post("")
  async create(req: Request, res: Response) {
    // CALL public.add_employed(
    // : _user_personal_data_code character varying,
    // : _job_position_code character varying,
    // : _departament_code character varying,
    // : _date_of_entry date,
    // : _date_of_discharge date,
    // : _userpersonaldatafirstname charater varying,
    // : _userpersonaldatalastname character varying,
    // : _userpersonaldatagendercode character varying,
    // : _usepersonaldatadocumenttypecode character varying,
    // : _userpersonaldatadin character varying,
    // : _userpersonaldataborndate date,
    // : _userpersonaldatamartialstatuscode character varying,
    // : _userpersonaldatadisability boolean,
    // : _userpersonaldatadisabilitytypecode character varying,
    // : _userpersonaldataethnicgroup boolean,
    // : _userpersonaldataethnicdesciption character varying,
    // : _userpersonaldatadirection character varying,
    // : _userpersonaldataphonenumber character varying);

    let validate = EmployedAddRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        personalDataCode,
        jobPositionCode,
        departamentCode,
        dateOfEntry,
        dateOfDischarge,
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
        numberPhone,
      } = req.body.params;
      let queryOptions = [
        !personalDataCode
          ? `NULL::character varying`
          : `'${personalDataCode}'::character varying`,
        `'${jobPositionCode}'::character varying`,
        `'${departamentCode}'::character varying`,
        `'${dateOfEntry}'::DATE`,
        !dateOfDischarge ? `NULL::date` : `'${dateOfDischarge}'::DATE`,
        !firstName
          ? `NULL::character varying`
          : `'${firstName}'::character varying`,
        !lastName
          ? `NULL::character varying`
          : `'${lastName}'::character varying`,
        !genderCode
          ? `NULL::character varying`
          : `'${genderCode}'::character varying`,
        !documentTypeCode
          ? `NULL::character varying`
          : `'${documentTypeCode}'::character varying`,
        !dni ? `NULL::character varying` : `'${dni}'::character varying`,
        !bornDate ? `NULL::DATE` : `'${bornDate}'::DATE`,
        !martialStatusCode
          ? `NULL::character varying`
          : `'${martialStatusCode}'::character varying`,
        `${disability}::BOOLEAN`,
        !disabilityTypeCode
          ? `NULL::character varying`
          : `'${disabilityTypeCode}'::character varying`,
        `${ethnicGroup}::BOOLEAN`,
        !ethnicDescription
          ? `NULL::character varying`
          : `'${ethnicDescription}'::character varying`,
        !parrishCode
          ? `NULL::character varying`
          : `'${parrishCode}'::character varying`,
        !direction
          ? `NULL::character varying`
          : `'${direction}'::character varying`,
        !numberPhone
          ? `NULL::character varying`
          : `'${numberPhone}'::character varying`,
      ];
      // console.log(;
      // console.log(queryOptions);
      await this.DB.call("add_employed", queryOptions.toString())
        .exec()
        .then(() => {
          res
            .status(200)
            .json({ status: 0, message: "Empleado agregado exitosamente" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(400)
            .json({ status: 1, message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
  @Put("")
  async update(req: Request, res: Response) {
    let validate = EmployedUpdateRequestValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        employedCode,
        personalDataCode,
        jobPositionCode,
        departamentCode,
        dateOfEntry,
        dateOfDischarge,
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
        numberPhone,
      } = req.body.params;
      let queryOptions = [
        `'${personalDataCode}'::character varying`,
        `'${employedCode}'::character varying`,
        `'${jobPositionCode}'::character varying`,
        `'${departamentCode}'::character varying`,
        `'${dateOfEntry}'::DATE`,
        !dateOfDischarge ? `NULL::date` : `'${dateOfDischarge}'::DATE`,
        `'${firstName}'::character varying`,
        `'${lastName}'::character varying`,
        `'${genderCode}'::character varying`,
        `'${documentTypeCode}'::character varying`,
        `'${dni}'::character varying`,
        `'${bornDate}'::DATE`,
        `'${martialStatusCode}'::character varying`,
        `'${disability}'::BOOLEAN`,
        !disabilityTypeCode
          ? `null::character varying`
          : `'${disabilityTypeCode}'::character varying`,
        `'${ethnicGroup}'::BOOLEAN`,
        `'${ethnicDescription}'::character varying`,
        `'${parrishCode}'::character varying`,
        `'${direction}'::character varying`,
        `'${numberPhone}'::character varying`,
      ];

      // console.log(queryOptions)
      await this.DB.call("update_employed", queryOptions.toString())
        .exec()
        .then(() => {
          res
            .status(200)
            .json({ status: 0, message: "empleado actualizado exitosamente" });
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
