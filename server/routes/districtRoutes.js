const express = require("express");
const router = express.Router();
const {
  addDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/districtControllers");

// Create a new district
router.post("/", addDistrict);

// Get all districts
// Get a specific district by ID
router.get("/", getAllDistricts).get("/:id", getDistrictById);

// Update a district by ID
router.put("/:id", updateDistrict);

// Delete a district by ID
router.delete("/:id", deleteDistrict);

module.exports = router;
