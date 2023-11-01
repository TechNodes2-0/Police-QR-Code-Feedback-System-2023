import React, { useState } from "react";

export default function FirstForm({ onNext, onUpdate }) {
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");
  const policeStations = [
    "Vadodara City Police Station",
    "Surat City Police Station",
    "Ahmedabad City Police Station",
    // Add more police stations as needed
  ];

  const handleNext = () => {
    // Check if a police station is selected before proceeding to the next stage
    if (selectedPoliceStation) {
      // Update user information
      onUpdate({ selectedPoliceStation });
      onNext(); // Call the onNext function to advance to the next stage
    } else {
      alert("Please select a police station.");
    }
  };

  return (
    <div className=" max-w-maxContent flex-col items-center justify-between gap-3 border-purple-600">
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
