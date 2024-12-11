const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
    date: { type: String, required: true }, // e.g., "10/12/2024"
    morningNotes: { type: String, default: '' },
    dailyTasks: [
        {
            text: { type: String },
            completed: { type: Boolean, default: false },
            time: { type: String, default: '' },
        },
    ],
    hourlySchedule: { type: Map, of: String }, // Hourly schedule as a map
    tomorrowNotes: { type: String, default: '' },
});

module.exports = mongoose.model('Planner', PlannerSchema);
