const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { create } = require("../models/User");
const { createSession, getMySessions, getSessionsById, deleteSession } = require("../controllers/sessionController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Sessions API is working!" });
});

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionsById);
router.delete("/:id", protect, deleteSession);

module.exports=router;

