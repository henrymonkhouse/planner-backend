const express = require('express');
const Planner = require('../models/Planner');
const router = express.Router();

// Function to normalize date format
const normalizeDate = (dateString) => {
  // Ensure the date format is always YYYY-MM-DD
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`; // Convert 'DD/MM/YYYY' to 'YYYY-MM-DD'
};

// Save Planner Data
router.post('/save', async (req, res) => {
    const { date, morningNotes, dailyTasks, hourlySchedule, tomorrowNotes } = req.body;
    console.log('Incoming save request with data:', req.body);

    try {
        const existingEntry = await Planner.findOne({ date });

        if (existingEntry) {
            console.log('Updating existing entry for date:', date);
            existingEntry.morningNotes = morningNotes;
            existingEntry.dailyTasks = dailyTasks;
            existingEntry.hourlySchedule = hourlySchedule;
            existingEntry.tomorrowNotes = tomorrowNotes;
            await existingEntry.save();
        } else {
            console.log('Creating a new entry for date:', date);
            const newPlanner = new Planner({
                date,
                morningNotes,
                dailyTasks,
                hourlySchedule,
                tomorrowNotes,
            });
            await newPlanner.save();
        }

        res.status(200).json({ message: 'Planner data saved successfully' });
    } catch (err) {
        console.error('Error saving planner data:', err.message);
        res.status(500).json({ error: 'Failed to save planner data' });
    }
});

// Get Planner Data for a Date
router.get('/:date', async (req, res) => {
  const rawDate = req.params.date;
  console.log('Fetching planner data for raw date:', rawDate);

  try {
      const plannerData = await Planner.findOne({ date: rawDate }); // Use raw date (already normalized)
      if (plannerData) {
          console.log('Planner data found:', plannerData);
          res.status(200).json(plannerData);
      } else {
          console.log('No planner data found for date:', rawDate);
          res.status(404).json({ message: 'No data found for the given date' });
      }
  } catch (err) {
      console.error('Error fetching planner data:', err.message);
      res.status(500).json({ error: 'Failed to retrieve planner data' });
  }
});

module.exports = router;
