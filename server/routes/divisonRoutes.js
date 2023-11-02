const express = require("express");
const router = express.Router();
const {
  addDivision,
  getAllDivisions,
  updateDivision,
  getDivisionById,
  deleteDivision,
} = require("../controllers/divisonControllers");

// Create a new division
router.post("/", addDivision);

// Get all divisions
// Get a specific division by ID
router.get("/", getAllDivisions).get("/:id", getDivisionById);

// Update a division by ID
router.put("/:id", updateDivision);

// Delete a division by ID
router.delete("/:id", deleteDivision);

module.exports = router;
