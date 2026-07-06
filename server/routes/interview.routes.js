import express from "express";
import multer from "multer";
import isAuth from "../middleware/auth.middleware.js"; // adjust to your actual auth middleware
import {
  startInterview,
  submitInterview,
  getHistory,
  getReport,
} from "../controllers/interview.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/start", isAuth, upload.single("resume"), startInterview);
router.post("/:id/submit", isAuth, submitInterview);
router.get("/history", isAuth, getHistory);
router.get("/:id/report", isAuth, getReport);

export default router;