"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.js")[env];
const db: any = {};

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
  port: config.port ? parseInt(config.port) : 3306,
  storage: ":memory:",
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf(".") !== 0 && file !== basename;
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
