const mongoose = require("mongoose");
const Feedback = require("../models/feedbackModel"); // Import your Feedback model

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://VinayakVispute:Admin%402023@nodejsexpressjsprojects.pbdp0vj.mongodb.net/QRCODEFEEDBACKSYSTEM?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const stationIDs = [
  "6544b7c03a8beba81471595b",
  "6544b7d53a8beba81471595e",
  "6544b7db3a8beba814715961",
  "6544b7e23a8beba814715964",
  "6544b7ec3a8beba814715967",
  "6544b7f33a8beba81471596a",
  "6544b7fa3a8beba81471596d",
  "6544b8013a8beba814715970",
  "6544b8073a8beba814715973",
  "6544b8223a8beba814715977",
  "6544b82c3a8beba81471597a",
  "6544b8323a8beba81471597d",
  "6544b8383a8beba814715980",
  "6544b8493a8beba814715983",
  "6544b8533a8beba814715986",
  "6544b8593a8beba814715989",
  "6544b8603a8beba81471598c",
  "6544b8673a8beba81471598f",
  "6544b87f3a8beba814715992",
  "6544b88a3a8beba814715995",
  "6544b88e3a8beba814715998",
];

const en = [
  {
    question: "After How much time you are heard in Police Station?",
    key: "time",
    options: [
      { value: "Less than 10 minutes", label: "Less than 10 minutes" },
      {
        value: "Between 10 and 15 minutes",
        label: "Between 10 and 15 minutes",
      },
      { value: "More than 15 minutes", label: "More than 15 minutes" },
    ],
  },
  {
    question:
      "How would you describe your overall experience when communicating with the police at the station?",
    key: "communication",
    options: [
      { value: "Excellent", label: "Excellent" },
      { value: "Good", label: "Good" },
      { value: "Satisfactory", label: "Satisfactory" },
      { value: "Poor", label: "Poor" },
      { value: "Very Poor", label: "Very Poor" },
    ],
  },
  {
    question:
      "How would you rate the overall cleanliness and maintenance of the police station premises?",
    key: "cleanliness",
    options: [
      { value: "5", label: "🌟🌟🌟🌟🌟" },
      { value: "4", label: "🌟🌟🌟🌟" },
      { value: "3", label: "🌟🌟🌟" },
      { value: "2", label: "🌟🌟" },
      { value: "1", label: "🌟" },
    ],
  },
  {
    question:
      "Do you think the police effectively keep residents informed about safety issues and initiatives?",
    key: "awareness",
    options: [
      { value: "Very Effective", label: "Very Effective" },
      { value: "Effective", label: "Effective" },
      { value: "Neutral", label: "Neutral" },
      { value: "Ineffective", label: "Ineffective" },
      { value: "Very Ineffective", label: "Very Ineffective" },
    ],
  },
  {
    question:
      "How would you rate the level of trust you have in the police based on your experience?",
    key: "trust",
    options: [
      { value: "Very Trusting", label: "Very Trusting" },
      { value: "Trusting", label: "Trusting" },
      { value: "Neutral", label: "Neutral" },
      { value: "Distrustful", label: "Distrustful" },
      { value: "Very Distrustful", label: "Very Distrustful" },
    ],
  },
];

async function pushRandomDataToDB() {
  await Feedback.deleteMany({});

  for (let i = 0; i < 500; i++) {
    const feedbackTime = new Date(
      2023, // Year
      10, // November (zero-based index)
      4 + Math.floor(Math.random() * 7), // Random day between 4th and 10th
      Math.floor(Math.random() * 24), // Random hour
      Math.floor(Math.random() * 60), // Random minute
      Math.floor(Math.random() * 60) // Random second
    );
    const feedback = new Feedback({
      userIDHash:
        "$2a$10$SclKhPpX1CKsDdl7ajILtuwOd3zBJVFukFNhRz.tRol7.KiOhyyaS", // Use any logic to generate user identifier
      feedbackTime, // Set the feedback time to the current time
      stationID: String(
        stationIDs[Math.floor(Math.random() * stationIDs.length)]
      ),
      questions: en.map((questionData) => ({
        question: questionData.question,
        answer:
          questionData.options[
            Math.floor(Math.random() * questionData.options.length)
          ].value,
      })),
    });
    await feedback
      .save()
      .then(() => console.log("Data saved ", i))
      .catch((err) => console.error("Error saving data:", err));
  }
}

pushRandomDataToDB().then(() => {
  console.log("Finished inserting data.");
  mongoose.connection.close();
});
