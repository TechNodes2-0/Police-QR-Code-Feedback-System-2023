const express = require("express");
const router = express.Router();
const {
  addPoliceStation,
  getAllPoliceStation,
  getPoliceStationById,
  updatePoliceStation,
  deletePoliceStation,
} = require("../controllers/policeStationControllers");

// Create a new police station
router.post("/", addPoliceStation);

// Get all police stations
// Get a specific police station by ID
router.get("/", getAllPoliceStation).get("/:id", getPoliceStationById);

// Update a police station by ID
router.put("/:id", updatePoliceStation);

// Delete a police station by ID
router.delete("/:id", deletePoliceStation);

module.exports = router;
