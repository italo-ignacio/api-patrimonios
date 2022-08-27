import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import * as patrimonyController from "../controllers/PatrimonyController";

const router = new Router();

router.post("/", loginRequired, patrimonyController.store_);
router.get("/", patrimonyController.index_);
router.get("/:id", patrimonyController.show_);
router.put("/:id?", loginRequired, patrimonyController.update_);
router.delete("/:id?", loginRequired, patrimonyController.delete_);

export default router;
