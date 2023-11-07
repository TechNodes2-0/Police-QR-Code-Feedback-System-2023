import React, { useState, useEffect, useRef } from "react";
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
  ],
  gu: [
    {
      question:
        "આપની પોલીસ સ્થળમાં કેટલીક સમય આપની સાથે મુલાકાત મેળવવામાં કેટલો સમય લાગ્યો?",
      key: "time",
      options: [
        { value: "10 મિનિટ થયા પર", label: "10 મિનિટ થયા પર" },
        { value: "10 અને 15 મિનિટ વચ્છે", label: "10 અને 15 મિનિટ વચ્છે" },
        { value: "15 મિનિટ થયા પર", label: "15 મિનિટ થયા પર" },
      ],
    },
    {
      question:
        "પોલીસ સ્થળમાં પોલીસ સાથે સંપર્ક કરવામાં કેવું અનુભવ આવ્યું છે?",
      key: "communication1",
      options: [
        { value: "શ્રેષ્ઠ", label: "શ્રેષ્ઠ" },
        { value: "સારું", label: "સારું" },
        { value: "સંતોષજનક", label: "સંતોષજનક" },
        { value: "મધ્યમ", label: "મધ્યમ" },
        { value: "ખરાબ", label: "ખરાબ" },
      ],
    },
    {
      question:
        "પોલીસ સ્થળમાંની સાફસફાઇ અને સારાં રાખવાનો આપેલું સ્તર તમે કેવું મૂલ્યાંકન આપો છો?",
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
        "ક્યારેક પોલીસ સમાચારવાહક છે કે નાગરિકોને સુરક્ષા વિષયો અને પ્રયાસો વિશે પોલીસ અદ્યતન રીતે મેળવવામાં પ્રભાવશાળી છે કે નહીં?",
      key: "awareness",
      options: [
        { value: "ખૂબ પ્રભાવશાળી", label: "ખૂબ પ્રભાવશાળી" },
        { value: "પ્રભાવશાળી", label: "પ્રભાવશાળી" },
        { value: "મધ્યસ્થ", label: "મધ્યસ્થ" },
        { value: "અપ્રભાવશાળી", label: "અપ્રભાવશાળી" },
        { value: "ખૂબ અપ્રભાવશાળી", label: "ખૂબ અપ્રભાવશાળી" },
      ],
    },
    {
      question: "તમે પોલીસને વિશ્વાસ કરનું કેવું છે, તમારું અનુભવ આ આધાર પર?",
      key: "trust",
      options: [
        { value: "ખૂબ વિશ્વાસ", label: "ખૂબ વિશ્વાસ" },
        { value: "વિશ્વાસ", label: "વિશ્વાસ" },
        { value: "મધ્યસ્થ", label: "મધ્યસ્થ" },
        { value: "અવિશ્વાસ", label: "અવિશ્વાસ" },
        { value: "ખૂબ અવિશ્વાસ", label: "ખૂબ અવિશ્વાસ" },
      ],
    },
  ],
};

export default function FeedbackForm() {
  const { user, signOut, station } = useAuth();
  const [feedbackData, setFeedbackData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedStation, setSelectedStation] = useState("");
  const [textInput, setTextInput] = useState(""); // State variable for the text input
  const handleOptionSelect = (question, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [question]: value,
    }));
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
  };

  const renderOptions = (questionKey, options) => {
    return options.map((option) => (
      <div key={option.value} className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="radio"
            name={`${questionKey}_${option.value}`}
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
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex + 3 < questions[selectedLanguage].length
        ? prevIndex + 3
        : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex - 3 >= 0 ? prevIndex - 3 : prevIndex
    );
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentQuestionIndex(0);
  };

  const [policeStations, setPoliceStations] = useState([]);

  // Fetch police stations from the API
  useEffect(() => {
    // selectedStation = policeStationsLocalStation;
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

    // fetchPoliceStations();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the 'station' from localStorage
      const localstation = localStorage.getItem("Policestation");
      console.log("localstation",typeof localstation,localstation);
      const stationObject = JSON.parse(localstation);
      console.log("stationObject",typeof stationObject,stationObject);
      const stationID = stationObject.station;
       console.log("stationID",typeof stationID,stationID);

      const FormfeedbackData = {
        stationID: stationID,
        mobileNumber: user.phoneNumber,
        questions: questions[selectedLanguage].map((q) => ({
          question: q.question,
          answer: feedbackData[q.key],
        })),
        feedback: textInput,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback/postfeedback`,
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
              {station}
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

            {currentQuestionIndex > 0 && (
              <div className="my-10 py-5 border-0 max-sm:px-2 px-10  rounded-xl  shadow-md hover:shadow-xl">
                <h2 className="text-md sm:text-lg lg:text-md font-medium mb-2">
                  Enter your text feedback:
                </h2>
                <input
                  type="text"
                  id="textInput"
                  name="textInput"
                  value={textInput}
                  onChange={handleTextInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

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
