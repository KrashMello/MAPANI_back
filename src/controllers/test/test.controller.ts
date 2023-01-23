import { Controller, Get, Post, Put } from "@Controller/decorators";
import { Request, Response } from "express";
import { DB } from "@DB/index";
import { testValidate } from "./request.validatorRequest";
@Controller("/martialStatus")
export class MartialStatus {
  private DB = new DB();

  @Get("")
  async get(_req: Request, res: Response) {
    return res.status(200).json("get test");
  }
  @Post("")
  async create(req: Request, res: Response) {
    let validate = testvalidate.getresult(req.body.params);
    if (object.values(validate).length === 0) {
      return res.status(200).json("post test");
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
  @Put("")
  async update(req: Request, res: Response) {
    let validate = testvalidate.getresult(req.body.params);
    if (object.values(validate).length === 0) {
      return res.status(200).json("Put test");
    } else {
      return res.status(401).json(validate);
    }
    return null;
  }
}
