import User from "../models/user.model.js";
import { auth } from "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const idToken = authHeader.split(" ")[1];

    const decoded = await auth.verifyIdToken(idToken);

    const { uid, name, email } = decoded;

    let user = await User.findOne({
      firebaseUid: uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        name,
        email,
      });
    }

    const token = jwt.sign(
      { id: user._id, },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({success:true, message: "LogOut Successfully" });
  } catch (error) {
    return res.status(500).json({ success:false, message: `Logout error ${error}` });
  }
};
