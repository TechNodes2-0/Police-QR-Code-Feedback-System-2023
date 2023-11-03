import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const questions = {
  en: [
    {
      question:
        "How would you rate your overall satisfaction with the police services in your community?",
      key: "satisfaction",
      options: [
        { value: "verySatisfied", label: "verySatisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "veryDissatisfied", label: "Very Dissatisfied" },
      ],
    },
    {
      question:
        "How would you rate the responsiveness of the police in addressing community concerns?",
      key: "responsiveness",
      options: [
        { value: "verySatisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "veryDissatisfied", label: "Very Dissatisfied" },
      ],
    },
    {
      question:
        "Do you think the police effectively communicate with the community and keep residents informed about safety issues and initiatives?",
      key: "communication",
      options: [
        { value: "verySatisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "veryDissatisfied", label: "Very Dissatisfied" },
      ],
    },
    {
      question:
        "How would you rate the level of trust you have in the police in your community?",
      key: "trust",
      options: [
        { value: "verySatisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "veryDissatisfied", label: "Very Dissatisfied" },
      ],
    },
    {
      question:
        "How satisfied are you with the process for reporting incidents or complaints against the police?",
      key: "reporting",
      options: [
        { value: "verySatisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "veryDissatisfied", label: "Very Dissatisfied" },
      ],
    },
  ],
  hi: [
    {
      question:
        "आपके समुदाय में पुलिस सेवाओं के साथ आपके कुल संतोष को आप किस प्रकार से मूल्यांकित करेंगे?",
      key: "satisfaction",
      options: [
        { value: "verySatisfied", label: "बहुत संतुष्ट" },
        { value: "satisfied", label: "संतुष्ट" },
        { value: "neutral", label: "न्यूट्रल" },
        { value: "dissatisfied", label: "असंतुष्ट" },
        { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
      ],
    },
    {
      question:
        "पुलिस के समुदाय के मुद्दों को संबोधन करने में पुलिस की प्रतिक्रिया को आप कैसे मूल्यांकित करेंगे?",
      key: "responsiveness",
      options: [
        { value: "verySatisfied", label: "बहुत संतुष्ट" },
        { value: "satisfied", label: "संतुष्ट" },
        { value: "neutral", label: "न्यूट्रल" },
        { value: "dissatisfied", label: "असंतुष्ट" },
        { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
      ],
    },
    {
      question:
        "क्या आपको लगता है कि पुलिस समुदाय के साथ प्रभावी रूप से संवाद करती है और निवासियों को सुरक्षा मुद्दों और पहल के बारे में सूचित करती है?",
      key: "communication",
      options: [
        { value: "verySatisfied", label: "बहुत संतुष्ट" },
        { value: "satisfied", label: "संतुष्ट" },
        { value: "neutral", label: "न्यूट्रल" },
        { value: "dissatisfied", label: "असंतुष्ट" },
        { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
      ],
    },
    {
      question: "आपके समुदाय में पुलिस पर जोर किस प्रकार की आस्था है?",
      key: "trust",
      options: [
        { value: "verySatisfied", label: "बहुत संतुष्ट" },
        { value: "satisfied", label: "संतुष्ट" },
        { value: "neutral", label: "न्यूट्रल" },
        { value: "dissatisfied", label: "असंतुष्ट" },
        { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
      ],
    },
    {
      question:
        "क्या आप पुलिस के खिलाफ घटनाओं या शिकायतों की रिपोर्ट करने की प्रक्रिया से कितने संतुष्ट हैं?",
      key: "reporting",
      options: [
        { value: "verySatisfied", label: "बहुत संतुष्ट" },
        { value: "satisfied", label: "संतुष्ट" },
        { value: "neutral", label: "न्यूट्रल" },
        { value: "dissatisfied", label: "असंतुष्ट" },
        { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
      ],
    },
    // Add more questions and options as needed
  ],

  gu: [
    {
      question:
        "તમારી જમીન સમુદાયમાં પોલીસ સેવાઓ સાથે તમારી મુલાકાતની કુલ સંતોષ તમે કેવી રીતે મૂલ્યાંકિત કરો છો?",
      key: "satisfaction",
      options: [
        { value: "verySatisfied", label: "ખૂબ આનંદિત" },
        { value: "satisfied", label: "આનંદિત" },
        { value: "neutral", label: "મૂળભૂત" },
        { value: "dissatisfied", label: "અસંતુષ્ટ" },
        { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
      ],
    },
    {
      question:
        "કેમ પોલીસ સમુદાયના ચિંતાઓ નો સમાધાન કરવા માં પોલીસની પ્રતિસાદકારતાનો રેટ કેમ આપો છો?",
      key: "responsiveness",
      options: [
        { value: "verySatisfied", label: "ખૂબ આનંદિત" },
        { value: "satisfied", label: "આનંદિત" },
        { value: "neutral", label: "મૂળભૂત" },
        { value: "dissatisfied", label: "અસંતુષ્ટ" },
        { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
      ],
    },
    {
      question:
        "શું તમારું લાગણીઓ અને પ્રયાસો વિશે સમુદાયને સફાઈથી મામ રાખવા અને નિવાસીઓને સુરક્ષા વિચારો અને યોજનાઓ વિશે સાચાણ પર પોલીસ દ્વારા પ્રભાવશાળી રીતે સંવાદ કરે છે?",
      key: "communication",
      options: [
        { value: "verySatisfied", label: "ખૂબ આનંદિત" },
        { value: "satisfied", label: "આનંદિત" },
        { value: "neutral", label: "મૂળભૂત" },
        { value: "dissatisfied", label: "અસંતુષ્ટ" },
        { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
      ],
    },
    {
      question:
        "તમારું સમુદાય પોલીસ પર કેટલીક આસ્થા છે, આ વિશે તમને કેમ લાગે છે?",
      key: "trust",
      options: [
        { value: "verySatisfied", label: "ખૂબ આનંદિત" },
        { value: "satisfied", label: "આનંદિત" },
        { value: "neutral", label: "મૂળભૂત" },
        { value: "dissatisfied", label: "અસંતુષ્ટ" },
        { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
      ],
    },
    {
      question:
        "પોલીસ વિરુદ્ધ ઘટનાઓ અથવા શિકાયતો ની રિપોર્ટ કરવાની પ્રક્રિયા પર તમારું કેટલું આનંદ છે?",
      key: "reporting",
      options: [
        { value: "verySatisfied", label: "ખૂબ આનંદિત" },
        { value: "satisfied", label: "આનંદિત" },
        { value: "neutral", label: "મૂળભૂત" },
        { value: "dissatisfied", label: "અસંતુષ્ટ" },
        { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
      ],
    },
  ],
  // Add more questions and options as needed
};

export default function FeedbackForm() {
  const { user, signOut } = useAuth();
  const [feedbackData, setFeedbackData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const renderOptions = (questionKey, options) => {
    return options.map((option) => (
      <label key={option.value} className="cursor-pointer">
        <input
          type="radio"
          name={questionKey}
          value={option.value}
          checked={feedbackData[questionKey] === option.value}
          onChange={() => handleOptionSelect(questionKey, option.value)}
          className="hidden"
        />
        <span
          className={`flex-col justify-around items-center text-sm mx-2 ${
            feedbackData[questionKey] === option.value
              ? "text-[#ecc94b]"
              : "text-[#111827]"
          }`}
        >
          <div className="flex flex-col items-center justify-center mx-1 border-2 rounded-xl p-2 w-26">
            <br />
            {option.label}
          </div>
        </span>
      </label>
    ));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 3);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 3);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentQuestionIndex(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const FormfeedbackData = {
        stationID: "65434a7f8dd05cd95662e37f",
        mobileNumber: user.phoneNumber,
        questions: questions[selectedLanguage].map((q) => ({
          question: q.question,
          answer: feedbackData[q.key],
        })),
      };

      const response = await axios.post(
        "http://localhost:3000/feedback/postfeedback",
        FormfeedbackData
      );

      if (response.data.success) {
        console.log("Feedback submitted successfully");
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-lightblue min-h-screen">
      <div className="max-w-2xl mx-auto p-4 pt-5">
        <div className="mb-4 flex justify-between items-center py-2 px-5 bg-white border-0 rounded-xl shadow-xl">
          <div>
            <label className="mr-2 text-sm sm:text-base lg:text-md">Select Language:</label>
            <select
              className="bg-white border-0 text-sm sm:text-base lg:text-md"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
          {/* <button
            onClick={signOut}
            className="bg-red-500 my-4 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded text-sm sm:text-base lg:text-lg"
          >
            Log Out
          </button> */}
        </div>
        <div className="bg-white p-10 max-sm:px-5 border-0 rounded-xl shadow-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4">Give your feedback</h1>
          <form onSubmit={handleSubmit}>
            {questions[selectedLanguage]
              .slice(currentQuestionIndex, currentQuestionIndex + 3)
              .map((q) => (
                <div className="mb-4 space-y-2" key={q.key}>
                  <h2 className="text-md sm:text-lg lg:text-md font-medium mb-2">{q.question}</h2>
                  {renderOptions(q.key, q.options)}
                </div>
              ))}

            <div className="text-center my-5">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className={`border-2 rounded-full text-black transition duration-200 hover:bg-gray-100 font-bold py-1 px-5 text-sm sm:text-base lg:text-lg`}
                >
                  Previous
                </button>
              )}

              {currentQuestionIndex + 3 <
                questions[selectedLanguage].length && (
                <button
                  onClick={handleNext}
                  className={`border-2 rounded-full text-black transition duration-200 hover:bg-gray-100 font-bold py-1 px-5 text-sm sm:text-base lg:text-lg`}
                >
                  Next
                </button>
              )}
            </div>
            <div className="text-center">
              {currentQuestionIndex > 0 && (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-sm sm:text-base lg:text-lg"
                >
                  Submit your Feedback
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}