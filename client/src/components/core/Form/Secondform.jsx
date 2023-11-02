import React, { useState } from "react";

export default function SecondForm({ onNext, onUpdate }) {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNext = () => {
    // Check if username and mobile are filled before proceeding to the next stage
    if (username && mobile) {
      // Update user information
      onUpdate({ name: username, number: mobile });
      onNext();
    } else {
      alert("Please fill in both username and mobile fields.");
    }
  };

  return (
    <div className="w-11/13  max-w-maxContent flex-col items-center justify-between gap-3 border-black">
      <label htmlFor="username" className="block text-lg font-semibold">
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mt-2"
      />

      <label htmlFor="mobile" className="block text-lg font-semibold mt-4">
        Mobile Number:
      </label>
      <input
        type="text"
        id="mobile"
        name="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mt-2"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
