const express = require("express");
const router = express.Router();
const QRCode = require("../models/qrCodeModel"); // Import your QRCode model

// Create a new QR Code
const addQRCode = async (req, res) => {
  try {
    const { station, creator } = req.body;
    console.log(station, station);
    const qrCodeImageFile = req.files.qrCodeImageFile; // Assuming you have a field named 'qrCodeImage' in your request for QR code image
    const posterImageFile = req.files.posterImageFile; // Assuming you have a field named 'posterImage' in your request for poster image

    // Check if the file types are supported
    const supportedTypes = ["jpg", "jpeg", "png"];
    const qrCodeImageFileType = qrCodeImageFile.name
      .split(".")[1]
      .toLowerCase();
    const posterImageFileType = posterImageFile.name
      .split(".")[1]
      .toLowerCase();

    console.log(qrCodeImageFileType, posterImageFileType);
    if (
      !isFileTypeSupported(qrCodeImageFileType, supportedTypes) ||
      !isFileTypeSupported(posterImageFileType, supportedTypes)
    ) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Upload QR code image to Cloudinary
    const qrCodeImageResponse = await uploadFileToCloudinary(
      qrCodeImageFile,
      "QRCodeImages"
    );

    // Upload poster image to Cloudinary
    const posterImageResponse = await uploadFileToCloudinary(
      posterImageFile,
      "PosterImages"
    );

    const newQRCode = await QRCode.create({
      station,
      qrCodeImageURL,
      creator,
    });
    console.log(newQRCode);
    res.status(201).json({
      success: true,
      message: "QR Code added successfully",
      data: newQRCode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add QR Code",
      error: err.message,
    });
  }
};

// Get all QR Codes
const getAllQRCodes = async (req, res) => {
  try {
    const qrcodes = await QRCode.find();
    res.status(200).json({
      success: true,
      message: "QR Code Data fetched Successfully",
      data: qrcodes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch QR Codes",
      error: err.message,
    });
  }
};

// Get a specific QR Code by ID
const getQRCodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const qrcode = await QRCode.findById(id);
    if (!qrcode) {
      return res
        .status(404)
        .json({ success: false, message: "QR Code not found" });
    }
    res.status(200).json({
      success: true,
      message: "QR Code Data fetched Successfully",
      data: qrcode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch QR Code",
      error: err.message,
    });
  }
};

// Update a QR Code by ID
const updateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { station, qrCodeImageURL, creator } = req.body;

    const updatedQRCode = await QRCode.findByIdAndUpdate(
      id,
      {
        station,
        qrCodeImageURL,
        creator,
      },
      { new: true }
    );

    if (!updatedQRCode) {
      return res
        .status(404)
        .json({ success: false, message: "QR Code not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedQRCode,
      message: "QR Code Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update QR Code",
      error: err.message,
    });
  }
};

// Delete a QR Code by ID
const deleteQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQRCode = await QRCode.findByIdAndRemove(id);
    if (!deletedQRCode) {
      return res
        .status(404)
        .json({ success: false, message: "QR Code not found" });
    }
    res.status(200).json({
      success: true,
      message: "QR Code deleted successfully",
      data: deletedQRCode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete QR Code",
    });
  }
};

module.exports = {
  getAllQRCodes,
  getQRCodeById,
  addQRCode,
  deleteQRCode,
  updateQRCode,
};
