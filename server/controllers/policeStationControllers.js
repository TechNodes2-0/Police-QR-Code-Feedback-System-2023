const express = require("express");
const PoliceStation = require("../models/policeStationModel"); // Import your PoliceStation model

// Create a new police station
const addPoliceStation = async (req, res) => {
  try {
    const { Location, Contact, HeadName, DivisionID, StationName } = req.body;

    const newPoliceStation = await PoliceStation.create({
      StationName,
      DivisionID,
      HeadName,
      Contact,
      Location,
    });
    res.status(200).json({
      success: true,
      message: "Police Station added successfully",
      data: newPoliceStation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add Police Station",
      error: err.message,
    });
  }
};

// Get all police stations
const getAllPoliceStation = async (req, res) => {
  try {
    const policeStations = await PoliceStation.find();
    res.status(200).json({
      success: true,
      message: "Police Station Data fetched Successfully",
      data: policeStations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Police Station",
      error: err.message,
    });
  }
};

// Get a specific police station by ID
const getPoliceStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const policeStation = await PoliceStation.findById(id);
    if (!policeStation) {
      return res
        .status(404)
        .json({ success: false, message: "Police Station not found" });
    }
    res.status(200).json({
      success: true,
      message: "Police Station Data fetched Successfully",
      data: policeStations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Police Station",
      error: err.message,
    });
  }
};

// Update a police station by ID
const updatePoliceStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { Location, Contact, HeadName, DivisionID, StationName } = req.body;

    const updatedPoliceStation = await PoliceStation.findByIdAndUpdate(
      id,
      {
        StationName,
        DivisionID,
        HeadName,
        Contact,
        Location,
      },
      { new: true }
    );

    if (!updatedPoliceStation) {
      return res
        .status(404)
        .json({ success: false, message: "Police Station not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedPoliceStation,
      message: "Police Station Updated  successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update Police Station",
      error: err.message,
    });
  }
};

// Delete a police station by ID
const deletePoliceStation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPoliceStation = await PoliceStation.findByIdAndRemove(id);
    if (!deletedPoliceStation) {
      return res
        .status(404)
        .json({ success: false, message: "Police Station not found" });
    }
    res.status(200).json({
      success: true,
      message: "Police Station deleted successfully",
      data: deletedPoliceStation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Police Station",
    });
  }
};

module.exports = {
  getAllPoliceStation,
  getPoliceStationById,
  addPoliceStation,
  deletePoliceStation,
  updatePoliceStation,
};
