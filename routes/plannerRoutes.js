const express = require('express');
const Planner = require('../models/Planner');
const router = express.Router();

// Function to normalize date format
const normalizeDate = (dateString) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString; // Already in YYYY-MM-DD
  }

  const separator = dateString.includes('-') ? '-' : '/';
  const [day, month, year] = dateString.split(separator);
  return `${year}-${month}-${day}`;
};

// Save Planner Data
router.post('/save', async (req, res) => {
  const { date, morningNotes, dailyTasks, hourlySchedule, tomorrowNotes } = req.body;
  const normalizedDate = normalizeDate(date);
  console.log('Incoming save request:', { ...req.body, date: normalizedDate });

  try {
    const existingEntry = await Planner.findOne({ date: normalizedDate });

    if (existingEntry) {
      existingEntry.morningNotes = morningNotes;
      existingEntry.dailyTasks = dailyTasks;
      existingEntry.hourlySchedule = hourlySchedule;
      existingEntry.tomorrowNotes = tomorrowNotes;
      await existingEntry.save();
    } else {
      const newPlanner = new Planner({
        date: normalizedDate,
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

// Get Planner Data
router.get('/:date', async (req, res) => {
  const rawDate = req.params.date;
  const normalizedDate = normalizeDate(rawDate);
  console.log('Fetching planner data for:', normalizedDate);

  try {
    const plannerData = await Planner.findOne({ date: normalizedDate });

    if (plannerData) {
      res.status(200).json(plannerData);
    } else {
      // Return an empty structure instead of 404
      res.status(200).json({
        date: normalizedDate,
        morningNotes: '',
        dailyTasks: [],
        hourlySchedule: {},
        tomorrowNotes: '',
      });
    }
  } catch (err) {
    console.error('Error fetching planner data:', err.message);
    res.status(500).json({ error: 'Failed to retrieve planner data' });
  }
});

module.exports = router;
