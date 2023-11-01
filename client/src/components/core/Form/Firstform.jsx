import React, { useState } from "react";

function FirstForm({ onNext }) {
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");
  const policeStations = [
    "Police Station 1",
    "Police Station 2",
    "Police Station 3",
    // Add more police stations as needed
  ];

  const handleNext = () => {
    // Check if a police station is selected before proceeding to the next stage
    if (selectedPoliceStation) {
      onNext(); // Call the onNext function to advance to the next stage
    } else {
      alert("Please select a police station.");
    }
  };

  return (
    <div className="w-[1200px] max-w-maxContent flex-col items-center justify-between gap-3">
      <label htmlFor="policeStation" className="block text-lg font-semibold">
        Select a Police Station:
      </label>
      <select
        id="policeStation"
        name="policeStation"
        value={selectedPoliceStation}
        onChange={(e) => setSelectedPoliceStation(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mt-2"
      >
        <option value="">Select a police station</option>
        {policeStations.map((station, index) => (
          <option key={index} value={station}>
            {station}
          </option>
        ))}
      </select>
<div className="flex flex-row gap-3">
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Next
      </button>
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Previous
      </button>
      </div>
    </div>
  );
}

export default FirstForm;
