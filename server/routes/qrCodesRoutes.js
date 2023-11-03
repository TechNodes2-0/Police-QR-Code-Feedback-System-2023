const express = require("express");
const router = express.Router();
const {
  createQRCode,
  getAllQRCodes,
  getQRCodeById,
  updateQRCode,
  deleteQRCode,
  generateQRCode,
} = require("../controllers/qrCodeContollers");

// Create a new QR code
router.post("/", createQRCode);
router.post("/generate", generateQRCode);

// Get all QR codes
router.get("/", getAllQRCodes);

// Get a specific QR code by ID
router.get("/:id", getQRCodeById);

// Update a QR code by ID
router.put("/:id", updateQRCode);

// Delete a QR code by ID
router.delete("/:id", deleteQRCode);

module.exports = router;
