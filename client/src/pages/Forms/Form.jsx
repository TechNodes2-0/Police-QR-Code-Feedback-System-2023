import React, { useState } from "react";
import FirstForm from "../../components/core/Form/FirstForm";
import SecondForm from "../../components/core/Form/SecondForm";
import HeroSection from "../../components/core/Form/HeroSection";
import DemoForm from "../../components/core/Form/DemoForm";

export default function Form() {
  const [currentStage, setCurrentStage] = useState(1);

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(currentStage - 1);
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return <FirstForm onNext={handleNext} />;
      case 2:
        return <SecondForm onNext={handleNext} onPrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-100 relative mx-auto flex w-screen max-w-maxContent flex-col items-center justify-between mt-0 text-black">
      <HeroSection />
      {renderCurrentStage()}
    </div>
  );
}
