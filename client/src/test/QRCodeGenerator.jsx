import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { FaRegHandPointDown } from "react-icons/fa";
import html2canvas from "html2canvas";
import PoliceStationOptions from "./components/PoliceStationOptions";

function QRCodeGenerator() {
  function randomIdGenerator() {
    const randomString = generateRandomString(10);
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    return randomString + formattedDate;
  }
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [showPoster, setShowPoster] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [station, setStation] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [customId, setCustomId] = useState(randomIdGenerator());
  useEffect(() => {
    const fetchPoliceStation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/police-stations`
        );
        const policeStationData = response.data.data;
        setStation(policeStationData);
      } catch (error) {
        console.error("Failed to fetch police stations", error);
      }
    };

    fetchPoliceStation();
  }, []);

  const handleFileUpload = (file) => {
    if (file) {
      setUploadedImage(file);
      setImageSelected(true);
    }
  };

  function generateRandomString(length) {
    const unique_id = uuid();
    return unique_id.slice(0, length + 1).replace(/-/g, "");
  }

  const handleImageUpload = async () => {
    if (uploadedImage) {
      try {
        const formData = new FormData();
        formData.append("customId", customId);
        formData.append("qrCodeImageFile", uploadedImage);
        formData.append("creator", "6544707c081f2699151310f9");
        formData.append("station", selectedStation);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qrcodes/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image saved to the database");
      } catch (error) {
        console.error("Failed to save the image", error);
      }
    }
  };

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/qrcodes/generate/`,
        {
          url: `${import.meta.env.VITE_WEBSITE_DOMAIN_QRCODE + customId}`,
        }
      );

      const qrCodeImageData = response.data;
      setQrCodeImage(qrCodeImageData);
      setShowPoster(true);
    } catch (error) {
      console.error("Failed to generate QR code", error);
      alert("Failed to generate QR code");
      setQrCodeImage(null);
    }
  };

  const downloadQRCode = () => {
    const aEl = document.createElement("a");
    aEl.href = qrCodeImage;
    aEl.download = "QR_Code.png";
    aEl.click();
  };

  const downloadPoster = async () => {
    if (imageSelected) {
      try {
        await handleImageUpload(); // Wait for the image upload to complete

        const posterItem = document.querySelector(".poster-item");

        html2canvas(posterItem).then((canvas) => {
          const posterDataURL = canvas.toDataURL("image/png");

          const aEl = document.createElement("a");
          aEl.href = posterDataURL;
          aEl.download = "QR_Code_Poster.png";
          aEl.click();
        });
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-2xl p-6 bg-white rounded-xl shadow-xl">
        <div className="mb-6 text-2xl font-bold text-center">
          Generate QR Code Poster
        </div>
        <div className="mb-4">
          <PoliceStationOptions
            options={station}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        <button
          className="px-4 py-2 translate transition duration-200 bg-blue-2 hover:bg-blue-3 hover:shadow-xl text-white rounded w-full"
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>
        {showPoster && (
          <div className="mt-6 text-center">
            <div className="border rounded-xl shadow-xl mb-4 p-6 bg-blue-500 text-black poster-item">
              <div className="flex items-center mb-4">
                <span className="font-semibold text-2xl">
                  Give feedback by Scanning this QR Code
                </span>
                <FaRegHandPointDown className="text-2xl ml-2" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="text-black text-lg mb-2">
                  <span className="font-bold">Station :</span> {selectedStation}
                </div>
                <div className="text-black text-lg mb-2">
                  <span className="font-bold">Phone:</span> Your Phone Number
                </div>
                <div className="text-black text-lg mb-4">
                  <span className="font-bold">Location:</span> Your Location
                </div>
              </div>
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="mx-auto w-3/4 max-w-xs"
              />
            </div>

            <div className="flex flex-col items-center">
              <button
                className="w-full px-4 py-2 translate transition duration-200 bg-blue-2 hover:bg-blue-3 hover:shadow-xl text-white rounded m-2"
                onClick={downloadQRCode}
              >
                Download QR Code
              </button>
              <button
                className={`w-full px-4 py-2 translate transition duration-200 ${
                  imageSelected ? "bg-blue-2 hover:bg-blue-3" : "bg-grayy"
                } text-white rounded m-2`}
                onClick={downloadPoster}
                disabled={!imageSelected}
              >
                Download Poster
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRCodeGenerator;
