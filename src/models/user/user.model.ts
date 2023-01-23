import { Model } from "@Model/index";
import { DB } from "@DB/index";
export class User extends Model {
  constructor() {
    super();
  }
  tableName = "users";
  DB = new DB(this.tableName);

  async findOne(username: string) {
    let result: object = {};
    await this.DB.view("*", "view_users")
      .where(`"username" = '${username}'::character varying`)
      .exec()
      .then((resp) => {
        result = resp.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  }
}
