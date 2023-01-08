import Model from "#Class/model";

export default class Users extends Model {
  //the constructor
  constructor(db) {
    super();
    this.middelwareExepction = [];
    this.DB = db;
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
