import axios from "axios";

export const generateQuestions = async (role, experience, resumeText) => {
  try {
    const prompt = `
You are an interviewer. Generate exactly 5 interview questions for a candidate applying for the role of "${role}" with ${experience} years of experience.
Use the resume content below for context where relevant.

Resume:
${resumeText.slice(0, 3000)}

Return ONLY a JSON array of 5 strings, no preamble, no markdown. Example:
["question 1", "question 2", "question 3", "question 4", "question 5"]
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    const cleaned = content.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    throw new Error("OpenRouter API Error");
  }
};

export const generateReport = async (
  role,
  experience,
  questions,
  answers
) => {
  try {
    const qaPairs = questions
      .map(
        (q, i) =>
          `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "(no answer)"}`
      )
      .join("\n\n");

    const prompt = `
You are evaluating a mock interview for a "${role}" role, candidate has ${experience} years of experience.

${qaPairs}

Evaluate the answers and return ONLY a JSON object, no preamble, no markdown, in this exact shape:
{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence overall summary>",
  "strengths": ["<point 1>", "<point 2>"],
  "improvements": ["<point 1>", "<point 2>"]
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    const cleaned = content.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    throw new Error("OpenRouter API Error");
  }
};