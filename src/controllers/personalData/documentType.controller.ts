import { Controller, Get } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
@Controller("/documentType")
export class DocumentType {
  private DB = new DB();

  @Get("")
  async get(_req: Request, res: Response) {
    await this.DB.view("*", `"view_documentType"`)
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