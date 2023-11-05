const Feedback = require("../models/feedbackModel");
const bcrypt = require("bcryptjs");
const PoliceStation = require("../models/policeStationModel");
// Controller function to save feedback
const saveFeedback = async (req, res) => {
  try {
    const { mobileNumber, questions, stationID, feedback } = req.body;
    const userIDHash = await bcrypt.hash(mobileNumber, 10);

    const newFeedback = await Feedback.create({
      userIDHash,
      questions,
      stationID,
      feedback,
    });

    res.status(201).json({
      success: true,
      message: "Feedback saved successfully",
      data: newFeedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save feedback",
      error: err.message,
    });
  }
};

// Controller function to get feedback
const getFeedback = async (req, res) => {
  try {
    const feedbackEntries = await Feedback.find().populate("stationID");

    res.status(200).json({
      success: true,
      message: "Feedback data fetched successfully",
      data: feedbackEntries,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback data",
      error: err.message,
    });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { questions } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { questions },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback entry updated successfully",
      data: updatedFeedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update feedback entry",
      error: err.message,
    });
  }
};

// Controller function to delete a feedback entry by ID
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndRemove(id);

    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback entry deleted successfully",
      data: deletedFeedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback entry",
      error: err.message,
    });
  }
};
const getFeedbackCountForOption = async (req, res) => {
  try {
    const { question, option } = req.query;

    const feedbackCount = await Feedback.find({ 'questions.question': question })

      // .where('questions.answer').equals(option)
      .countDocuments();

    const firstFeedback = await Feedback.findOne({});
    const { questions } = firstFeedback;
    console.log(feedbackCount)
    res.status(200).json({
      success: true,
      message: `Number of feedback entries with the option '${option}' selected for the question '${question}': ${feedbackCount}`,
      data: feedbackCount,
      questions,
      firstFeedback,
      option
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback count for the option",
      error: err.message,
    });
  }
};

const getFeedbackCountPerStation = async (req, res) => {
  try {
    const feedbackCounts = await Feedback.aggregate([
      {
        $group: {
          _id: "$stationID",
          count: { $sum: 1 },
        },
      },
    ]);
    const populatedFeedbackCounts = await Promise.all(
      feedbackCounts.map(async (item) => {
        const station = await PoliceStation.findById(item._id);
        return {
          _id: item._id,
          count: item.count,
          stationName: station ? station.StationName : 'Unknown', // Provide a default value if the station is not found
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Feedback counts per police station fetched successfully",
      data: populatedFeedbackCounts
      
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback counts per police station",
      error: err.message,
    });
  }
};

module.exports = {
  saveFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackCountForOption,
  getFeedbackCountPerStation

};





