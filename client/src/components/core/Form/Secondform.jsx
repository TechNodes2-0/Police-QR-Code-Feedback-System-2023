import React, { useState } from "react";

function SecondForm() {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNext = () => {
    // Check if username and mobile are filled before proceeding to the next stage
    if (username && mobile) {
      onNext();
    } else {
      alert("Please fill in both username and mobile fields.");
    }
  };

  return (
    <div>
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
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover-bg-blue-600 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default SecondForm;
