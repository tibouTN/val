const express = require("express");
const Memory = require("../models/Memory");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const memories = await Memory.find().sort({ order: 1, createdAt: 1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: "Could not load memories" });
  }
});

module.exports = router;
