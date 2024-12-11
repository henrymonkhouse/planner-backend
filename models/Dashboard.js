const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // To associate with a user
    hydration: {
        firstCircleFilled: { type: Boolean, default: false },
        secondCircleFilled: { type: Boolean, default: false },
    },
    workout: {
        completed: { type: Boolean, default: false },
        rating: { type: Number, default: 0 },
    },
    sleep: {
        hours: { type: Number, default: 0 },
        minutes: { type: Number, default: 0 },
    },
    nutrition: {
        macros: { type: Boolean, default: false },
        micros: { type: Boolean, default: false },
        noJunkFood: { type: Boolean, default: false },
        lowSugar: { type: Boolean, default: false },
    },
    steps: { type: Number, default: 0 },
    screenTime: {
        hours: { type: Number, default: 0 },
        minutes: { type: Number, default: 0 },
    },
    mood: { type: Number, default: null }, // Mood score
    reading: { type: Number, default: 0 }, // Pages read
    meditation: { type: Number, default: 0 }, // Minutes meditated
    skill: { type: Boolean, default: false }, // Whether skill was worked on
    date: { type: Date, default: Date.now }, // Date for this entry
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
