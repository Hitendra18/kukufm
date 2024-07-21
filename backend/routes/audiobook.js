const express = require("express");
const {
  getAudiobooks,
  getSingleAudiobook,
} = require("../controllers/audiobook");

const router = express.Router();

router.get("/", getAudiobooks);
router.get("/:id", getSingleAudiobook);

module.exports = router;
