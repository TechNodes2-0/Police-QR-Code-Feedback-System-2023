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
   const { question} = req.query;

    const feedbackCount = await Feedback.aggregate(
      [
        {
          $unwind: "$questions",
        },
        {
          $match: {
            "questions.question":
              `${question}`,
          },
        },
        {
          $group: {
            _id: "$questions.answer",
            count: {
              $sum: 1,
            },
          },
        },
      ]
    )

    
    console.log(feedbackCount)
    res.status(200).json({
      success: true,
      message: `Number of feedback entries with the selected for the question ${question} : `,
      data: feedbackCount,
      // questions,
      // firstFeedback,
      // option
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
        $lookup: {
          from: "policestations",
          localField: "stationID",
          foreignField: "_id",
          as: "Feedback",
        },
      },
      {
        $group: {
          _id: "$stationID",
          count: {
            $sum: 1,
          },
          StationName: {
            $first: "$Feedback.StationName",
          },
        },
      },
      {
        $project:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
            _id: 1,
            count: 1,
            StationName: {
              $arrayElemAt: ["$StationName", 0],
            },
          },
      },
    ]);
    

    res.status(200).json({
      success: true,
      message: "Feedback counts per police station fetched successfully",
      data: feedbackCounts,
      
      
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback counts per police station",
      error: err.message,
    });
  }
};
const getFeedbackwithTime =async(req,res)=>{
  try {
    const feedbackCounts = await Feedback.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$feedbackTime" },
            month: { $month: "$feedbackTime" },
            day: { $dayOfMonth: "$feedbackTime" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1
        }
      }
    ])
    res.status(200).json({
      success: true,
      message: "Feedback counts per day fetched successfully",
      data: feedbackCounts,
      
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback counts with time",
      error: err.message,
    });
  }
}

module.exports = {
  saveFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackCountForOption,
  getFeedbackCountPerStation,
  getFeedbackwithTime

};





