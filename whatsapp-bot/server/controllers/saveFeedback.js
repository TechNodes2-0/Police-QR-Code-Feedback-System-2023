// whatsappBot.js
import Feedback from "../models/feedbackModel";

// Handle user feedback and save it to MongoDB
const saveUserFeedback = async (req, res, next) => {
  try {
    const { user, message } = req.body;

    // Create a new feedback document and save it
    const feedback = new Feedback({ user, message });
    await feedback.save();

    // Respond to the user or perform other actions as needed

    res.status(200).send("Feedback saved successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveUserFeedback,
  // other functions related to WhatsApp bot
};
