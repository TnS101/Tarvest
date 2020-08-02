const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandUser = new Schema({
    userId: { type: String, required: true },
    landId: { type: String, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('landsUsers', LandUser);