import React, { useState } from "react";

export default function OTPForm({ onNext, onUpdate }) {
  const [otp, setOTP] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const correctOTP = "123456"; // Hardcoded correct OTP for demonstration

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === correctOTP) {
      setIsVerified(true);
      // You can update user information here if needed
      onUpdate({ isVerified: true });
      onNext();
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div>
      {isVerified ? (
        <div>
          <p>You are verified!</p>
          {/* You can add further actions for the verified user here */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOTPChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
