import express from "express";
import { createOrder,verify } from "../controllers/payment.controller.js";
import isAuth from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/create-order",isAuth, createOrder);
router.post("/verify",isAuth, verify);


export default router;