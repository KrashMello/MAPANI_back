import Model from "#Class/model";

import dbpg from "#Class/database";

export default class Sponsor extends Model {
  //the constructor
  constructor() {
    super();
    this.DB = new dbpg();
    this.middelwareExepction = ["get","create"];
  }
  
}
