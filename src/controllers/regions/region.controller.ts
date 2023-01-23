import { Request, Response } from "express";
import { Get, Controller } from "@Controller/decorators";
import { DB } from "@DB/index";

@Controller("/region")
export class Region {
  private DB = new DB();
  @Get("")
  async get(_req: Request, res: Response) {
    await this.DB.view("*", "view_region")
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
