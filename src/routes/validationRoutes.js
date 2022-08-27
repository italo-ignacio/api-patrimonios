import { Router } from "express";
import loginValidate from "../middlewares/loginValidate";
import * as ValidationController from "../controllers/ValidationController";

const router = new Router();

router.post("/", loginValidate, ValidationController.index_);

export default router;
