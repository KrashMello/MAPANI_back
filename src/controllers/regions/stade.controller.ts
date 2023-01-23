import { Controller, Get } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";

@Controller("stade")
export class Stade {
  private DB = new DB();
  @Get("")
  async get(_req: Request, res: Response) {
    let { regionCode } = _req.query;
    await this.DB.view("code,name", "view_stade")
      .where([`"regionCode" = '${regionCode}'`])
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
