const QRCode = require("../models/qrCodeModel");
const cloudinary = require("cloudinary").v2;
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");
// Create a new QR code
const createQRCode = async (req, res) => {
  try {
    const { station, creator } = req.body;
    const qrCodeImageFile = req.files.qrCodeImage; // Assuming you have a field named 'qrCodeImage' in your request for QR code image
    const posterImageFile = req.files.posterImage; // Assuming you have a field named 'posterImage' in your request for poster image

    // Check if the file types are supported
    const supportedTypes = ["jpg", "jpeg", "png"];
    const qrCodeImageFileType = qrCodeImageFile.name
      .split(".")[1]
      .toLowerCase();
    const posterImageFileType = posterImageFile.name
      .split(".")[1]
      .toLowerCase();

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
      qrCodeImageURL: qrCodeImageResponse.secure_url,
      posterImageURL: posterImageResponse.secure_url,
      creator,
    });

    res.status(201).json({
      success: true,
      message: "QR code created successfully",
      data: newQRCode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create QR code",
      error: err.message,
    });
  }
};

// Get all QR codes
const getAllQRCodes = async (req, res) => {
  try {
    const qrcodes = await QRCode.find();
    res.status(200).json({
      success: true,
      message: "QR codes fetched successfully",
      data: qrcodes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch QR codes",
      error: err.message,
    });
  }
};

// Get a specific QR code by ID
const getQRCodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const qrcode = await QRCode.findById(id);
    if (!qrcode) {
      return res.status(404).json({
        success: false,
        message: "QR code not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "QR code fetched successfully",
      data: qrcode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch QR code",
      error: err.message,
    });
  }
};

// Update a QR code by ID
const updateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { station, qrCodeImageURL, posterImageURL, creator } = req.body;

    const updatedQRCode = await QRCode.findByIdAndUpdate(
      id,
      {
        station,
        qrCodeImageURL,
        posterImageURL,
        creator,
      },
      { new: true }
    );

    if (!updatedQRCode) {
      return res.status(404).json({
        success: false,
        message: "QR code not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "QR code updated successfully",
      data: updatedQRCode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update QR code",
      error: err.message,
    });
  }
};

// Delete a QR code by ID
const deleteQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQRCode = await QRCode.findByIdAndRemove(id);
    if (!deletedQRCode) {
      return res.status(404).json({
        success: false,
        message: "QR code not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "QR code deleted successfully",
      data: deletedQRCode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete QR code",
      error: err.message,
    });
  }
};

module.exports = {
  createQRCode,
  getAllQRCodes,
  getQRCodeById,
  updateQRCode,
  deleteQRCode,
};
