import Model from "#Class/model";

import dbpg from "#Class/database";

export default class Module extends Model {
  //the constructor
  constructor() {
    super();
    this.DB = new dbpg();
    this.middelwareExepction = ["get","create","update"];
  }
   async findUserModules(roleCode,jobPositionCode, departamentCode) {
    let response = null
     if(jobPositionCode && departamentCode)
         response = await this.DB.select(
            '*',
            'view_modules',
            `"jobPositionCode" = '${jobPositionCode}' and "departamentCode" = '${departamentCode}'`
          ).then(res =>{
            return res.rows
          }).catch(err => {
            console.log(err)
          })
      else
        response =  await this.DB.select(
            '*',
            'view_modules',
            `"roleCode" = '${roleCode}'`
          ).then(res =>{
            return res.rows
          }).catch(err => {
            console.log(err)
          })
     return new Promise(
      (resolve) => {
        resolve(response);
      },
      (reject) => {
        reject({ mesaje: "a ocurrido un error" });
      }
    );

  }
}
