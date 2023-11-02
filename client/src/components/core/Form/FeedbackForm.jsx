import React, { useState } from "react";
import { FaSmile, FaMeh, FaFrown, FaSadCry } from "react-icons/fa";

const icons = {
  verySatisfied: <FaSmile />,
  satisfied: <FaMeh />,
  neutral: <FaMeh />,
  dissatisfied: <FaFrown />,
  veryDissatisfied: <FaSadCry />,
};

const questions = {
  en: [
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
  ],
  hi: [
    {
      question:
        "आपके समुदाय में पुलिस सेवाओं के साथ आपके कुल संतोष को आप किस प्रकार से मूल्यांकित करेंगे?",
      key: "satisfaction",
    },
    {
      question:
        "पुलिस के समुदाय के मुद्दों को संबोधन करने में पुलिस की जवाबदेही को आप कैसे मूल्यांकित करेंगे?",
      key: "responsiveness",
    },
    {
      question:
        "क्या आपको लगता है कि पुलिस समुदाय के साथ प्रभावी रूप से संवाद करती है और निवासियों को सुरक्षा मुद्दों और पहल के बारे में सूचित करती है?",
      key: "communication",
    },
    {
      question:
        "आपके समुदाय में पुलिस पर जोर किस प्रकार की आस्था है?",
      key: "trust",
    },
    {
      question: "क्या आप पुलिस के खिलाफ घटनाओं या शिकायतों की रिपोर्ट करने की प्रक्रिया से कितने संतुष्ट हैं?",
      key: "reporting",
    },
  ],
  gu: [
    {
      question:
        "તમારી જમીન સમુદાયમાં પોલીસ સેવાઓ સાથે તમારી મુલાકાતની કુલ સંતોષ તમે કેવી રીતે મूલ્યાંકિત કરો છો?",
      key: "satisfaction",
    },
    {
      question:
        "કેમ પોલીસ સમુદાયના ચિંતાઓ નો સમાધાન કરવા માં પોલીસની પ્રતિસાદકારતાનો રેટ કેમ આપો છો?",
      key: "responsiveness",
    },
    {
      question:
        "શું તમારું લાગણીઓ અને પ્રયાસો વિશે સમુદાયને સફાઈથી મામ રાખવા અને નિવાસીઓને સુરક્ષા વિચારો અને યોजનાઓ વિશે સાચાણ પર પોલીસ દ્વારા પ્રભાવશાળી રીતે સંવાદ કરે છે?",
      key: "communication",
    },
    {
      question: "તમારું સમુદાય પોલીસ પર કેટલીક આસથા છે, આ વિશે તમને કેવી રીતે કરવી છે?",
      key: "trust",
    },
    {
      question:
        "પોલીસ વિરુદ્ધ ઘટનાઓ અથવા શિકાયતો ની રિપોર્ટ કરવાની પ્રક્રિયા પર તમારું કેટલું આનંદ છે?",
      key: "reporting",
    },
  ],
};

export default function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  const handleIconSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const renderIcons = (questionKey) => {
    const currentQuestions = questions[selectedLanguage];

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
              className={`block text-2xl mx-2 ${
                feedbackData[questionKey] === value
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              {icons[value]}
              <br />
              {value}
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

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Police Services Feedback</h1>
      <div className="mb-4">
        <label className="mr-2">Select Language:</label>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarati</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        {questions[selectedLanguage].map((q) => (
          <div className="mb-4 space-y-2" key={q.key}>
            <h2 className="text-2xl font-medium mb-2">{q.question}</h2>
            {renderIcons(q.key)}
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Submit your Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
