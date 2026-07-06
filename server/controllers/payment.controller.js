import crypto from "crypto";
import User from "../models/user.model.js";
import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.model.js";
 
export const createOrder = async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const options = {
      amount: amount * 100, // Razorpay accepts amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    console.log(order);
    return res.json({ success: true, order });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
 
export const verify = async (req, res) => {
 
  const userId = req.user.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    credits,
    price,
  } = req.body;
 
  const body = razorpay_order_id + "|" + razorpay_payment_id;
 
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
 
  if (expectedSignature === razorpay_signature) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { credits: credits } },
        { returnDocument: "after" },
      );
 
      if (!updatedUser) {
        return res.json({
          success: false,
          message: "User not found while updating credits",
        });
      }
 
      await Payment.create({
        user: userId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        credits,
        price,
      });
 
      return res.json({
        success: true,
        message: "Payment verified and credits updated",
        credits: updatedUser.credits,
      });
    } catch (err) {
      console.error(err); // 🔑 log the real error instead of swallowing it
      return res.json({
        success: false,
        message: "Failed to update credits in database",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Invalid signature",
    });
  }
};
 