// whatsappBot.js
import Feedback from "../models/feedbackModel";

// Handle user feedback and save it to MongoDB
const saveUserFeedback = async (req, res) => {
  try {
    const { user } = req.body;
    console.log(user);

    // Create a new feedback document and save it
    const feedback = new Feedback.create({ user });
   

    // Respond to the user or perform other actions as needed
    console.log("Proceeded");
    res.status(200).send("Feedback saved successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while saving feedback.");
  }
};



export default saveUserFeedback;

