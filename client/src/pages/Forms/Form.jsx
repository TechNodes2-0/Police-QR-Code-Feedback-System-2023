import React, { useState } from "react";
import FirstForm from "../../components/core/Form/Firstform";
import SecondForm from "../../components/core/Form/Secondform";
import OTPForm from "../../components/core/Form/OTPForm";
import FeedbackForm from "../../components/core/Form/FeedbackForm"; // Import your FeedbackForm component
import InfoDisplay from "../../components/core/Form/InfoDisplay"; // Import your InfoDisplay component

export default function Form() {
  const [currentStage, setCurrentStage] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    number: "",
    selectedPoliceStation: "",
    otp: "",
  });

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(currentStage - 1);
  };

  const handleUserInfoUpdate = (data) => {
    setUserInfo({ ...userInfo, ...data });
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-blue-100 text-black gap-20">
      <img
        src="https://blogger.googleusercontent.com/img/a/AVvXsEgW_JkmdUfxlLBXuoLZBwRBmfo-CCmMmrcC3t_tyGrRmMalXHKjCI38cCfJZ7nV4f5panqPFpnRY2hIpfhsZKOlV6Yz_91lghVxwQJavgvR3ILawMOQHR0be9-TToG80SkN4kEYe9uCQssQf1-t5HTLoivphtc2OUuU2miuOTw06S9FGmkSSlvuLj2F=w311-h400"
        alt="user"
      />
      <div className="form-container m-10 gap-3 flex flex-col">
        <div className="form body">
          {currentStage === 1 && (
                  <SecondForm onNext={handleNext} onUpdate={handleUserInfoUpdate} />
          )}
          {currentStage === 2 && (
            <SecondForm onNext={handleNext} onUpdate={handleUserInfoUpdate} />
          )}
          {currentStage === 3 && (
            <OTPForm onNext={handleNext} onUpdate={handleUserInfoUpdate} />
          )}
          {currentStage === 4 && <FeedbackForm />} {/* Display FeedbackForm */}
          {currentStage === 5 && <InfoDisplay
            selectedPoliceStation={userInfo.selectedPoliceStation}
            username={userInfo.name}
            mobile={userInfo.number}
          />} {/* Display InfoDisplay */}
          {/* Add more stages as needed */}
        </div>
        <div className="footer flex flex-row mb-0 mx-auto">
          {currentStage > 1 && (
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white font-bold mx-2 my-4 py-2 px-4 rounded"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStage < 5 && (
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white font-bold mx-2 my-4 py-2 px-4 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
