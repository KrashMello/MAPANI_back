import Model from "#Class/model";

import dbpg from "#Class/database";

export default class Patient extends Model {
  //the constructor
  constructor() {
    super();
    this.DB = new dbpg();
    this.middelwareExepction = ["get","create","update"];
  }
  
}
