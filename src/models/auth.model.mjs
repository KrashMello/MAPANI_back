import Model from "#Class/model";

export default class Auth extends Model {
  //the constructor
  constructor() {
    super();
    this.middelwareExepction = ["singIn"];
  }
  //extra method
  singIn(_callback) {
    this.routes("/singIn", "singIn", "POST", _callback);
  }
  getUserData(_callback) {
    this.routes("/userData", "getUserData", "POST", _callback);
  }
}
