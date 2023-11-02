import React, { useState } from "react";
import { FaSmile, FaMeh, FaFrown, FaSadCry } from "react-icons/fa";

const icons = {
  verySatisfied: <FaSmile />,
  satisfied: <FaMeh />,
  neutral: <FaMeh />, // You can customize this icon if needed
  dissatisfied: <FaFrown />,
  veryDissatisfied: <FaSadCry />,
};

const questions = [
  {
    question:
      "How would you rate your overall satisfaction with the police services in your community?",
    key: "satisfaction",
  },
  {
    question:
      "How would you rate the responsiveness of the police in addressing community concerns?",
    key: "responsiveness",
  },
  {
    question:
      "Do you think the police effectively communicate with the community and keep residents informed about safety issues and initiatives?",
    key: "communication",
  },
  {
    question:
      "How would you rate the level of trust you have in the police in your community?",
    key: "trust",
  },
  {
    question:
      "How satisfied are you with the process for reporting incidents or complaints against the police?",
    key: "reporting",
  },
];

export default function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState({});

  const handleIconSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const renderIcons = (questionKey, questionText) => {
    return (
      <div className="flex">
        {Object.keys(icons).map((value) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name={questionKey}
              value={value}
              checked={feedbackData[questionKey] === value}
              onChange={() => handleIconSelect(questionKey, value)}
              className="hidden"
            />
            <span
              className={`block text-4xl mx-2 ${
                feedbackData[questionKey] === value
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              {icons[value]}
              <br />
              {value} {/* Display the text */}
            </span>
          </label>
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the feedbackData to your backend or perform other actions here
  };

  return (
    <div className="max-w-xl mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Police Services Feedback</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div className="mb-4 space-y-2" key={q.key}>
            <label className="block  font-medium mb-2 text-2xl">
              {q.question}
            </label>
            <div className="font-sm  text-black">
              {renderIcons(q.key, q.question)}{" "}
              {/* Pass the question text to renderIcons */}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
