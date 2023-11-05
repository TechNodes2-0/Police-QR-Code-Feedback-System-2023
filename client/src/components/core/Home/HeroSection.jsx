import React from "react";

export default function HeroSection() {
  return (
    <div style={{ backgroundColor: "#87CEEB" }}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Qr Code Based Citizen Feedback System For Gujarat Police
          </h1>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-black">
            Provide feedback by scanning a QR code at your local Police Station.
            Help us improve policing in Gujarat.
          </p>
        </div>

        <div className="text-center"></div>
      </div>
    </div>
  );
}
