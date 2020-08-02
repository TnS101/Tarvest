const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seed = new Schema({
    userId: { type: String, required: true },
    seedId: { type: String, required: true },
    count: { type: Number, default: 1 },
}, { timestamps: true }, );

module.exports = mongoose.model('seeds', Seed);