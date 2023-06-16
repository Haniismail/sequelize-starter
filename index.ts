import express, { Request, Response, NextFunction } from "express";
import routesV1 from "./routes/index";
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const port = process.env.PORT || 5000;
import cors from "cors";
import { ApiError, InternalError } from "./core/appError";
import { join } from "path";
import app from "./app";
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];
import { sequelize } from "./database/models/index";

//DECLARE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taki Kids Api",
      version: "1.0.0",
      description: "Admin back office for Taki kids platform ! ",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: [join(__dirname, "routes/**/*.ts"), join(__dirname, "routes/**/*.js")],
};

const specs = swaggerJsDoc(options);
if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
app.use("/api", routesV1);

app.use((req, res, next) => next(new InternalError()));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name && err.name.includes("Sequelize")) {
    return res.status(400).send({ status: "fail", message: err.message });
  } else if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (process.env.NODE_ENV === "development") {
      return res.status(400).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

app.listen(port, () => {
  console.log(`Server is running better than ever on port ${port} ✅`);
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the db has been established successfully ✅");
  } catch (error) {
    console.error("Unable to connect to the database ❌ , \n reason : ", error);
  }
};
dbConnection();
