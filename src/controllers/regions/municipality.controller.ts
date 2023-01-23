import { Controller, Get } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
@Controller("/municipality")
export class Municipality {
  private DB = new DB();

  @Get("")
  async get(req: Request, res: Response) {
    let { stadeCode } = req.query;
    await this.DB.view("code,name", "view_municipality")
      .where([`"stadeCode" = '${stadeCode}'`])
      .exec()
      .then((response) => {
        return res.status(200).json(response.rows);
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ error: "Ah ocurrido un error!! " });
      });
  }
}
