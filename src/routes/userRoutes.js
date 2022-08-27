import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import * as UserController from "../controllers/UserController";

const router = new Router();

router.post("/", UserController.store_);
router.get("/", UserController.index_);
router.get("/:id", UserController.show_);
router.put("/:id?", loginRequired, UserController.update_);
router.delete("/:id?", loginRequired, UserController.delete_);

export default router;
