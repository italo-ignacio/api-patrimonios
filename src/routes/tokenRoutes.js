import { Router } from "express";
import * as tokenController from "../controllers/TokenController";

const router = new Router();

router.post("/", tokenController.store_);

export default router;
