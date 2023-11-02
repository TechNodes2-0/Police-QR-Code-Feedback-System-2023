const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: [true, "Please provide a station."],
  },
  qrCodeImageURL: {
    // Renamed to be more descriptive
    type: String,
    required: [true, "Please provide a QR code image URL."],
  },
  creationDate: { type: Date, default: Date.now }, // Set a default creation date
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Updated reference name
    required: [true, "Please provide a creator name."],
  },
  isDisabled: { type: Boolean, default: false }, // Renamed to be more grammatically correct
});

module.exports = mongoose.model("QRCode", qrCodeSchema);
