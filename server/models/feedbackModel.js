const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userIDHash: {
    type: String, // Hashed mobile number or user identifier
    required: true,
  },
  feedbackTime: {
    type: Date,
    default: Date.now,
  },
  stationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceStation",
    required: true,
  },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("Feedback", feedbackSchema);
