import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import * as photoController from "../controllers/PhotoController";

const router = new Router();

router.put("/:id?", loginRequired, photoController.update_);

export default router;
