import express from "express";
import verifyToken from "#Middelware/auth";
export default class Model {
  constructor() {
    this.app = express.Router();
    this.verifyToken = verifyToken;
    this.middelwareExepction = [];
  }

  router() {
    return this.app;
  }
  routes(url, routeName, method, funct) {
    if (
      typeof url === "string" &&
      typeof routeName === "string" &&
      typeof method === "string" &&
      typeof funct === "function"
    ) {
      const HASMIDDELWARE = this.hasMiddelware(routeName);
      let route;
      switch (method) {
        case "GET":
          route = HASMIDDELWARE
            ? this.app.get(url, this.verifyToken, funct)
            : this.app.get(url, funct);
          break;
        case "POST":
          route = HASMIDDELWARE
            ? this.app.post(url, this.verifyToken, funct)
            : this.app.post(url, funct);
          break;
        case "PUT":
          route = HASMIDDELWARE
            ? this.app.put(url, this.verifyToken, funct)
            : this.app.put(url, funct);
          break;
        case "DELETE":
          route = HASMIDDELWARE
            ? this.app.delete(url, this.verifyToken, funct)
            : this.app.delete(url, funct);
          break;
      }
      return route;
    } else return null;
  }

  hasMiddelware(type) {
    return this.middelwareExepction.filter((value) => value === type).length > 0
      ? false
      : true;
  }

  get(funct) {
    this.routes("/", "get", "GET", funct);
  }

  created(funct) {
    this.routes("/", "create", "POST", funct);
  }

  updated(funct) {
    this.routes("/", "update", "PUT", funct);
  }

  delete(funct) {
    this.routes("/", "delete", "DELETE", funct);
  }

  io(socket, callback) {
    callback(socket);
  }
}
