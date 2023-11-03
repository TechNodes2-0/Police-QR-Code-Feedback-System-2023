const QRCode = require("../models/qrCodeModel");
const QRCodeGenerator = require("qrcode");
const { promisify } = require("util");
const toDataURL = promisify(QRCodeGenerator.toDataURL);

const cloudinary = require("cloudinary").v2;
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");
// Create a new QR code
const createQRCode = async (req, res) => {
  try {
    const { customId, station, creator } = req.body;

    // Now, you can access the individual fields and their values

    const qrCodeImageFile = req.files.qrCodeImageFile;

    // Check if the file type is supported
    const supportedTypes = ["jpg", "jpeg", "png"];
    const qrCodeImageFileType = qrCodeImageFile.name
      .split(".")[1]
      .toLowerCase();

    if (!isFileTypeSupported(qrCodeImageFileType, supportedTypes)) {
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

    const newQRCode = await QRCode.create({
      _id: customId,
      station,
      qrCodeImageURL: qrCodeImageResponse.secure_url,
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

const generateQRCode = async (req, res) => {
  const url = req.body.url;

  if (url.length === 0) {
    return res.status(400).send("Empty Data");
  }

  try {
    const qrCodeDataURL = await toDataURL(url);
    res.send(qrCodeDataURL);
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createQRCode,
  getAllQRCodes,
  getQRCodeById,
  updateQRCode,
  deleteQRCode,
  generateQRCode,
};
