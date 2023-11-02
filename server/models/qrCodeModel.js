const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceStation",
    required: [true, "Please provide a station."],
  },
  qrCodeImageURL: {
    type: String,
    required: [true, "Please provide a QR code image URL."],
  },
  posterImageURL: {
    type: String,
    required: [true, "Please provide a poster image URL."],
  },
  creationDate: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a creator name."],
  },
  isDisabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("QRCode", qrCodeSchema);
