import { Controller, Get } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
@Controller("/parrish")
export class Parrish {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let { municipalityCode } = req.query;
    await this.DB.view("code,name", "view_parrish")
      .where([`"municipalityCode" = '${municipalityCode}'`])
      .exec()
      .then((response) => {
        return res.status(200).json(response.rows);
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
  }
}
