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
            Provide feedback by scanning a QR code at your local Police Station. Help us improve policing in Gujarat.
          </p>
        </div>

        <div className="text-center">
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center" 
            style={{
              backgroundColor: "#2563eb",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)",
              border: "1px solid transparent",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: "500",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              outline: "none",
              transition: "box-shadow 0.3s, transform 0.2s",
            }}
            href="#"
          >
            Submit Feedback
            <svg
              className="w-2.5 h-2.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
