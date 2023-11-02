const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
  DivisionName: {
    type: String,
    required: true,
  },
  DistrictID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
});

module.exports = mongoose.model("Division", divisionSchema);
