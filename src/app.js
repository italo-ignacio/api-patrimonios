import dotenv from "dotenv";
import { resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

dotenv.config();

import express from "express";

import tokenRoutes from "./routes/tokenRoutes";
import userRoutes from "./routes/userRoutes";
import photoRoutes from "./routes/photoRoutes";
import patrimonyRoutes from "./routes/patrimonyRoutes";
import validationRoute from "./routes/validationRoutes";

const whiteList = ["http://localhost:3000", "http://localhost:8080"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "uploads", "images"))
    );
  }
  routes() {
    this.app.use("/user", userRoutes);
    this.app.use("/token", tokenRoutes);
    this.app.use("/photo", photoRoutes);
    this.app.use("/patrimony", patrimonyRoutes);
    this.app.use("/validate", validationRoute);
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  }
}

export default new App().app;
