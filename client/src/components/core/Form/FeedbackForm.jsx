import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const questions = {
  en: [
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
      key: "rating",
      options: [
        { value: "🌟🌟🌟🌟🌟", label: "🌟🌟🌟🌟🌟" },
        { value: "🌟🌟🌟🌟", label: "🌟🌟🌟🌟" },
        { value: "🌟🌟🌟", label: "🌟🌟🌟" },
        { value: "🌟🌟", label: "🌟🌟" },
        { value: "🌟", label: "🌟" },
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
      key: "reporting",
      options: [
        { value: "Very Trusting", label: "Very Satisfied" },
        { value: "Trusting", label: "Trusting" },
        { value: "Neutral", label: "Neutral" },
        { value: "Distrustful", label: "Distrustful" },
        { value: "Very Distrustful", label: "Very Distrustful" },
      ],
    },
  ],
  hi: [
    {
      question:
        "1. आपके समुदाय में पुलिस सेवाओं के साथ आपके कुल संतोष को आप किस प्रकार से मूल्यांकित करेंगे?",
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
        "2. पुलिस के समुदाय के मुद्दों को संबोधन करने में पुलिस की प्रतिक्रिया को आप कैसे मूल्यांकित करेंगे?",
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
        "3. क्या आपको लगता है कि पुलिस समुदाय के साथ प्रभावी रूप से संवाद करती है और निवासियों को सुरक्षा मुद्दों और पहल के बारे में सूचित करती है?",
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
      question: "4. आपके समुदाय में पुलिस पर जोर किस प्रकार की आस्था है?",
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
        "5. क्या आप पुलिस के खिलाफ घटनाओं या शिकायतों की रिपोर्ट करने की प्रक्रिया से कितने संतुष्ट हैं?",
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
        "1. તમારી જમીન સમુદાયમાં પોલીસ સેવાઓ સાથે તમારી મુલાકાતની કુલ સંતોષ તમે કેવી રીતે મૂલ્યાંકિત કરો છો?",
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
        "2. કેમ પોલીસ સમુદાયના ચિંતાઓ નો સમાધાન કરવા માં પોલીસની પ્રતિસાદકારતાનો રેટ કેમ આપો છો?",
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
        "3. શું તમારું લાગણીઓ અને પ્રયાસો વિશે સમુદાયને સફાઈથી મામ રાખવા અને નિવાસીઓને સુરક્ષા વિચારો અને યોજનાઓ વિશે સાચાણ પર પોલીસ દ્વારા પ્રભાવશાળી રીતે સંવાદ કરે છે?",
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
        "4. તમારું સમુદાય પોલીસ પર કેટલીક આસ્થા છે, આ વિશે તમને કેમ લાગે છે?",
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
        "5. પોલીસ વિરુદ્ધ ઘટનાઓ અથવા શિકાયતો ની રિપોર્ટ કરવાની પ્રક્રિયા પર તમારું કેટલું આનંદ છે?",
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
};

export default function FeedbackForm() {
  const { user, signOut } = useAuth();
  const [feedbackData, setFeedbackData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedStation, setSelectedStation] = useState("");
  const handleOptionSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const renderOptions = (questionKey, options) => {
    return options.map((option) => (
      <div key={option.value} className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="radio"
            name={questionKey}
            value={option.value}
            checked={feedbackData[questionKey] === option.value}
            onChange={() => handleOptionSelect(questionKey, option.value)}
            className="mr-2"
          />
          {option.label}
        </label>
      </div>
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

  const [policeStations, setPoliceStations] = useState([]);

  // Fetch police stations from the API
  useEffect(() => {
    const fetchPoliceStations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/police-stations`
        );
        setPoliceStations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoliceStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const FormfeedbackData = {
        stationID: selectedStation,
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
        // Handle successful feedback submission
        alert("Feedback submitted successfully");
        // You can also reset the feedback form or show a success message.
        console.log("Feedback submitted successfully");
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 pt-5">
        <div className="mb-4 flex justify-between items-center py-2 px-5 bg-[#FFFFFF] border-0 rounded-xl shadow-xl">
          <div>
            <label className="mr-2 text-sm sm:text-base lg:text-md">
              Select Language:
            </label>
            <select
              className="bg-[#FFFFFF] border-0 text-sm sm:text-base lg:text-md"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
        </div>
        <div className="bg-[#FFFFFF] p-10 max-sm:px-5 border-0 rounded-xl shadow-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4">
            Give your feedback
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="stationID" className="sr-only">
                stationID
              </label>
              <select
                id="stationID"
                name="stationID"
                placeholder="Select a Police Station"
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled>
                  Select a Police Station
                </option>
                {policeStations?.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station.StationName}
                  </option>
                ))}
              </select>
            </div>
            {questions[selectedLanguage]
              .slice(currentQuestionIndex, currentQuestionIndex + 3)
              .map((q) => (
                <div
                  className="my-10 py-5 border-0 max-sm:px-2 px-10  rounded-xl  shadow-md hover:shadow-xl"
                  key={q.key}
                >
                  <h2 className="text-md sm:text-lg lg:text-md font-medium mb-2">
                    {q.question}
                  </h2>
                  {renderOptions(q.key, q.options)}
                </div>
              ))}

            <div className="flex justify-between max-sm:flex-col mt-10">
              <div className="text-center ">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className={
                      "border-2 border-grayy hover:border-black-2 hover:shadow-xl   rounded-full text-black transition duration-200 hover:bg-gray-100 font-bold py-1 px-5 text-sm sm:text-base lg:text-lg"
                    }
                  >
                    Previous
                  </button>
                )}

                {currentQuestionIndex + 3 <
                  questions[selectedLanguage].length && (
                  <button
                    onClick={handleNext}
                    className={
                      "border-2 border-grayy hover:border-black-2 hover:shadow-xl  rounded-full text-black transition duration-200 hover:bg-gray-100 font-bold py-1 px-5 text-sm sm:text-base lg:text-lg"
                    }
                  >
                    Next
                  </button>
                )}
              </div>
              <div className="text-center">
                {currentQuestionIndex > 0 && (
                  <button
                    type="submit"
                    className=" bg-blue-2 hover:bg-blue-3 text-[#FFFFFF] font-bold py-1 px-5 rounded-xl translate transition duration-200 hover:shadow-xl text-sm sm:text-base lg:text-lg"
                  >
                    Submit your Feedback
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
