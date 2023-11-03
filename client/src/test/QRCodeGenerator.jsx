import { useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import axios from "axios"; // Import Axios for making API requests
import "./QRCodeGenerator.css"; // Create a separate CSS file for styling

function PosterContent({ qrCodeValue }) {
  return (
    <div className="bg-white p-6 m-4 rounded-lg shadow-lg text-center poster-Image">
      <h1 className="text-2xl font-bold my-4">
        Give Feedback by Scanning Below QR Code
      </h1>
      <QRCode
        id="qrCodeEl"
        size={350}
        value={qrCodeValue}
        className="my-5 mx-auto"
      />
    </div>
  );
}

function QRCodeGenerator() {
  const [qrCodeValue, setQrCodeValue] = useState("Created By Vinayak Vispute");
  const [station, setStation] = useState("65434a628dd05cd95662e37a");
  const [creator, setCreator] = useState("65434a628dd05cd95662e37a");
  const [qrCodeImageFile, setQrCodeImageFile] = useState(null);
  const [posterImageFile, setPosterImageFile] = useState(null);

  const downloadPoster = () => {
    if (posterImageFile) {
      const posterURL = URL.createObjectURL(posterImageFile);
      let aEl = document.createElement("a");
      aEl.href = posterURL;
      aEl.download = "QR_Code_Poster.png";
      aEl.click();
    }
  };

  const downloadQRCode = () => {
    if (qrCodeImageFile) {
      const qrCodeURL = URL.createObjectURL(qrCodeImageFile);
      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = "QR_Code.png";
      aEl.click();
    }
  };

  const saveAndDownload = async () => {
    if (qrCodeImageFile && posterImageFile) {
      try {
        // Make an API request to save the data (station, creator, and images)
        const formData = new FormData();
        formData.append("station", station);
        formData.append("creator", creator);
        formData.append("qrCodeImageFile", qrCodeImageFile);
        formData.append("posterImageFile", posterImageFile);

        const response = await axios.post("/api/createQRCode", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // After saving the data, trigger the downloadPoster and downloadQRCode functions
        downloadPoster();
        downloadQRCode();
      } catch (err) {
        console.error("Failed to save and download", err);
      }
    }
  };

  return (
    <>
      <div id="poster">
        <PosterContent qrCodeValue={qrCodeValue} />
      </div>
      <div className="my-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPosterImageFile(e.target.files[0])}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setQrCodeImageFile(e.target.files[0])}
        />
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded"
          onClick={downloadPoster}
        >
          Download Poster
        </button>
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded ml-4"
          onClick={downloadQRCode}
        >
          Download QR Code
        </button>
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded ml-4"
          onClick={saveAndDownload}
        >
          Save and Download
        </button>
      </div>
    </>
  );
}

export default QRCodeGenerator;
