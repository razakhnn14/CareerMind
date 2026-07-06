import { PDFParse } from "pdf-parse";
import Interview from "../models/interview.model.js";
import User from "../models/user.model.js";
import { generateQuestions, generateReport } from "../utils/openai.js";

// POST /api/interview/start
export const startInterview = async (req, res) => {
  try {
    const { role, experience } = req.body;
    const resumeFile = req.file;

    if (!role || !experience || !resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Role, experience, and resume are required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.credits < 1) {
      return res.status(400).json({
        success: false,
        message: "Not enough credits. Please purchase more.",
      });
    }

    const parser = new PDFParse({ data: resumeFile.buffer });
    const { text } = await parser.getText();
    const resumeText = text || "";

    const questions = await generateQuestions(role, experience, resumeText);

    // Interview is created as "abandoned" by default — it only flips to
    // "completed" once submitInterview() succeeds. No separate abandon
    // endpoint/call is needed.
    const interview = await Interview.create({
      user: req.user.id,
      role,
      experience,
      questions,
      status: "abandoned",
    });

    user.credits -= 1;
    user.totalSessions +=1;
    await user.save();

    res.json({
      success: true,
      interviewId: interview._id,
      questions: interview.questions,
      credits: user.credits, 
      totalSessions: user.totalSessions// send back so frontend can sync Redux without refetching
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to start interview" });
  }
};

// POST /api/interview/:id/submit
export const submitInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: "Answers are required" });
    }

    const interview = await Interview.findOne({ _id: id, user: req.user.id });
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    const report = await generateReport(
      interview.role,
      interview.experience,
      interview.questions,
      answers
    );

    interview.answers = answers;
    interview.report = report;
    interview.status = "completed";
    await interview.save();

    res.json({ success: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to submit interview" });
  }
};

// GET /api/interview/history
export const getHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, interviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
};

// GET /api/interview/:id/report
export const getReport = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({ _id: id, user: req.user.id });
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    if (interview.status !== "completed") {
      return res.status(400).json({ success: false, message: "Interview not completed yet" });
    }

    res.json({ success: true, interview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch report" });
  }
};
