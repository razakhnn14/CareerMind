import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const idToken = req.cookies.token;

    if (!idToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(idToken, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id : decoded.id
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default isAuth;