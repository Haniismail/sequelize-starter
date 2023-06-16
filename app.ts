import express from "express";
import routesV1 from "./routes/index";
const app = express();
import cors from "cors";

//DECLARE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routesV1);

export default app;
