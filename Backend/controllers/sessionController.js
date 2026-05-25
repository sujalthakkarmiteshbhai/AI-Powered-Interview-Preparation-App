const express = require("express");
const Session = require("../models/session");
const question = require("../models/question");

//@desc Create a new session
// @route POST /api/sessions/create
// @access Private

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicToFocus, description, questions } = req.body;
    const useId = req.user._id;

    // Validate questions array
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions must be a non-empty array", success: false });
    }

    // Create session
    const session = await Session.create({
      user: useId,
      role,
      experience,
      topicToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const questionDoc = await question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return questionDoc._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ message: "Session created successfully", success: true, session });
  } catch (e) {
    console.error("createSession error:", e);
    res.status(500).json({ message: "Server error", success: false, error: e.message });
  }
};

//@desc Get all sessions for the logged in user
// @route GET /api/sessions/my-sessions
// @access Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({ success: true, sessions });
  } catch (e) {
    console.error("getMySessions error:", e);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//@desc Get session by ID
// @route GET /api/sessions/:id
// @access Private
exports.getSessionsById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (e) {
    console.error("getSessionsById error:", e);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//@desc Delete session by ID
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this session" });
    }

    // First, delete all questions linked to this session
    await question.deleteMany({ session: session._id });

    // Then, delete the session
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (e) {
    console.error("deleteSession error:", e);
    res.status(500).json({ message: "Server error", success: false });
  }
};
