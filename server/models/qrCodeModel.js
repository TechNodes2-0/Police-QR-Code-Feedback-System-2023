const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  _id: {
    type: String, // Assuming you want the custom _id to be a string
    required: true, // Adjust this validation as needed
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceStation",
    required: [true, "Please provide a station."],
  },
  qrCodeImageURL: {
    type: String,
    required: [true, "Please provide a QR code image URL."],
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
