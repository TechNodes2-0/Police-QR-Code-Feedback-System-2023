import React, { useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import "./QRCodeGenerator.css"; // Create a separate CSS file for styling

function PosterContent() {
  return (
    <div className="bg-white p-6 m-4 rounded-lg shadow-lg text-center poster-Image">
      <h1 className="text-2xl font-bold my-4">
        Give Feedback by Scanning Below QR Code
      </h1>
      <QRCode
        id="qrCodeEl"
        size={350}
        value="Created By Vinayak Vispute"
        className="my-5 mx-auto"
      />
    </div>
  );
}

function QRCodeGenerator() {
  const downloadPoster = () => {
    const posterElement = document.getElementById("poster");
    html2canvas(posterElement).then((canvas) => {
      const posterURL = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let aEl = document.createElement("a");
      aEl.href = posterURL;
      aEl.download = "QR_Code_Poster.png";
      aEl.click();
    });
  };
  return (
    <>
      <div id="poster">
        <PosterContent />
      </div>
      <div className="my-4">
        <input
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          value="Download"
          onClick={downloadPoster}
        />
      </div>
    </>
  );
}

export default QRCodeGenerator;
