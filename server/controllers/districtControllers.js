const express = require("express");
const District = require("../models/districtModel"); // Import your District model

// Create a new district
const addDistrict = async (req, res) => {
  try {
    const { DistrictName } = req.body;

    // Check if a district with the same name already exists
    const existingDistrict = await District.findOne({ DistrictName });

    if (existingDistrict) {
      return res.status(400).json({
        success: false,
        message: "District with the same name already exists",
      });
    }

    // If the district does not exist, create a new one
    const newDistrict = await District.create({
      DistrictName,
    });

    res.status(200).json({
      success: true,
      message: "District added successfully",
      data: newDistrict,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add District",
      error: err.message,
    });
  }
};

// Get all districts
const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json({
      success: true,
      message: "District Data fetched Successfully",
      data: districts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Districts",
      error: err.message,
    });
  }
};

// Get a specific district by ID
const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findById(id);
    if (!district) {
      return res
        .status(404)
        .json({ success: false, message: "District not found" });
    }
    res.status(200).json({
      success: true,
      message: "District Data fetched Successfully",
      data: district,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch District",
      error: err.message,
    });
  }
};

// Update a district by ID
const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { DistrictName } = req.body;

    const updatedDistrict = await District.findByIdAndUpdate(
      id,
      {
        DistrictName,
      },
      { new: true }
    );

    if (!updatedDistrict) {
      return res
        .status(404)
        .json({ success: false, message: "District not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedDistrict,
      message: "District Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update District",
      error: err.message,
    });
  }
};

// Delete a district by ID
const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDistrict = await District.findByIdAndRemove(id);
    if (!deletedDistrict) {
      return res
        .status(404)
        .json({ success: false, message: "District not found" });
    }
    res.status(200).json({
      success: true,
      message: "District deleted successfully",
      data: deletedDistrict,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete District",
    });
  }
};

module.exports = {
  getAllDistricts,
  getDistrictById,
  addDistrict,
  deleteDistrict,
  updateDistrict,
};
