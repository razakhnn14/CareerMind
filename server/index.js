import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import connectDb from "./config/connectDb.js";
import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import paymentRoutes from "./routes/payment.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes)
app.use("/api/payment", paymentRoutes)


app.listen(PORT,()=>{
    connectDb();
    console.log(`Listening on ${PORT}`)
})