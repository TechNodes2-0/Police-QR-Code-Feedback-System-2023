const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackControllers");

// Create a new feedback entry
router.post("/postfeedback", feedbackController.saveFeedback);

// Get all feedback entries
router.get("/feedback", feedbackController.getFeedback);
router.get("/CountForOption", feedbackController. getFeedbackCountForOption);
router.put("/feedback/:id", feedbackController.updateFeedback);

// Delete a feedback entry by ID
router.delete("/deletefeedback/:id", feedbackController.deleteFeedback);


module.exports = router;
