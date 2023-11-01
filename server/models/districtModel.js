const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  DistrictName: {
    type: String,
    required: [true, "Please provide a station."],
  },
});

module.exports = mongoose.model("District", districtSchema);
