import express from "express";
import { googleAuth, logOut } from "../controllers/auth.controller.js";
import isAuth from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/google", googleAuth);
router.post("/logout", isAuth,  logOut);


export default router;