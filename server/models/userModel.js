const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    SecurityAnswer:{
      type: String,
      required: true,

    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'position', // Add a field for position
      required: true,
    },
  
    stationID: {
      type: mongoose.Schema.Types.ObjectId,// Add a field for station ID
      ref:'PoliceStation',
      required: true,
    },
  },
  { timestamps: true }
);
module.exports= mongoose.model("users", userSchema);
