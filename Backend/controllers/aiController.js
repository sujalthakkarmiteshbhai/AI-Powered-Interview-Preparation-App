const  Groq = require("groq-sdk") ;
//  const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt,questionAnswerPrompt} = require("../utils/prompt");


require("dotenv").config();


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// @desc    Generate interview questions based on a topic
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, numberOfQuestions } = req.body;
    const topicToFocus = req.body.topicToFocus || req.body.topicsToFocus;

    if (!role || !experience || !topicToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "All fields are required" });
    }




const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);

const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  model: "llama-3.3-70b-versatile",
});
console.log("Raw AI response:", completion);
const response = completion.choices[0]?.message?.content;
    // const model = genai.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    // const response = await model.generateContent(prompt);

let rawText = response;
//      const cleantext = rawText
//       .replace(/^```json\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();


    const data = JSON.parse(rawText);
    console.log("Parsed AI response:", data);
    res.status(200).json({ questions: data.questions });
  } catch (error) {
    console.error("generateInterviewQuestions error:", error);
    res.status(500).json({ message: "AI Error" });
  }
};


// @desc    Generate a concept explanation
// @route   POST /api/ai/generate-explanation
// @access  Private

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const prompt = conceptExplainPrompt(question);

      const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  model: "llama-3.3-70b-versatile",
  response_format: { type: "json_object" },
});

    const response =
      completion.choices[0]?.message?.content || "";

    let rawText = response;

    const cleantext = rawText
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    const data = JSON.parse(cleantext);

    res.status(200).json(data);
  } catch (error) {
    console.error(
      "generateConceptExplanation error:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


  module.exports = { generateInterviewQuestions, generateConceptExplanation }