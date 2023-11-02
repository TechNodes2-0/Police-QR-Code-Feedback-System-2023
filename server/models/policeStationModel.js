const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema({
  StationName: {
    type: String,
    required: true,
  },
  DivisionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
    required: true,
  },
  HeadName: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
  },
  Location: {
    type: String,
  },
});

module.exports = mongoose.model("PoliceStation", policeStationSchema);
