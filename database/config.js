"use strict";

module.exports = {
  default: {
    username: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "",
    host: process.env.POSTGRES_HOST || "",
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    pool: {
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0,
    }
  },
};
