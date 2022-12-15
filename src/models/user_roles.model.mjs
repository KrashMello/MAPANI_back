import Model from "#Class/model";

import dbpg from "#Class/database";

export default class UserRoles extends Model {
  //the constructor
  constructor() {
    super();
    this.DB = new dbpg();
    this.middelwareExepction = [];
  }
}
