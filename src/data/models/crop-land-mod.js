const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropLand = new Schema({
    landUserId: { type: String, required: true },
    cropId: { type: String, required: true },
    timeLeft: { type: String, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('cropsLands', CropLand);