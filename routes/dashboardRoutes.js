const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// Save Dashboard Data
router.post('/save', async (req, res) => {
    try {
        const dashboardData = new Dashboard(req.body);
        await dashboardData.save();
        res.status(201).json({ message: 'Dashboard data saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save dashboard data', details: error.message });
    }
});

// Get Dashboard Data
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await Dashboard.find({ userId }).sort({ date: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard data', details: error.message });
    }
});

module.exports = router;
