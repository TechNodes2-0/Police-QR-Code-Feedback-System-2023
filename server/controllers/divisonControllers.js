const express = require("express");
const Division = require("../models/divisionModel"); // Import your Division model

// Create a new division
const addDivision = async (req, res) => {
  try {
    const { DivisionName, DistrictID } = req.body;

    const newDivision = await Division.create({
      DivisionName,
      DistrictID,
    });
    res.status(200).json({
      success: true,
      message: "Division added successfully",
      data: newDivision,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add Division",
      error: err.message,
    });
  }
};

// Get all divisions
const getAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find();
    res.status(200).json({
      success: true,
      message: "Division Data fetched Successfully",
      data: divisions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Divisions",
      error: err.message,
    });
  }
};

// Get a specific division by ID
const getDivisionById = async (req, res) => {
  try {
    const { id } = req.params;
    const division = await Division.findById(id);
    if (!division) {
      return res
        .status(404)
        .json({ success: false, message: "Division not found" });
    }
    res.status(200).json({
      success: true,
      message: "Division Data fetched Successfully",
      data: division,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Division",
      error: err.message,
    });
  }
};

// Update a division by ID
const updateDivision = async (req, res) => {
  try {
    const { id } = req.params;
    const { DivisionName, DistrictID } = req.body;

    const updatedDivision = await Division.findByIdAndUpdate(
      id,
      {
        DivisionName,
        DistrictID,
      },
      { new: true }
    );

    if (!updatedDivision) {
      return res
        .status(404)
        .json({ success: false, message: "Division not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedDivision,
      message: "Division Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update Division",
      error: err.message,
    });
  }
};

// Delete a division by ID
const deleteDivision = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDivision = await Division.findByIdAndRemove(id);
    if (!deletedDivision) {
      return res
        .status(404)
        .json({ success: false, message: "Division not found" });
    }
    res.status(200).json({
      success: true,
      message: "Division deleted successfully",
      data: deletedDivision,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Division",
    });
  }
};

module.exports = {
  getAllDivisions,
  getDivisionById,
  addDivision,
  deleteDivision,
  updateDivision,
};
