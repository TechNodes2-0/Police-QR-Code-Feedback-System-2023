import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String, // You can use ObjectId or a custom ID format

    unique: true,
  },
  userIDHash: {
    type: String, // Hashed mobile number or user identifier
   
  },
  feedbackTime: {
    type: Date,
    default: Date.now,
  },
  stationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceStation",
    
  },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("Feedback", feedbackSchema);
