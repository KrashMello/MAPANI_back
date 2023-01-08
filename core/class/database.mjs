import pg from "pg";

class Postgres {
  #config =
    process.env.DB_EXTERNAL_CONNECTION === "null"
      ? {
          host: process.env.DB_HOST || "localhost",
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_DATABASE || "postges",
          user: process.env.DB_USERNAME || "postgre",
          password: process.env.DB_PASSWORD || "",
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {
          connectionString: process.env.DB_EXTERNAL_CONNECTION,
          ssl: {
            rejectUnauthorized: false,
          },
        };

  #DATE_OID = 1082;
  #parseDate = (value) => value;

  constructor() {
    this.Pool = pg.Pool;
    this.pool = new this.Pool(this.#config);
    pg.types.setTypeParser(this.#DATE_OID, this.#parseDate);
  }

  Connect() {
    this.pool
      .connect()
      .then(() => console.log("connected to the database"))
      .catch((err) => console.error("connection error", err.stack));
  }

  select(columns = "*", table_name = "", conditions = "", limit = -1) {
    if (columns !== "*" && columns === Array) {
      let columns = columns
        .map((value) => {
          return '"' + value + '"';
        })
        .toString();
    }
    let result = null;
    if (table_name !== "") {
      let query = "SELECT " + columns + " FROM " + table_name;
      if (conditions !== "") query += " WHERE " + conditions;
      if (limit > -1) query += " LIMIT " + limit;
      result = this.pool.query(query);
    } else {
      let query = "SELECT " + columns;
      result = this.pool.query(query);
    }
    return result;
  }

  call(procedureName = "", values = "") {
    if (typeof values === "string" && typeof procedureName === "string") {
      let result = null;
      if (values !== "" && procedureName !== "") {
        let query = "CALL " + procedureName + "(" + values + ")";
        result = this.pool.query(query);
      }
      return result;
    } else {
      console.log(
        "Error al ingrezar atributos en la funcion call los typeof no coinciden"
      );
    }
  }
}

class Mysql {
  constructor() {}
}

const db = process.env.DB_CONNECTION === "pgsql" ? Postgres : Mysql;
export default db;
