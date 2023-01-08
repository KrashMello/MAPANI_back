import Model from "#Class/model";

import dbpg from "#Class/database";

export default class Users extends Model {
  //the constructor
  constructor() {
    super();
    this.DB = new dbpg();
    this.middelwareExepction = [];
  }

  //method for search a user in the data base
  async findOne(username) {
    let searchUsername = await this.DB.select(
      "*",
      "view_users",
      `username = '${username}'`
    );
    return searchUsername;
  }
  //extra method

  searchUserPersonalData(_callback) {
    this.routes("/searchPersonalData", "searchPersonalData", "GET", _callback);
  }
}
