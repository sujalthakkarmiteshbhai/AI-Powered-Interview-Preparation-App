const Question = require("../models/question");
const Session = require("../models/session");

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Session ID and questions are required" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const newQuestions = questions.map((q) => ({
      session: sessionId,
      question: q.question,
      answer: q.answer,
    }));

    const createdQuestions = await Question.insertMany(newQuestions);

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({
      message: "Questions added successfully",
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("addQuestionsToSession error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.pinned = !question.pinned;
    await question.save();

    res.status(200).json({
     success: true ,
      question,
    });
  } catch (error) {
    console.error("togglePinQuestion error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({
      message: "Note updated successfully",
      question,
    });
  } catch (error) {
    console.error("updateQuestionNote error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};