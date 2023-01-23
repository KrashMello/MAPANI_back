import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import {
  AppoinmentAddValidate,
  AppoinmentUpdateValidate,
} from "./request.validatorRequest";

@Controller("/appointment")
export class Appointment {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let {
      code,
      representativeFirstName,
      representativeLastName,
      patientFirstName,
      patientLastName,
      appointmentDate,
    } = req.query;
    await this.DB.view("*", "view_appointment")
      .where([
        `code like '%${code}%'`,
        `"representativeFirstName" like '%${representativeFirstName}%'`,
        `"representativeLastName" like '%${representativeLastName}%'`,
        `"patientFirstName" like '%${patientFirstName}%'`,
        `"patientLastName" like '%${patientLastName}%'`,
        `"patientBornDate"::character varying like '%${appointmentDate}%'`,
      ])
      .exec()
      .then((re) => {
        return res.status(200).json(re.rows);
      });
  }

  @Post("")
  async create(req: Request, res: Response) {
    //   CALL public.add_appointment(
    // 	<_pediatrics boolean>,
    // 	<_nutritionist boolean>,
    // 	<_psychiatry boolean>,
    // 	<_breastfeeding_advice boolean>,
    // 	<_advocacy boolean>,
    // 	<_social_psychology boolean>,
    // 	<_clinical_psychology boolean>,
    // 	<_clinic_history_code character varying>,
    // 	<"_representative_firstName" character varying>,
    // 	<"_representative_lastName" character varying>,
    // 	<"_representative_numberPhone" character varying>,
    // 	<_representative_direction character varying>,
    // 	<"_patient_firstName" character varying>,
    // 	<"_patient_lastName" character varying>,
    // 	<"_patient_bornDate" date>
    // )

    let validate = AppoinmentAddValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let {
        pediatrics,
        nutritionist,
        psychiatry,
        breastfeedingAdvice,
        advocacy,
        socialPsychology,
        clinicalPsychology,
        clinicHistoryCode,
        representativeFirstName,
        representativeLastName,
        representativeDirection,
        representativeNumberPhone,
        patientFirstName,
        patientLastName,
        patientBornDate,
      } = req.body.params;
      let queryOptions = [
        pediatrics,
        nutritionist,
        psychiatry,
        breastfeedingAdvice,
        advocacy,
        socialPsychology,
        clinicalPsychology,
        clinicHistoryCode === null
          ? "NULL::character varying"
          : `'${clinicHistoryCode}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${representativeFirstName}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${representativeLastName}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${representativeNumberPhone}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${representativeDirection}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${patientFirstName}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::character varying"
          : `'${patientLastName}'::character varying`,
        clinicHistoryCode !== null
          ? "NULL::date"
          : `'${patientBornDate}'::DATE`,
      ];
      // console.log(
      // console.log(queryOptions)
      await this.DB.call("add_appointment", queryOptions.toString())
        .exec()
        .then(() => {
          res
            .status(200)
            .json({ status: "success", message: "Cita agregada exitosamente" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(400)
            .json({ status: "error", message: "Ah ocurrido un error!! " });
        });
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
  @Put("")
  async update(req: Request, res: Response) {
    //   CALL public.update_appointment(
    // 	<_code character varying>,
    // 	<"_appointmentDate" date>,
    // 	<_pediatrics boolean>,
    // 	<_nutritionist boolean>,
    // 	<_psychiatry boolean>,
    // 	<"_breastfeedingAdvice" boolean>,
    // 	<_advocacy boolean>,
    // 	<"_socialPsychology" boolean>,
    // 	<"_clinicalPsychology" boolean>,
    // 	<"_clinicHistoryCode" character varying>,
    // 	<"_representativeFirstName" character varying>,
    // 	<"_representativeLastName" character varying>,
    // 	<"_representativeNumberPhone" character varying>,
    // 	<"_representativeDirection" character varying>,
    // 	<"_patientFirstName" character varying>,
    // 	<"_patientLastName" character varying>,
    // 	<"_patientBornDate" date>,
    // 	<_status integer>
    // )
    let validate = AppoinmentUpdateValidate.getResult(req.body.params);
    if (Object.values(validate).length === 0) {
      let requestValues = req.body.params;
      let queryOptions = [
        "'" + requestValues.code + "'::character varying",
        "'" + requestValues.projectCode + "'::character varying",
        "'" + requestValues.appointmentDate + "'::DATE",
        requestValues.pediatrics,
        requestValues.nutritionist,
        requestValues.psychiatry,
        requestValues.breastfeedingAdvice,
        requestValues.advocacy,
        requestValues.socialPsychology,
        requestValues.clinicalPsychology,
        requestValues.clinicHistoryCode === null
          ? "NULL::character varying"
          : "'" + requestValues.clinicHistroryCode + "'::character varying",
        "'" + requestValues.representativeFirstName + "'::character varying",
        "'" + requestValues.representativeLastName + "'::character varying",
        "'" + requestValues.representativeNumberPhone + "'::character varying",
        "'" + requestValues.representativeDirection + "'::character varying",
        "'" + requestValues.patientFirstName + "'::character varying",
        "'" + requestValues.patientLastName + "'::character varying",
        "'" + requestValues.patientBornDate + "'::DATE",
        requestValues.status,
      ];

      // console.log(queryOptions)
      await this.DB.call("update_appointment", queryOptions.toString())
        .exec()
        .then(() => {
          res
            .status(200)
            .json({ status: "success", message: "Cita agregada exitosamente" });
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
