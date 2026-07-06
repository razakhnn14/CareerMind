import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentId: String,
    orderId: String,
    credits: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);