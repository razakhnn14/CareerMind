import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    experience: { type: Number, required: true },
    questions: [{ type: String, required: true }],
    answers: [{ type: String }],
    status: {
      type: String,
      enum: ["abandoned", "completed"],
      default: "abandoned",
    },
    report: {
      overallScore: Number,
      summary: String,
      strengths: [String],
      improvements: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);