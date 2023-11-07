const express = require("express");
const router = express.Router();
const {getFeedbackCountForOption,getFeedback,updateFeedback,saveFeedback,deleteFeedback,getFeedbackCountPerStation,getFeedbackwithTime} = require("../controllers/feedbackControllers");

// Create a new feedback entry
router.post("/postfeedback", saveFeedback);

// Get all feedback entries
router.get("/CountForOption", getFeedbackCountForOption);
router.get("/CountForDay", getFeedbackwithTime);
router.get("/feedback", getFeedback);
router.get("/Countfeedback",getFeedbackCountPerStation);
router.put("/feedback/:id", updateFeedback);

// Delete a feedback entry by ID
router.delete("/deletefeedback/:id", deleteFeedback);


module.exports = router;
