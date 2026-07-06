import express from "express";
import { getMe } from "../controllers/user.controller.js";
import isAuth from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/me", isAuth  , getMe);

export default router;