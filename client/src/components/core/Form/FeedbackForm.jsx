import React, { useState } from "react";
import { FaSmile, FaMeh, FaFrown, FaSadCry } from "react-icons/fa";

const icons = {
  verySatisfied: <FaSmile />,
  satisfied: <FaMeh />,
  neutral: <FaMeh />,
  dissatisfied: <FaFrown />,
  veryDissatisfied: <FaSadCry />,
};

export default function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState({
    satisfaction: "",
    responsiveness: "",
    communication: "",
    trust: "",
    reporting: "",
  });

  const handleIconSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const renderIcons = (question) => {
    return (
      <div className="flex">
        {Object.keys(icons).map((value) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name={question}
              value={value}
              checked={feedbackData[question] === value}
              onChange={() => handleIconSelect(question, value)}
              className="hidden"
            />
            <span
              className={`block text-4xl mx-2 ${
                feedbackData[question] === value ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              {icons[value]}
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            1. How would you rate your overall satisfaction with the police services in your community?
          </label>
          {renderIcons("satisfaction")}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            2. How would you rate the responsiveness of the police in addressing community concerns?
          </label>
          {renderIcons("responsiveness")}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            3. Do you think the police effectively communicate with the community and keep residents informed about safety issues and initiatives?
          </label>
          {renderIcons("communication")}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            4. How would you rate the level of trust you have in the police in your community?
          </label>
          {renderIcons("trust")}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            5. How satisfied are you with the process for reporting incidents or complaints against the police?
          </label>
          {renderIcons("reporting")}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
