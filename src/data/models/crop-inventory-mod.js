const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropInventory = new Schema({
    userId: { type: String, required: true },
    cropId: { type: String, required: true },
    count: { type: Number, default: 1 },
}, { timestamps: true }, );

module.exports = mongoose.model('cropsInventories', CropInventory);