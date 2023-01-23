import { Model } from "@Model/index";
import { DB } from "@DB/index";

export class Modules extends Model {
  constructor() {
    super();
  }
  tableName = "modules";
  DB = new DB(this.tableName);
  async findUserModules(
    roleCode: string,
    jobPositionCode: string,
    departamentCode: string
  ) {
    let response;
    if (jobPositionCode && departamentCode)
      response = await this.DB.view("*", "view_permissions")
        .where([
          `"jobPositionCode" = '${jobPositionCode}'`,
          `"departamentCode" = '${departamentCode}'`,
          `"show" = true`,
        ])
        .exec()
        .then((res) => {
          return res.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    else
      response = await this.DB.view("*", "view_permissions")
        .where([`"roleCode" = '${roleCode}'`, `"show" = true`])
        .exec()
        .then((res) => {
          return res.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    return response;
  }
}
