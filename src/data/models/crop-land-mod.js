const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropLand = new Schema({
    landUserId: { type: String, required: true },
    cropId: { type: String, required: true },
    timeLeft: { type: Number, required: true },
    bonuses: { type: [{ type: String, amount: Number }], required: false },
}, { timestamps: true }, );

module.exports = mongoose.model('cropsLands', CropLand);