const mongoose = require('mongoose');
const position = require('../models/positionModel'); // Import the Position model

const insertPositions = async (req, res) => {
  try {
    // Define the list of positions and priorities
    const positions = [
      {
        name: 'SuperAdmin(Developers)',
        AccessPriority: 0,
      },
      {
        name: 'Director General of Police (DGP)',
        AccessPriority: 1,
      },
      {
        name: 'Superintendent of Police (SP)',
        AccessPriority: 2,
      },
      {
        name: 'Senior Superintendent of Police (SSP)',
        AccessPriority: 3,
      },
      {
        name: 'Station House Officer(SHO)',
        AccessPriority: 4,
      },
    ];

    // Insert positions into the database
    await position.insertMany(positions);

    res.status(201).json({ success: true, message: 'Positions inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error inserting positions', error });
  }
};
const listPositions = async (req, res) => {
    try {
      const positions = await position.find();
      res.status(200).json({ success: true, data: positions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error listing positions', error });
    }
  };
  const getPositionById = async (req, res) => {
    try {
      const positionId = req.params.id; // Assuming the position ID is passed as a parameter
  
      const foundPosition = await position.findById(positionId);
  
      if (!foundPosition) {
        return res.status(404).json({ success: false, message: 'Position not found' });
      }
  
      res.status(200).json({ success: true, data: foundPosition });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving position', error });
    }
  };
  
module.exports = {
  insertPositions,
  listPositions,
  getPositionById
};
